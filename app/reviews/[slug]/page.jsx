import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/app/lib/supabase';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return { title: 'Review Not Found' };
  }

  const { data: review } = await supabase
    .from('reviews')
    .select('title, meta_description')
    .eq('slug', slug)
    .single();

  if (!review) {
    return { title: 'Review Not Found' };
  }

  return {
    title: review.title,
    description: review.meta_description,
  };
}

export default async function ReviewDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !review) {
    notFound();
  }

  const formattedDate = review.created_at
    ? new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-gray-900 dark:text-gray-100">
      <article className="space-y-6">
        <header className="border-b border-gray-200 dark:border-gray-800 pb-6 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {review.title}
          </h1>

          {formattedDate && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Published on <time dateTime={review.created_at}>{formattedDate}</time>
            </p>
          )}

          {review.meta_description && (
            <p className="text-lg text-gray-600 dark:text-gray-300 italic">
              {review.meta_description}
            </p>
          )}

          {review.affiliate_link && (
            <div className="pt-2">
              <a
                href={review.affiliate_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Check Price & Buy Now
              </a>
            </div>
          )}
        </header>

        <section className="prose dark:prose-invert max-w-none space-y-4 text-gray-800 dark:text-gray-200 leading-relaxed">
          <ReactMarkdown>{review.content}</ReactMarkdown>
        </section>

        {review.affiliate_link && (
          <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <a
              href={review.affiliate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-lg text-white bg-orange-600 hover:bg-orange-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Get The Best Deal
            </a>
          </footer>
        )}
      </article>
    </main>
  );
}
