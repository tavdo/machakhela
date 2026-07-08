'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { Phone, Globe, Menu, X, Compass } from 'lucide-react';
import { Language } from '../data/translations';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const navItems = [
    {
      label:
        language === 'ka'
          ? 'აქტივობები'
          : language === 'ru'
          ? 'Активности'
          : language === 'he'
          ? 'פעילויות'
          : language === 'ar'
          ? 'أنشطة'
          : 'Activities',
      href: '#activities',
    },
    {
      label:
        language === 'ka'
          ? 'რუკა'
          : language === 'ru'
          ? 'Карта'
          : language === 'he'
          ? 'מפה'
          : language === 'ar'
          ? 'خريطة'
          : 'Map',
      href: '#map',
    },
    {
      label:
        language === 'ka'
          ? 'ფასები'
          : language === 'ru'
          ? 'Цены'
          : language === 'he'
          ? 'חבילות'
          : language === 'ar'
          ? 'باقات'
          : 'Packages',
      href: '#pricing',
    },
    {
      label:
        language === 'ka'
          ? 'ლოკაცია'
          : language === 'ru'
          ? 'Контакты'
          : language === 'he'
          ? 'מיקום'
          : language === 'ar'
          ? 'موقع'
          : 'Location',
      href: '#location',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-stone-grey/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-1.5 md:space-x-2 group">
          <Compass className="h-6 w-6 md:h-8 md:w-8 text-safety-orange group-hover:rotate-45 transition-transform duration-500" />
          <span className="text-lg md:text-2xl font-bold tracking-wider text-text-offwhite font-oswald whitespace-nowrap">
            {t.navTitle} <span className="text-safety-orange">HUB</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide uppercase">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-sage hover:text-safety-orange transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* Language Switcher */}
          <div className="flex items-center space-x-1.5 bg-forest-deep/60 px-3 py-1.5 rounded-full border border-stone-grey/25 text-xs font-semibold">
            <Globe className="h-3.5 w-3.5 text-text-sage mr-1" />
            {(['ka', 'en', 'ru', 'he', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => toggleLanguage(lang)}
                className={`px-2 py-0.5 rounded transition-all uppercase ${
                  language === lang
                    ? 'bg-safety-orange text-white'
                    : 'text-text-sage hover:text-text-offwhite'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Quick Call Button */}
          <a
            href="tel:593655556"
            className="flex items-center space-x-2 bg-safety-orange hover:bg-safety-orangeHover text-white px-5 py-2.5 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-safety-orange/20 transition-all duration-300 hover:scale-105"
            id="desktop-header-call-btn"
          >
            <Phone className="h-4 w-4" />
            <span>
              {language === 'ka'
                ? 'დარეკე'
                : language === 'ru'
                ? 'Позвонить'
                : language === 'he'
                ? 'התקשר'
                : language === 'ar'
                ? 'اتصل'
                : 'Call Hub'}
            </span>
          </a>
        </div>

        {/* Mobile & Small Desktop Controls Panel */}
        <div className="flex lg:hidden items-center space-x-4">
          <a
            href="tel:593655556"
            className="p-2 bg-safety-orange rounded-full text-white shadow shadow-safety-orange/30 hover:scale-105 active:scale-95 transition-all"
            aria-label="Call Machakhela Hub"
            id="mobile-header-call-btn"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* Menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-offwhite hover:text-safety-orange transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-stone-grey/15 w-full absolute top-20 left-0 py-6 px-4 animate-fade-in shadow-2xl">
          {/* Mobile Language Switcher inside Menu */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center bg-forest-deep/80 px-2 py-1.5 rounded-full border border-stone-grey/25 text-xs font-bold">
              {(['ka', 'en', 'ru', 'he', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1 rounded-full transition-all uppercase ${
                    language === lang ? 'bg-safety-orange text-white shadow-md' : 'text-text-sage hover:text-text-offwhite'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          <nav className="flex flex-col space-y-4 font-oswald text-lg tracking-wider text-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-sage hover:text-safety-orange py-2 border-b border-stone-grey/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 flex flex-col items-center">
            <a
              href="tel:593655556"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-safety-orange hover:bg-safety-orangeHover text-white py-3 rounded-xl font-bold tracking-wide shadow-md shadow-safety-orange/20"
            >
              <Phone className="h-5 w-5" />
              <span>{t.callNow}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
