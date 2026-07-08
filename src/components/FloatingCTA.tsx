'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 flex gap-3 md:hidden animate-bounce-short">
      {/* WhatsApp DM button */}
      <a
        href="https://wa.me/995593655556"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 active:bg-emerald-700 text-white py-3.5 px-4 rounded-2xl font-bold shadow-lg shadow-emerald-900/30 transition-all text-sm active:scale-95"
        id="floating-cta-whatsapp"
      >
        <MessageSquare className="h-5 w-5" />
        <span>WhatsApp</span>
      </a>

      {/* Call button */}
      <a
        href="tel:593655556"
        className="flex-1 flex items-center justify-center space-x-2 bg-safety-orange active:bg-safety-orangeHover text-white py-3.5 px-4 rounded-2xl font-bold shadow-lg shadow-safety-orange/30 transition-all text-sm active:scale-95"
        id="floating-cta-phone"
      >
        <Phone className="h-5 w-5" />
        <span>{language === 'ka' ? 'დარეკვა' : language === 'ru' ? 'Позвонить' : 'Call Now'}</span>
      </a>
    </div>
  );
};
