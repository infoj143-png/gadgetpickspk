import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sun, Smartphone, Navigation, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import useSEO from '../hooks/useSEO';

export default function QiblaDirectionGuide() {
  useSEO({
    title: 'How to Find Qibla Direction | Step-by-Step Guide',
    description: 'Learn how to determine the exact Qibla direction (Kaba Sharif ki سمت) anywhere in the world using magnetic compass, sun shadow, and online digital tools.',
    canonical: '/qibla-direction-guide'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-8 transition-colors">

        {/* Title area */}
        <div className="text-center space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-500 rounded-full flex items-center justify-center mx-auto">
            <Compass size={26} />
          </div>
          <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest block">Qibla Direction Locator Guide</span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white">
            How to Find Qibla Direction (Qibla ki Simt Maloom Karne Ka Tareeqa)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Discover reliable, accurate methods to align towards the Holy Kaaba in Mecca (Makkah Mukarramah) for daily prayers from any location.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

          {/* Intro */}
          <p>
            Facing the Qibla (Istiqbal-e-Qibla) is an essential condition (Shart) for the validity of obligatory Islamic daily prayers (Salah / Namaz). The Qibla represents the exact geographic direction pointing toward the Holy Kaaba located inside the Masjid al-Haram in Mecca, Saudi Arabia. Whether you are traveling, moving into a new home, or outdoors in nature, finding the exact direction is simple using physical tools, natural signs, or modern mobile apps.
          </p>

          {/* Method 1: Using Compass */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Navigation size={20} className="text-orange-500" />
              Method 1: Finding Qibla Using a Magnetic Compass (Compass ke Zariye)
            </h2>
            <p>
              A traditional magnetic compass indicates Magnetic North. To calculate the Qibla direction, you must know the exact Qibla bearing degree relative to North for your current city:
            </p>
            <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 space-y-2">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Example Qibla Angles in Pakistan:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <li className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="font-bold block text-slate-800 dark:text-white">Karachi</span>
                  <span className="text-orange-500 font-extrabold text-sm">263° West-Southwest</span>
                </li>
                <li className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="font-bold block text-slate-800 dark:text-white">Lahore</span>
                  <span className="text-orange-500 font-extrabold text-sm">256° West-Southwest</span>
                </li>
                <li className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                  <span className="font-bold block text-slate-800 dark:text-white">Islamabad</span>
                  <span className="text-orange-500 font-extrabold text-sm">255° West-Southwest</span>
                </li>
              </ul>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <em>Tip: Keep compass away from metallic objects, structural steel beams, or electrical equipment, as magnetic interference can deflect needle accuracy.</em>
            </p>
          </section>

          {/* Method 2: Sun Position */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Sun size={20} className="text-orange-500" />
              Method 2: Finding Qibla via Sun Position (Suraj aur Saaye ke Zariye)
            </h2>
            <p>
              The Sun provides an infallible, natural method to determine direction without electronic instruments:
            </p>
            <div className="p-5 bg-orange-50/60 dark:bg-slate-800/60 rounded-2xl border border-orange-100 dark:border-slate-700 space-y-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">1. Shadow Method at Sunrise & Sunset</h3>
              <p className="text-xs">
                In Pakistan, Mecca lies in a West-Southwesterly direction. Since the sun rises in the East and sets in the West, facing the setting sun slightly angled toward your left alignment points directly toward the Holy Kaaba.
              </p>

              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm pt-2">2. Global Overhead Solar Alignment (Ras al-Qibla)</h3>
              <p className="text-xs">
                Twice a year (around May 27 and July 16), the Sun passes directly above the Kaaba in Mecca at solar noon (12:18 PM and 12:27 PM Saudi Time). On these two specific days, looking directly toward the sun gives the 100% exact direction of the Kaaba from anywhere in the sunlit hemisphere.
              </p>
            </div>
          </section>

          {/* Method 3: Online Qibla Finder & Smartphone Sensors */}
          <section className="space-y-4">
            <h2 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Smartphone size={20} className="text-orange-500" />
              Method 3: Using Online Qibla Finder & Smartphone Apps
            </h2>
            <p>
              Modern smartphones feature built-in GPS location chips and 3D magnetometer sensors. Online Qibla Finders combine live browser camera feeds (Augmented Reality) with precise spherical trigonometry:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-xs">
              <li>Enable GPS location permissions on your smartphone.</li>
              <li>Calibrate your phone's internal compass by moving your phone in a 'Figure 8' motion in the air.</li>
              <li>Open a web-based or native Qibla Finder app; the pointer will automatically adjust in real-time as you rotate your phone.</li>
            </ul>
          </section>

          {/* Summary / Best practices */}
          <section className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-orange-400 flex items-center gap-2">
              <CheckCircle size={18} /> Best Practices for Travelers
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When traveling in hotel rooms or guest houses, look for the Qibla arrow indicator sticker often placed on room ceilings or desks, or double-check with a calibrated smartphone tool before starting your prayer.
            </p>
          </section>

          {/* Quick links to other guides */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center text-xs font-bold">
            <Link to="/how-prayer-times-calculated" className="text-orange-500 hover:underline flex items-center gap-1">
              How Prayer Times Are Calculated <ArrowRight size={14} />
            </Link>
            <Link to="/ramadan-timing-guide" className="text-orange-500 hover:underline flex items-center gap-1">
              Read Ramadan Timing Guide 2026 <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
