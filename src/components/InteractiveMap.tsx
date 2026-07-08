'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowRight, Compass, MapPin } from 'lucide-react';
import { HelmetIcon } from './ActivityCard';

const activityKeys = [
  'zipline',
  'ropepark',
  'climbingwall',
  'karting',
  'horseriding',
  'riverboating',
  'atvtours',
  'shootingrange',
];

const gradientByActivity: Record<string, string> = {
  zipline: 'from-emerald-900/70 to-forest-deep',
  ropepark: 'from-green-950/70 to-forest-deep',
  climbingwall: 'from-slate-800/70 to-forest-deep',
  karting: 'from-amber-950/70 to-forest-deep',
  horseriding: 'from-yellow-950/70 to-forest-deep',
  riverboating: 'from-cyan-950/70 to-forest-deep',
  atvtours: 'from-orange-950/70 to-forest-deep',
  shootingrange: 'from-red-950/70 to-forest-deep',
};

export const InteractiveMap: React.FC = () => {
  const { language, t, getImageUrl } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleActivityClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(`activity-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeActivity = activeId ? t.activities[activeId] : null;

  return (
    <section id="map" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-forest-surface px-3 py-1.5 rounded-full border border-stone-grey/20 text-xs font-semibold uppercase text-safety-orange tracking-widest mb-4">
          <Compass className="h-3.5 w-3.5" />
          <span>{language === 'ka' ? 'აღმოაჩინე ხეობა' : language === 'ru' ? 'Исследуй Ущелье' : 'Discover the Valley'}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
          {t.interactiveMapTitle}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
          {t.interactiveMapSub}
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-stone-grey/15">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {activityKeys.map((id, index) => {
            const activity = t.activities[id];
            if (!activity) return null;

            const imageUrl = getImageUrl(`activity_${id}`);
            const isActive = activeId === id;
            const gradient = gradientByActivity[id] || 'from-forest-surface to-forest-deep';

            return (
              <button
                key={id}
                type="button"
                onMouseEnter={() => setActiveId(id)}
                onFocus={() => setActiveId(id)}
                onClick={() => handleActivityClick(id)}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-safety-orange ${
                  isActive
                    ? 'border-safety-orange shadow-lg shadow-safety-orange/20 scale-[1.02]'
                    : 'border-stone-grey/15 hover:border-safety-orange/40'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={activity.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`h-full w-full bg-gradient-to-br ${gradient}`} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/35 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-safety-orange text-[11px] font-bold text-white shadow-md">
                    {index + 1}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="font-oswald text-sm sm:text-base font-bold uppercase tracking-wide text-text-offwhite line-clamp-2">
                    {activity.name}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <HelmetIcon
                        key={i}
                        className={`h-3.5 w-3.5 ${i < activity.adrenaline ? 'text-harness-yellow' : 'text-stone-grey/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 min-h-[88px] rounded-2xl border border-stone-grey/10 bg-forest-deep/40 px-4 py-5 text-center">
          {activeActivity ? (
            <div className="mx-auto max-w-2xl">
              <div className="mb-2 flex items-center justify-center gap-2 text-safety-orange">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wide font-oswald">
                  {activeActivity.name}
                </span>
              </div>
              <p className="text-sm italic text-text-sage">&quot;{activeActivity.tagline}&quot;</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase text-safety-orange">
                {language === 'ka' ? 'დააკლიკე სრული დეტალებისთვის' : language === 'ru' ? 'Нажмите для подробностей' : 'Click to view full details'}
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-text-sage/70">
              <MapPin className="mb-2 h-5 w-5 text-stone-grey" />
              <p className="text-xs font-oswald uppercase tracking-wider">{t.mapPrompt}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
