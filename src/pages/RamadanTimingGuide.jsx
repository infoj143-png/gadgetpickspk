import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Calendar, Sun, Clock, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function RamadanTimingGuide() {
  useSEO({
    title: 'Ramadan Prayer Times Guide 2026 | WaqtNama',
    description: 'Comprehensive guide to Ramadan 2026 timings in Pakistan. Learn about Sehri (Suhoor), Iftar, Taraweeh, and why daily prayer times shift during the holy month.',
    canonical: '/ramadan-timing-guide'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Moon size={26} />
          </div>
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block">Ramadan Mubarak Calendar Insights</span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Ramadan Prayer Times Guide 2026 (Ramzan ke Auqaat o Ma'loomat)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Essential guide for Muslims in Pakistan for observing Sehri, Iftar, and Taraweeh prayers accurately during Ramadan 2026.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          {/* Intro section */}
          <p>
            Ramadan (Maah-e-Ramzan) is the holiest month in the Islamic calendar. Fasting (Roza) requires strict adherence to precise daily schedules for starting the fast at Suhoor (Sehri) and breaking the fast at Sunset (Iftar). Having accurate, localized prayer timetables is crucial so that worshipers do not accidentally eat past Subah Sadiq or open their fast before Ghurub-e-Aftab.
          </p>

          {/* Section: Key Milestones (Sehri, Iftar, Taraweeh) */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Sparkles size={20} className="text-orange-500" />
              Core Ramadan Schedules Explained (Sehri, Iftar aur Taraweeh)
            </h2>

            {/* Sehri */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <Clock size={18} /> 1. Sehri Time (Suhoor Ending / Imsak)
              </h3>
              <p>
                <strong>Sehri (Suhoor)</strong> is the pre-dawn meal taken before commencing the fast. The fast official starts at the exact moment of <em>Subah Sadiq</em> (True Dawn / Fajr time). Islamic scholars recommend concluding Sehri 5 to 10 minutes prior to the calculated Fajr adhan as a safety margin (Imsak time) to avoid eating during twilight transition.
              </p>
            </div>

            {/* Iftar */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <Sun size={18} /> 2. Iftar Time (Fast Breaking / Sunset)
              </h3>
              <p>
                <strong>Iftar</strong> marks the end of the fast and coincides exactly with Maghrib prayer time. The moment the upper rim of the sun fully dips below the western horizon, fasting ends. Breaking the fast promptly upon Sunset is a emphasized Sunnah of Prophet Muhammad (PBUH).
              </p>
            </div>

            {/* Taraweeh */}
            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <h3 className="text-base font-extrabold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <Moon size={18} /> 3. Taraweeh Prayers (Namaz-e-Taraweeh)
              </h3>
              <p>
                <strong>Taraweeh</strong> is the special nightly congregation prayer offered during Ramadan immediately after Isha prayer and before Witr. It consists of 8 to 20 rak'ahs, in which the Quran is recited sequentially throughout the blessed month.
              </p>
            </div>
          </section>

          {/* Section: Why Ramadan Times Change Daily */}
          <section className="bg-orange-50/60 dark:bg-slate-800/60 p-6 rounded-2xl border border-orange-100 dark:border-slate-700 space-y-3">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar size={20} className="text-orange-500" />
              Why Do Ramadan Times Change Every Day? (Har Din Auqaat Kyun Badalte Hain?)
            </h2>
            <p>
              Many worshipers notice that Sehri and Iftar times shift by 1 to 2 minutes every day throughout Ramadan. This daily variation is caused by three astronomical factors:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs">
              <li>
                <strong>Earth's Orbital Axis Tilt:</strong> As the Earth orbits the Sun on its 23.5-degree tilted axis, the solar declination angle changes every 24 hours.
              </li>
              <li>
                <strong>Seasonal Daytime Changes:</strong> Depending on whether Ramadan falls in spring, summer, autumn, or winter, days continuously lengthen or shorten day-by-day.
              </li>
              <li>
                <strong>Geographical Coordinates:</strong> Cities located further north or south experience larger day-length variations than cities closer to the equator. For example, Karachi, Lahore, and Islamabad have slightly different daily time changes during Ramadan.
              </li>
            </ul>
          </section>

          {/* Best Practices for Fasting in Pakistan */}
          <section className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-orange-400 flex items-center gap-2">
              <CheckCircle size={18} /> Key Recommendations for Ramadan 2026
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Always re-verify your local city timetable at the start of Ramadan. Use trusted digital tools calculated according to the University of Islamic Sciences Karachi method, and listen carefully for your local neighborhood masjid siren or adhan prior to closing Sehri or opening Iftar.
            </p>
          </section>

          {/* Quick links to other guides */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-bold">
            <Link to="/how-prayer-times-calculated" className="text-orange-500 hover:underline flex items-center gap-1">
              How Prayer Times Are Calculated <ArrowRight size={14} />
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
