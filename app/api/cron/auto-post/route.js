import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/app/lib/supabase';

export async function GET(request) {
  try {
    // 1. Verify Vercel Cron Authentication (CRON_SECRET)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch 1 pending item from 'product_queue' table ORDER BY id ASC
    const { data: queueItems, error: queueError } = await supabase
      .from('product_queue')
      .select('*')
      .eq('status', 'pending')
      .order('id', { ascending: true })
      .limit(1);

    if (queueError) {
      console.error('Supabase fetch error:', queueError);
      return NextResponse.json({ error: queueError.message }, { status: 500 });
    }

    if (!queueItems || queueItems.length === 0) {
      return NextResponse.json({ status: 'no pending items' });
    }

    const item = queueItems[0];
    const targetKeyword = item.keyword || item.title || item.product_name || 'Product Review';

    // 3. Call Google Gemini API (gemini-1.5-flash) with strict JSON system prompt
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY environment variable is not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const prompt = `You are an expert SEO product reviewer and content writer.
Generate a complete, high-ranking SEO product review article in English for the target keyword/product: "${targetKeyword}".

You MUST respond strictly with a valid JSON object matching the following structure:
{
  "title": "Article Title",
  "slug": "url-friendly-slug",
  "content": "Full markdown article content with headings, pros/cons, buying guide, and target keywords",
  "meta_description": "SEO summary under 160 chars",
  "affiliate_link": "https://s.click.aliexpress.com/e/example"
}

Requirements:
1. "title": Catchy, engaging title tailored for SEO.
2. "slug": URL-friendly, lowercased, hyphenated string based on the title.
3. "content": Comprehensive markdown article (including H2/H3 headings, key features, Pros & Cons, Buying Guide, Verdict, and targeted naturally placed keywords).
4. "meta_description": Engaging SEO meta description strictly under 160 characters.
5. "affiliate_link": ${item.affiliate_link ? `"${item.affiliate_link}"` : '"https://s.click.aliexpress.com/e/example"'}`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    let reviewData;
    try {
      reviewData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini API JSON response:', responseText);
      return NextResponse.json({ error: 'Failed to parse Gemini response', raw: responseText }, { status: 500 });
    }

    const { title, slug, content, meta_description, affiliate_link } = reviewData;

    // 4. Insert parsed article into 'reviews' table
    const { data: insertedReview, error: insertError } = await supabase
      .from('reviews')
      .insert([
        {
          title,
          slug,
          content,
          meta_description,
          affiliate_link: affiliate_link || item.affiliate_link || 'https://s.click.aliexpress.com/e/example',
          product_queue_id: item.id,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // 5. Update status of processed keyword in 'product_queue' to 'published'
    const { error: updateError } = await supabase
      .from('product_queue')
      .update({ status: 'published' })
      .eq('id', item.id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
    }

    return NextResponse.json({
      status: 'success',
      review: insertedReview,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
