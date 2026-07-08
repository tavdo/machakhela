'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations as defaultTranslations, Language, TranslationDictionary } from '../data/translations';

interface SiteImage {
  image_key: string;
  file_path: string;
  original_name: string;
}

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  allTranslations: Record<Language, TranslationDictionary>;
  siteImages: SiteImage[];
  getImageUrl: (key: string) => string | null;
  updateTranslations: (newTranslations: Record<Language, TranslationDictionary>) => Promise<boolean>;
  resetTranslations: () => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ka');
  const [allTranslations, setAllTranslations] = useState<Record<Language, TranslationDictionary>>(defaultTranslations);
  const [siteImages, setSiteImages] = useState<SiteImage[]>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchTranslations = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/content');
      const data = await res.json();
      if (data.success && data.translations) {
        // Merge with defaults to ensure all keys exist
        const merged = { ...defaultTranslations };
        for (const lang of Object.keys(data.translations) as Language[]) {
          if (merged[lang]) {
            merged[lang] = { ...merged[lang], ...data.translations[lang] };
          }
        }
        setAllTranslations(merged);
      }
    } catch {
      // API unavailable, use defaults
      console.warn('[LanguageContext] API unavailable, using static defaults');
    }
  }, []);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/images');
      const data = await res.json();
      if (data.success && data.images) {
        setSiteImages(data.images);
      }
    } catch {
      console.warn('[LanguageContext] Could not fetch images');
    }
  }, []);

  const refreshData = useCallback(async () => {
    await Promise.all([fetchTranslations(), fetchImages()]);
  }, [fetchTranslations, fetchImages]);

  useEffect(() => {
    // Read language preference
    const savedLang = localStorage.getItem('machakhela_lang') as Language;
    if (savedLang && ['ka', 'en', 'ru', 'he', 'ar'].includes(savedLang)) {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'ru') setLanguageState('ru');
      else if (browserLang === 'en') setLanguageState('en');
      else if (browserLang === 'he') setLanguageState('he');
      else if (browserLang === 'ar') setLanguageState('ar');
      else setLanguageState('ka');
    }

    // Fetch data from API
    refreshData().then(() => setLoaded(true));
  }, [refreshData]);

  useEffect(() => {
    const isRtl = language === 'he' || language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('machakhela_lang', lang);
  };

  const getImageUrl = (key: string): string | null => {
    const img = siteImages.find(i => i.image_key === key);
    return img ? img.file_path : null;
  };

  const updateTranslations = async (newTranslations: Record<Language, TranslationDictionary>): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ translations: newTranslations })
      });
      const data = await res.json();
      if (data.success) {
        setAllTranslations(newTranslations);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const resetTranslations = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/content', { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setAllTranslations(defaultTranslations);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const t = allTranslations[language] || defaultTranslations[language];

  // Show loading screen until data is ready
  if (!loaded) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{
      language, setLanguage, t, allTranslations,
      siteImages, getImageUrl,
      updateTranslations, resetTranslations, refreshData
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
