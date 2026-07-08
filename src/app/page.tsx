'use client';

import React from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { InteractiveMap } from '@/components/InteractiveMap';
import { ActivityCard } from '@/components/ActivityCard';
import { FloatingCTA } from '@/components/FloatingCTA';
import {
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Clock,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

const Instagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Home() {
  const { language, t, getImageUrl } = useLanguage();
  const heroImage = getImageUrl('hero');

  const activityKeys = [
    'zipline',
    'ropepark',
    'climbingwall',
    'karting',
    'horseriding',
    'riverboating',
    'atvtours',
    'shootingrange'
  ];

  return (
    <div className="min-h-screen bg-forest-deep text-text-offwhite relative selection:bg-safety-orange selection:text-white pb-16 md:pb-0">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-safety-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[1200px] right-1/4 w-[600px] h-[600px] rounded-full bg-harness-yellow/5 blur-3xl pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 text-center overflow-hidden border-b border-stone-grey/10">
        {/* Custom Hero Background Image */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-forest-deep/80" />
          </div>
        )}
        {/* Background gradient grid layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
        
        {/* Mountain Silhouette Drawing Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1440 200" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,200 L1440,200 L1440,100 L1200,60 L960,140 L720,80 L480,120 L240,40 L0,120 Z" fill="#8C8578" />
          </svg>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          {/* Social Proof Google Review Badge (Near top of hero) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 bg-forest-surface/80 backdrop-blur border border-stone-grey/25 px-4 py-2 rounded-full mb-8 shadow-lg hover:border-safety-orange/30 transition-all duration-300 cursor-pointer"
            onClick={() => {
              const el = document.getElementById('reviews');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-harness-yellow text-harness-yellow" />
              ))}
            </div>
            <span className="text-xs font-bold font-oswald text-text-offwhite tracking-wide uppercase">
              {t.googleReviewStat}
            </span>
            <span className="h-3.5 w-px bg-stone-grey/30" />
            <span className="text-[10px] bg-safety-orange/15 text-safety-orange px-2 py-0.5 rounded font-extrabold uppercase">
              4.6★
            </span>
          </motion.div>

          {/* Main Title Hook */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-oswald text-text-offwhite tracking-tight leading-[1.1] mb-6 uppercase"
          >
            {t.heroTagline.split(' ').map((word, i) => (
              <span key={i} className={word.includes('ადრენალინი') || word.includes('Adrenaline') || word.includes('адреналин') ? 'text-safety-orange glow-text-orange' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          {/* Description Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-xl text-text-sage max-w-2xl leading-relaxed mb-10"
          >
            {t.heroSub}
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
          >
            {/* Call button */}
            <a
              href="tel:593655556"
              className="flex items-center justify-center space-x-3 bg-safety-orange hover:bg-safety-orangeHover text-white px-8 py-4 rounded-2xl font-extrabold text-base tracking-wide shadow-xl shadow-safety-orange/20 hover:scale-105 active:scale-95 transition-all duration-300"
              id="hero-call-cta"
            >
              <Phone className="h-5 w-5" />
              <span>{t.callNow}</span>
            </a>

            {/* Explore activities button */}
            <a
              href="#map"
              className="flex items-center justify-center space-x-2 bg-forest-surface hover:bg-forest-hover border border-stone-grey/25 text-text-offwhite px-8 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all hover:scale-105"
            >
              <span>{language === 'ka' ? 'აღმოაჩინე რუკა' : language === 'ru' ? 'Открыть карту' : 'Explore Map'}</span>
              <ArrowRight className="h-4 w-4 text-safety-orange" />
            </a>
          </motion.div>

          {/* Features check badge group */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full border-t border-stone-grey/10 pt-8"
          >
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-text-sage">
              <ShieldCheck className="h-4 w-4 text-safety-orange" />
              <span>{language === 'ka' ? 'უსაფრთხოების გარანტია' : language === 'ru' ? 'Гарантия безопасности' : 'Certified Safety'}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-text-sage">
              <MapPin className="h-4 w-4 text-safety-orange" />
              <span>{language === 'ka' ? 'ბათუმიდან 30 წთ' : language === 'ru' ? '30 мин от Батуми' : '30 min from Batumi'}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-text-sage">
              <Users className="h-4 w-4 text-safety-orange" />
              <span>{language === 'ka' ? 'პროფესიონალი გიდები' : language === 'ru' ? 'Опытные гиды' : 'Pro Range Masters'}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-text-sage">
              <Star className="h-4 w-4 text-safety-orange" />
              <span>{language === 'ka' ? 'ყველა ასაკისთვის' : language === 'ru' ? 'Для всех возрастов' : 'Suitable for All'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE VALLEY MAP */}
      <InteractiveMap />

      {/* 3. ACTIVITIES SECTION (THE TRAIL) */}
      <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-forest-surface px-3 py-1.5 rounded-full border border-stone-grey/20 text-xs font-semibold uppercase text-safety-orange tracking-widest mb-4">
            <Compass className="h-3.5 w-3.5" />
            <span>{language === 'ka' ? 'მარშრუტი' : language === 'ru' ? 'Экспедиция' : 'The Trail'}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
            {t.activitiesTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
            {t.activitiesSub}
          </p>
        </div>

        {/* Staggered Vertical Trail list */}
        <div className="relative">
          {/* Vertical Trail Path Line */}
          <div className="trail-line-bg" />

          {/* Staggered Cards Loop */}
          <div className="space-y-4">
            {activityKeys.map((key, index) => {
              const activity = t.activities[key];
              return activity ? (
                <ActivityCard key={key} activity={activity} index={index} />
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* 4. GALLERY / REAL VISITOR MOMENTS */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
            {t.galleryTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
            {t.gallerySub}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: 1, gradient: 'from-emerald-950/70 to-emerald-900/40', tag: 'Zipline Flight' },
            { id: 2, gradient: 'from-orange-950/70 to-orange-900/40', tag: 'Mountain Karting' },
            { id: 3, gradient: 'from-cyan-950/70 to-cyan-900/40', tag: 'River Boating' },
            { id: 4, gradient: 'from-amber-950/70 to-amber-900/40', tag: 'ATV Ride' }
          ].map((item) => (
            <div
              key={item.id}
              className={`relative h-64 md:h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${item.gradient} border border-stone-grey/15 group shadow-lg flex flex-col justify-end p-4 hover:border-safety-orange/40 transition-all duration-300`}
            >
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute top-4 right-4 bg-forest-deep/80 backdrop-blur-sm border border-stone-grey/25 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider text-harness-yellow">
                Live Shot
              </div>
              <div className="relative z-10">
                <span className="font-oswald text-sm font-bold text-text-offwhite block uppercase">
                  {item.tag}
                </span>
                <span className="text-[10px] text-text-sage">@machakhela_extreme</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SOCIAL PROOF (GOOGLE REVIEWS) */}
      <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-grey/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
            {t.reviewsTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
            {t.reviewsSub}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.map((review, i) => (
            <div
              key={i}
              className="glass-panel p-6 rounded-3xl border border-stone-grey/15 flex flex-col justify-between hover:border-safety-orange/30 transition-all duration-300 bg-forest-surface/30"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex space-x-1 mb-4 text-harness-yellow">
                  {[...Array(review.rating)].map((_, starIdx) => (
                    <Star key={starIdx} className="h-4.5 w-4.5 fill-current" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-sm text-text-sage leading-relaxed italic mb-6">
                  &quot;{review.text}&quot;
                </p>
              </div>
              {/* Author Info */}
              <div className="flex justify-between items-center border-t border-stone-grey/10 pt-4 text-xs font-semibold text-text-offwhite">
                <span className="font-bold">{review.author}</span>
                <span className="text-[10px] text-stone-grey">{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. PRICING / SPECIAL PACKAGES */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
            {t.pricingTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
            {t.pricingSub}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.packages.map((pkg, i) => {
            const isPopular = pkg.badge !== undefined;
            return (
              <div
                key={i}
                className={`relative rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-forest-surface border-safety-orange shadow-2xl scale-105 z-10'
                    : 'bg-forest-surface/40 border-stone-grey/15 shadow-xl hover:border-safety-orange/30'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <span className="absolute top-0 right-8 transform -translate-y-1/2 bg-safety-orange text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-lg tracking-widest">
                    {pkg.badge}
                  </span>
                )}

                <div>
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-text-offwhite font-oswald mb-2 uppercase">
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className="text-3xl md:text-4xl font-extrabold font-oswald text-safety-orange mb-6 flex items-baseline">
                    {pkg.price}
                    <span className="text-xs font-semibold text-text-sage lowercase ml-1">
                      / {language === 'ka' ? 'ადამიანზე' : language === 'ru' ? 'с человека' : 'per person'}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-text-sage">
                        <CheckCircle2 className="h-4.5 w-4.5 text-safety-orange mr-2.5 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Booking CTA Link */}
                <a
                  href={`https://wa.me/995593655556?text=${encodeURIComponent(
                    language === 'ka'
                      ? `გამარჯობა, მსურს პაკეტის დაჯავშნა: ${pkg.title}`
                      : `Hello, I'd like to book the package: ${pkg.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full text-center py-3.5 px-4 rounded-2xl font-extrabold text-sm tracking-wide transition-all ${
                    isPopular
                      ? 'bg-safety-orange hover:bg-safety-orangeHover text-white shadow-xl shadow-safety-orange/20 hover:scale-102'
                      : 'bg-forest-deep hover:bg-forest-hover border border-stone-grey/25 text-text-offwhite hover:scale-102'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. LOCATION & DIRECTIONS */}
      <section id="location" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-stone-grey/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
            {t.locationTitle}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage font-semibold text-river-sand">
            {t.locationSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Direct text instructions */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-stone-grey/15 flex flex-col justify-between bg-forest-surface/30">
            <div>
              <h3 className="text-xl md:text-2xl font-extrabold text-text-offwhite font-oswald tracking-wide mb-6">
                {t.directionsTitle}
              </h3>
              <div className="space-y-6">
                {/* By Car */}
                <div className="flex items-start">
                  <div className="p-2.5 bg-forest-deep rounded-xl border border-stone-grey/10 mr-4 shrink-0">
                    <Compass className="h-5 w-5 text-safety-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-text-offwhite tracking-wide mb-1">
                      {language === 'ka' ? 'ავტომობილით' : language === 'ru' ? 'На автомобиле' : 'By Personal Car'}
                    </h4>
                    <p className="text-xs text-text-sage leading-relaxed">{t.directionsCar}</p>
                  </div>
                </div>

                {/* By Taxi */}
                <div className="flex items-start">
                  <div className="p-2.5 bg-forest-deep rounded-xl border border-stone-grey/10 mr-4 shrink-0">
                    <Users className="h-5 w-5 text-safety-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-text-offwhite tracking-wide mb-1">
                      {language === 'ka' ? 'ტაქსით' : language === 'ru' ? 'На такси' : 'By Taxi'}
                    </h4>
                    <p className="text-xs text-text-sage leading-relaxed">{t.directionsTaxi}</p>
                  </div>
                </div>

                {/* By Bus */}
                <div className="flex items-start">
                  <div className="p-2.5 bg-forest-deep rounded-xl border border-stone-grey/10 mr-4 shrink-0">
                    <Clock className="h-5 w-5 text-safety-orange" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase text-text-offwhite tracking-wide mb-1">
                      {language === 'ka' ? 'მიკროავტობუსით' : language === 'ru' ? 'На маршрутке' : 'By Minibus'}
                    </h4>
                    <p className="text-xs text-text-sage leading-relaxed">{t.directionsBus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mt-8 pt-6 border-t border-stone-grey/10 flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-safety-orange mr-3" />
                <span className="text-sm font-bold text-text-offwhite uppercase font-oswald tracking-wide">
                  {t.workHoursTitle}
                </span>
              </div>
              <span className="text-xs bg-safety-orange/15 text-safety-orange px-3 py-1.5 rounded-full font-extrabold tracking-wide">
                {t.workHoursVal}
              </span>
            </div>
          </div>

          {/* Interactive Google Map Iframe */}
          <div className="rounded-3xl overflow-hidden border border-stone-grey/15 h-[350px] lg:h-auto min-h-[300px] shadow-lg relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.7410940562947!2d41.7454228!3d41.5244583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40679b3cb6f4c391%3A0xe543cd6248937989!2z4YOb4YOQ4YOt4YOQ4YOt4YOU4YOa4YOY4YOh4YOp4YOY4YOg4YOY!5e0!3m2!1ska!2sge!4v1700000000000!5m2!1ska!2sge"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Extreme Sports Hub Machakhela Location Map"
              id="google-maps-iframe"
            />
          </div>
        </div>
      </section>

      {/* 8. FINAL URGENT CALL-TO-ACTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-surface to-forest-deep opacity-90 rounded-3xl border border-stone-grey/15 shadow-2xl pointer-events-none" />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-safety-orange/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto py-6">
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide mb-4">
            {t.ctaSectionTitle}
          </h2>
          <p className="text-base text-text-sage mb-10">
            {t.ctaSectionSub}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Click to call */}
            <a
              href="tel:593655556"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-safety-orange hover:bg-safety-orangeHover text-white px-8 py-4 rounded-2xl font-extrabold text-base tracking-wide shadow-xl shadow-safety-orange/25 hover:scale-105 active:scale-95 transition-all duration-300"
              id="final-call-btn"
            >
              <Phone className="h-5 w-5" />
              <span>{t.callNow}</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/995593655556"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-extrabold text-base tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              id="final-whatsapp-btn"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{t.whatsappCTA}</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-forest-deep hover:bg-forest-hover border border-stone-grey/25 text-text-offwhite px-8 py-4 rounded-2xl font-extrabold text-sm tracking-wide hover:scale-105 active:scale-95 transition-all duration-300"
              id="final-instagram-btn"
            >
              <Instagram className="h-5 w-5 text-safety-orange" />
              <span>{t.instagramCTA}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-forest-deep/90 border-t border-stone-grey/10 py-12 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-text-sage">
          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-safety-orange" />
            <span className="font-oswald text-sm font-bold tracking-wider text-text-offwhite">
              {t.navTitle} <span className="text-safety-orange">HUB</span>
            </span>
          </div>
          <div>
            <p className="mb-2 font-semibold text-text-offwhite">{t.footerLocation}</p>
            <p>{t.footerRights}</p>
          </div>
          <div className="flex space-x-6">
            <a href="tel:593655556" className="hover:text-safety-orange transition-colors">
              593 65 55 56
            </a>
            <a href="https://instagram.com" className="hover:text-safety-orange transition-colors">
              Instagram
            </a>
            <a href="https://wa.me/995593655556" className="hover:text-safety-orange transition-colors">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky mobile CTA bar */}
      <FloatingCTA />
    </div>
  );
}
