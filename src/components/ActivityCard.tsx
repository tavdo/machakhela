'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Activity } from '../data/translations';
import { Phone, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActivityCardProps {
  activity: Activity;
  index: number;
}

// Custom Helmet SVG Icon
export const HelmetIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5v1h15v-1c0-4.14-3.36-7.5-7.5-7.5zM4 14.5v1c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-1H4z" />
    <path d="M12 2.5a1 1 0 011 1v1.5a1 1 0 11-2 0V3.5a1 1 0 011-1zM6.5 7a1 1 0 01.86.5l1 1.73a1 1 0 11-1.72 1l-1-1.73A1 1 0 016.5 7zM17.5 7a1 1 0 01.86 1.5l-1 1.73a1 1 0 11-1.72-1l1-1.73a1 1 0 01.86-.5z" />
  </svg>
);

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, index }) => {
  const { language, t, getImageUrl } = useLanguage();
  const isEven = index % 2 === 0;

  // Render adrenaline helmets
  const renderAdrenaline = (rating: number) => {
    return (
      <div className="flex space-x-1 items-center bg-forest-deep/60 px-3 py-1 rounded-full border border-stone-grey/15 w-fit">
        <span className="text-[10px] uppercase font-bold tracking-wider text-text-sage mr-1.5">
          {t.adrenalineLabel}
        </span>
        {[...Array(5)].map((_, i) => (
          <HelmetIcon
            key={i}
            className={`h-4.5 w-4.5 transition-all ${
              i < rating ? 'text-harness-yellow' : 'text-stone-grey/25'
            }`}
          />
        ))}
      </div>
    );
  };

  // Static representations of generated activity images using realistic mountain backgrounds and text markers.
  // The client can customize later, but we use visually spectacular gradient cards to stand out immediately.
  const getImagePlaceholder = (id: string) => {
    const customImage = getImageUrl(`activity_${id}`);

    if (customImage) {
      return (
        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border border-stone-grey/15 group shadow-inner">
          <img
            src={customImage}
            alt={activity.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay with name */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-90" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="text-[10px] uppercase font-bold tracking-widest text-safety-orange bg-forest-deep/75 px-2.5 py-1 rounded w-fit mb-2">
              Machakhela Expedition
            </div>
            <span className="font-oswald text-2xl md:text-3xl font-extrabold text-text-offwhite block mb-1">
              {activity.name}
            </span>
            <span className="text-xs text-river-sand font-bold tracking-wide">
              {activity.metric}
            </span>
          </div>
        </div>
      );
    }

    const gradients: Record<string, string> = {
      zipline: 'from-emerald-900/60 to-forest-deep/90',
      ropepark: 'from-green-950/60 to-forest-deep/90',
      climbingwall: 'from-slate-800/60 to-forest-deep/90',
      karting: 'from-amber-950/60 to-forest-deep/90',
      horseriding: 'from-yellow-950/60 to-forest-deep/90',
      riverboating: 'from-cyan-950/60 to-forest-deep/90',
      atvtours: 'from-orange-950/60 to-forest-deep/90',
      shootingrange: 'from-red-950/60 to-forest-deep/90',
    };

    const gradient = gradients[id] || 'from-forest-surface to-forest-deep';

    return (
      <div className={`relative w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} border border-stone-grey/15 group shadow-inner flex flex-col justify-end p-6`}>
        {/* Abstract pattern grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        {/* Soft layout glow */}
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-safety-orange/10 blur-2xl group-hover:bg-safety-orange/20 transition-all duration-500 pointer-events-none" />
        
        {/* Real-time description label overlay */}
        <div className="relative z-10 transition-transform duration-300 group-hover:translate-y-[-4px]">
          <div className="text-[10px] uppercase font-bold tracking-widest text-safety-orange bg-forest-deep/75 px-2.5 py-1 rounded w-fit mb-2">
            Machakhela Expedition
          </div>
          <span className="font-oswald text-2xl md:text-3xl font-extrabold text-text-offwhite block mb-1">
            {activity.name}
          </span>
          <span className="text-xs text-river-sand font-bold tracking-wide">
            {activity.metric}
          </span>
        </div>

        {/* Ambient darken vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent opacity-90" />
      </div>
    );
  };

  return (
    <div
      id={`activity-card-${activity.id}`}
      className="relative flex flex-col md:flex-row items-center justify-between w-full my-12 md:my-20"
    >
      {/* Visual Timeline Node */}
      <div className="absolute left-6 rtl:left-auto rtl:right-6 md:left-1/2 md:rtl:left-1/2 md:rtl:right-auto transform -translate-x-[14px] rtl:translate-x-[14px] md:-translate-x-1/2 md:rtl:-translate-x-1/2 w-7 h-7 rounded-full bg-forest-deep border-4 border-safety-orange flex items-center justify-center z-10 shadow-lg glow-orange">
        <div className="w-1.5 h-1.5 bg-text-offwhite rounded-full" />
      </div>

      {/* Card Content container - Left Stagger / Right Stagger */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full md:w-[46%] ps-16 md:ps-0 ${isEven ? 'md:order-1' : 'md:order-2'}`}
      >
        {getImagePlaceholder(activity.id)}
      </motion.div>

      {/* Stagger spacer (middle divider replacement space) */}
      <div className="hidden md:block w-[8%]" />

      {/* Text Info card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full md:w-[46%] ps-16 md:ps-0 mt-6 md:mt-0 ${isEven ? 'md:order-2' : 'md:order-1'}`}
      >
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-stone-grey/15 shadow-xl bg-forest-surface/40 hover:bg-forest-surface/60 transition-colors duration-300">
          {/* Adrenaline Helmets */}
          <div className="mb-4">{renderAdrenaline(activity.adrenaline)}</div>

          {/* Activity Name */}
          <h3 className="text-2xl md:text-3xl font-extrabold text-text-offwhite font-oswald tracking-wide mb-2">
            {activity.name}
          </h3>

          {/* Hook/Tagline */}
          <p className="text-sm font-semibold text-river-sand mb-4 italic">
            &quot;{activity.tagline}&quot;
          </p>

          {/* Description */}
          <p className="text-sm text-text-sage leading-relaxed mb-6">
            {activity.description}
          </p>

          {/* Metrics specs */}
          <div className="flex items-center space-x-2 text-xs font-semibold bg-forest-deep/60 px-3 py-2 rounded-xl border border-stone-grey/10 w-fit mb-6 text-text-offwhite">
            <Zap className="h-4 w-4 text-safety-orange" />
            <span>{activity.metric}</span>
          </div>

          {/* Mini CTA booking shortcuts */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/995593655556"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
              aria-label="Book on WhatsApp"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:593655556"
              className="flex items-center space-x-2 bg-safety-orange hover:bg-safety-orangeHover text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-safety-orange/10"
              aria-label="Call to Book"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{language === 'ka' ? 'დარეკვა' : language === 'ru' ? 'Позвонить' : 'Call'}</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
