import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calculator, Compass, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function HowPrayerTimesCalculated() {
  useSEO({
    title: 'How Prayer Times are Calculated | WaqtNama Guide',
    description: 'Detailed guide explaining calculation methods for Fajr, Dhuhr, Asr, Maghrib, and Isha. Includes University of Islamic Sciences, Karachi method explanation.',
    canonical: '/how-prayer-times-calculated'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Calculator size={26} />
          </div>
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block">Islamic Astronomical Calculation</span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            How Prayer Times are Calculated (Namaz ke Auqaat ki Paimaish)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            A comprehensive guide explaining the scientific and Islamic jurisprudence rules used to determine daily prayer timings across Pakistan and globally.
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          <p>
            Understanding daily prayer times (Namaz ke Auqaat) requires a blend of astronomical principles (sooraj ki harkat) and Islamic jurisprudence (Fiqh). In Islam, prayer schedules are strictly synchronized with the natural motion of the Sun relative to the Earth's horizon. Modern electronic timetables and prayer apps rely on precise solar position algorithms to calculate the exact minutes for Fajr, Dhuhr, Asr, Maghrib, and Isha.
          </p>

          {/* Section: University of Islamic Sciences Karachi Method */}
          <section className="bg-orange-50/60 dark:bg-slate-800/60 p-6 rounded-2xl border border-orange-100 dark:border-slate-700 space-y-3">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={20} className="text-orange-500" />
              University of Islamic Sciences, Karachi Method (Jamia Uloom-ul-Islamia)
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              In Pakistan, India, Bangladesh, and surrounding regions, the standard calculation method adopted by scholars is the <strong>University of Islamic Sciences, Karachi (Karachi Method)</strong>. This method defines exact twilight angles:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li><strong>Fajr Twilight Angle:</strong> 18.0 degrees below the horizon (Subah Sadiq).</li>
              <li><strong>Isha Twilight Angle:</strong> 18.0 degrees below the horizon (Shafaq-e-Ahmar / Shafaq-e-Abyad termination).</li>
              <li><strong>Asr Calculation:</strong> Uses Hanafi juristic rule (shadow length equals twice the object length plus shadow at noon) as standard across Pakistan, with Shafi/Hanbali option (shadow equals object length).</li>
            </ul>
          </section>

          {/* Section: Individual Prayers Breakdown */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">
              Individual Prayer Calculation Rules (Har Namaz ka Auqaat)
            </h2>

            {/* 1. Fajr */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400">1. Fajr (Subah ki Namaz)</h3>
              <p>
                Fajr starts at <em>Subah Sadiq</em> (True Dawn), when horizontal light first appears across the eastern horizon. Mathematically, it is triggered when the sun is exactly 18° below the horizon. Fajr time ends immediately at Sunrise (Tulu-e-Aftab).
              </p>
            </div>

            {/* 2. Dhuhr */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400">2. Dhuhr (Zohar ki Namaz)</h3>
              <p>
                Dhuhr begins when the sun passes the meridian (Zawal point) and starts declining toward the west. Scholars recommend adding a safety buffer of 2 to 5 minutes after Zawal before commencing Dhuhr prayers.
              </p>
            </div>

            {/* 3. Asr */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400">3. Asr (Asar ki Namaz)</h3>
              <p>
                Asr time depends on shadow length ratio:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Hanafi Method:</strong> Starts when an object's shadow becomes equal to its noon shadow plus twice its height (2x factor).</li>
                <li><strong>Shafi / Maliki / Hanbali Method:</strong> Starts when an object's shadow equals its noon shadow plus its height (1x factor).</li>
              </ul>
            </div>

            {/* 4. Maghrib */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400">4. Maghrib (Maghrib ki Namaz)</h3>
              <p>
                Maghrib begins immediately after complete Sunset (Ghurub-e-Aftab), when the sun disc dips entirely beneath the western horizon. Atmospheric refraction is accounted for in coordinate calculations.
              </p>
            </div>

            {/* 5. Isha */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400">5. Isha (Esha ki Namaz)</h3>
              <p>
                Isha begins when red twilight completely disappears from the sky (Shafaq). Under the Karachi convention, this occurs when the sun drops 18° below the horizon.
              </p>
            </div>
          </section>

          {/* Practical Tips */}
          <section className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-orange-400 flex items-center gap-2">
              <CheckCircle size={18} /> Safety Margins and Local Masjid Coordination
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Because atmospheric dust, temperature, and elevation affect visible sunrise and sunset, local Islamic authorities apply 1 to 3-minute precautionary margins (Ehtiyaat) for Sehri end times and Maghrib Iftar times. Always consult local masjid announcements alongside calculated digital schedules.
            </p>
          </section>

          {/* Quick links to other guides */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-bold">
            <Link to="/ramadan-timing-guide" className="text-orange-500 hover:underline flex items-center gap-1">
              Read Ramadan Timing Guide 2026 <ArrowRight size={14} />
            </Link>
            <Link to="/qibla-direction-guide" className="text-orange-500 hover:underline flex items-center gap-1">
              How to Find Qibla Direction <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
