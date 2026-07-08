'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Language, TranslationDictionary, Activity, PricingPackage, Review } from '@/data/translations';
import {
  Lock,
  Save,
  RotateCcw,
  Sparkles,
  Home as HomeIcon,
  Compass,
  DollarSign,
  Star,
  MapPin,
  Eye,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

interface SiteImage {
  image_key: string;
  file_path: string;
  original_name: string;
}

export default function AdminPage() {
  const { allTranslations, updateTranslations, resetTranslations, siteImages, refreshData } = useLanguage();

  // Auth Gate state
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Working state
  const [editableTranslations, setEditableTranslations] = useState<Record<Language, TranslationDictionary> | null>(null);
  const [editLang, setEditLang] = useState<Language>('ka');
  const [activeTab, setActiveTab] = useState<'general' | 'activities' | 'packages' | 'reviews' | 'location' | 'images'>('general');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadStatus, setUploadStatus] = useState<Record<string, 'idle' | 'uploading' | 'success' | 'error'>>({});

  // Check auth session
  useEffect(() => {
    const session = sessionStorage.getItem('machakhela_admin_auth');
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  // Initialize editable copy
  useEffect(() => {
    if (allTranslations && !editableTranslations) {
      setEditableTranslations(JSON.parse(JSON.stringify(allTranslations)));
    }
  }, [allTranslations, editableTranslations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('machakhela_admin_auth', data.token);
        setAuthError('');
      } else {
        setAuthError('არასწორი პაროლი / Incorrect passcode');
      }
    } catch {
      setAuthError('Server connection error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('machakhela_admin_auth');
  };

  const handleSave = async () => {
    if (!editableTranslations) return;
    setSaveStatus('saving');
    const success = await updateTranslations(editableTranslations);
    setSaveStatus(success ? 'success' : 'error');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleReset = async () => {
    const confirm = window.confirm(
      'Are you sure you want to restore all defaults? This will delete all custom content from the database.'
    );
    if (confirm) {
      const success = await resetTranslations();
      if (success) {
        setEditableTranslations(null);
      }
    }
  };

  const handleImageUpload = async (imageKey: string, file: File) => {
    setUploadStatus(prev => ({ ...prev, [imageKey]: 'uploading' }));
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageKey', imageKey);

      const res = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setUploadStatus(prev => ({ ...prev, [imageKey]: 'success' }));
        await refreshData();
        setTimeout(() => setUploadStatus(prev => ({ ...prev, [imageKey]: 'idle' })), 3000);
      } else {
        setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
      }
    } catch {
      setUploadStatus(prev => ({ ...prev, [imageKey]: 'error' }));
    }
  };

  const handleImageDelete = async (imageKey: string) => {
    try {
      await fetch(`/api/admin/images?key=${imageKey}`, { method: 'DELETE' });
      await refreshData();
    } catch {
      console.error('Failed to delete image');
    }
  };

  const getUploadedImage = (key: string): SiteImage | undefined => {
    return siteImages.find(img => img.image_key === key);
  };

  // Helper getters/setters for editable translations
  const getDict = (): TranslationDictionary | null => {
    if (!editableTranslations) return null;
    return editableTranslations[editLang];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateDictField = (key: keyof TranslationDictionary, val: any) => {
    if (!editableTranslations) return;
    setEditableTranslations({
      ...editableTranslations,
      [editLang]: {
        ...editableTranslations[editLang],
        [key]: val
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateActivityField = (actId: string, field: keyof Activity, val: any) => {
    if (!editableTranslations) return;
    const currentDict = editableTranslations[editLang];
    const currentAct = currentDict.activities[actId];
    if (!currentAct) return;
    setEditableTranslations({
      ...editableTranslations,
      [editLang]: {
        ...currentDict,
        activities: {
          ...currentDict.activities,
          [actId]: { ...currentAct, [field]: val }
        }
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updatePackageField = (pkgIndex: number, field: keyof PricingPackage, val: any) => {
    if (!editableTranslations) return;
    const currentDict = editableTranslations[editLang];
    const updatedPackages = [...currentDict.packages];
    updatedPackages[pkgIndex] = { ...updatedPackages[pkgIndex], [field]: val };
    setEditableTranslations({
      ...editableTranslations,
      [editLang]: { ...currentDict, packages: updatedPackages }
    });
  };

  const updatePackageFeature = (pkgIndex: number, featIndex: number, val: string) => {
    if (!editableTranslations) return;
    const currentDict = editableTranslations[editLang];
    const updatedPackages = [...currentDict.packages];
    const updatedFeatures = [...updatedPackages[pkgIndex].features];
    updatedFeatures[featIndex] = val;
    updatedPackages[pkgIndex] = { ...updatedPackages[pkgIndex], features: updatedFeatures };
    setEditableTranslations({
      ...editableTranslations,
      [editLang]: { ...currentDict, packages: updatedPackages }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateReviewField = (revIndex: number, field: keyof Review, val: any) => {
    if (!editableTranslations) return;
    const currentDict = editableTranslations[editLang];
    const updatedReviews = [...currentDict.reviews];
    updatedReviews[revIndex] = { ...updatedReviews[revIndex], [field]: val };
    setEditableTranslations({
      ...editableTranslations,
      [editLang]: { ...currentDict, reviews: updatedReviews }
    });
  };

  const dict = getDict();

  // Image Upload Component
  const ImageUploader: React.FC<{ imageKey: string; label: string }> = ({ imageKey, label }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const existing = getUploadedImage(imageKey);
    const status = uploadStatus[imageKey] || 'idle';

    return (
      <div className="bg-forest-deep/40 border border-stone-grey/10 rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-text-sage uppercase tracking-wider">{label}</span>
          {status === 'uploading' && <span className="text-[10px] text-safety-orange animate-pulse">Uploading...</span>}
          {status === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
          {status === 'error' && <AlertTriangle className="h-4 w-4 text-red-400" />}
        </div>

        {existing ? (
          <div className="relative group">
            <img
              src={existing.file_path}
              alt={label}
              className="w-full h-32 object-cover rounded-xl border border-stone-grey/15"
            />
            <div className="absolute inset-0 bg-forest-deep/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-safety-orange hover:bg-safety-orangeHover text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1"
              >
                <Upload className="h-3 w-3" /> Replace
              </button>
              <button
                onClick={() => handleImageDelete(imageKey)}
                className="bg-red-900/60 hover:bg-red-800 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </button>
            </div>
            <div className="mt-1 text-[9px] text-text-sage truncate">{existing.original_name}</div>
          </div>
        ) : (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-stone-grey/20 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-safety-orange/40 transition-colors cursor-pointer"
          >
            <ImageIcon className="h-6 w-6 text-stone-grey/40" />
            <span className="text-[10px] text-text-sage font-semibold">Click to Upload Image</span>
            <span className="text-[9px] text-stone-grey/40">JPEG, PNG, WebP • Max 5MB</span>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(imageKey, file);
            e.target.value = '';
          }}
        />
      </div>
    );
  };

  // AUTH GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel border border-stone-grey/25 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-40 h-40 bg-safety-orange/10 rounded-full blur-2xl" />
          <div className="flex flex-col items-center text-center relative z-10">
            <div className="p-4 bg-safety-orange/10 border border-safety-orange/30 rounded-2xl mb-6">
              <Lock className="h-8 w-8 text-safety-orange" />
            </div>
            <h1 className="text-2xl font-bold font-oswald text-text-offwhite tracking-wide uppercase mb-2">
              Machakhela Hub Admin
            </h1>
            <p className="text-sm text-text-sage mb-6">
              Enter admin passcode to configure landing page settings
            </p>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Passcode"
                className="w-full bg-forest-deep/80 border border-stone-grey/20 rounded-xl px-4 py-3 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none transition-all text-center placeholder:text-stone-grey/55 font-mono"
                autoFocus
              />
              {authError && (
                <div className="text-xs text-red-400 font-semibold bg-red-950/20 py-2 rounded-lg border border-red-900/30">
                  {authError}
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-safety-orange hover:bg-safety-orangeHover text-white py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-safety-orange/10 hover:scale-[1.02]"
              >
                Authenticate
              </button>
            </form>
            <Link href="/" className="mt-6 text-xs text-text-sage hover:text-safety-orange flex items-center space-x-1 transition-colors">
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // LOADING
  if (!dict) {
    return (
      <div className="min-h-screen bg-forest-deep flex items-center justify-center">
        <div className="text-text-sage font-oswald uppercase tracking-widest animate-pulse">
          Loading translation settings...
        </div>
      </div>
    );
  }

  const activityIds = Object.keys(dict.activities);

  return (
    <div className="min-h-screen bg-forest-deep text-text-offwhite p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-stone-grey/15">
          <div>
            <div className="inline-flex items-center space-x-2 bg-forest-surface px-2.5 py-1.5 rounded-full border border-stone-grey/20 text-[10px] font-bold uppercase text-safety-orange tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Control Panel • PostgreSQL</span>
            </div>
            <h1 className="text-3xl font-extrabold font-oswald text-text-offwhite tracking-wide">
              Machakhela Hub Admin
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="flex items-center space-x-2 bg-forest-surface hover:bg-forest-hover border border-stone-grey/25 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
              <Eye className="h-4 w-4" />
              <span>View Site</span>
            </Link>
            <button onClick={handleLogout} className="bg-red-950/40 hover:bg-red-950/60 border border-red-900/30 px-4 py-2 rounded-xl text-xs font-semibold text-red-300 transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Language Selector + Actions */}
        <div className="glass-panel border border-stone-grey/15 rounded-3xl p-4 sm:p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-start w-full sm:w-auto">
            <span className="text-[10px] uppercase font-bold tracking-wider text-text-sage mb-2">Select Language to Edit</span>
            <div className="flex flex-wrap gap-2">
              {(['ka', 'en', 'ru', 'he', 'ar'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setEditLang(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all uppercase ${
                    editLang === lang
                      ? 'bg-safety-orange text-white shadow shadow-safety-orange/30'
                      : 'bg-forest-deep hover:bg-forest-hover border border-stone-grey/15 text-text-sage'
                  }`}
                >
                  {lang === 'ka' ? 'ქართული' : lang === 'en' ? 'English' : lang === 'ru' ? 'Русский' : lang === 'he' ? 'עברית' : 'العربية'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-stone-grey/10 pt-4 sm:pt-0">
            <button onClick={handleReset} className="flex items-center space-x-2 bg-red-950/40 hover:bg-red-950/60 border border-red-900/30 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 transition-all active:scale-95">
              <RotateCcw className="h-4 w-4" />
              <span>Reset Defaults</span>
            </button>
            <button onClick={handleSave} disabled={saveStatus === 'saving'} className="flex items-center space-x-2 bg-safety-orange hover:bg-safety-orangeHover disabled:bg-safety-orange/55 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-md shadow-safety-orange/15">
              <Save className="h-4 w-4" />
              <span>
                {saveStatus === 'saving' ? 'Saving to DB...' : saveStatus === 'success' ? '✓ Saved!' : saveStatus === 'error' ? '✗ Error' : 'Save to Database'}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-grey/10 mb-8 overflow-x-auto whitespace-nowrap scrollbar-none gap-2">
          {([
            { id: 'general', label: 'General Info', icon: HomeIcon },
            { id: 'activities', label: 'Activities', icon: Compass },
            { id: 'packages', label: 'Packages', icon: DollarSign },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'location', label: 'Location & Contact', icon: MapPin },
            { id: 'images', label: 'Images', icon: ImageIcon }
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-3 border-b-2 font-oswald tracking-wide uppercase text-sm font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-safety-orange text-safety-orange'
                    : 'border-transparent text-text-sage hover:text-text-offwhite'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Contents */}
        <div className="glass-panel border border-stone-grey/15 rounded-3xl p-6 sm:p-8 shadow-xl">

          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Header & Hero Section</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Logo Text</label>
                  <input type="text" value={dict.navTitle} onChange={(e) => updateDictField('navTitle', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Call CTA Header</label>
                  <input type="text" value={dict.callNow} onChange={(e) => updateDictField('callNow', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Hero Tagline</label>
                  <input type="text" value={dict.heroTagline} onChange={(e) => updateDictField('heroTagline', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Hero Subtitle</label>
                  <textarea value={dict.heroSub} onChange={(e) => updateDictField('heroSub', e.target.value)} rows={3} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-grey/10">
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Google Maps Rating Review Text</label>
                  <input type="text" value={dict.googleReviewStat} onChange={(e) => updateDictField('googleReviewStat', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-sage uppercase mb-2">Google Rating Subtext</label>
                  <input type="text" value={dict.googleRatingText} onChange={(e) => updateDictField('googleRatingText', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVITIES */}
          {activeTab === 'activities' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3">Trail Activities List</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Activities Title</label>
                    <input type="text" value={dict.activitiesTitle} onChange={(e) => updateDictField('activitiesTitle', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Activities Subtitle</label>
                    <input type="text" value={dict.activitiesSub} onChange={(e) => updateDictField('activitiesSub', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {activityIds.map((actId) => {
                  const act = dict.activities[actId];
                  return (
                    <div key={actId} className="bg-forest-deep/30 border border-stone-grey/10 rounded-2xl p-4 sm:p-6 space-y-4">
                      <div className="flex justify-between items-center border-b border-stone-grey/5 pb-2">
                        <span className="font-oswald font-bold uppercase text-safety-orange text-sm">ID: {actId}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] uppercase font-bold text-text-sage">Adrenaline Level</span>
                          <input type="number" min="1" max="5" value={act.adrenaline} onChange={(e) => updateActivityField(actId, 'adrenaline', parseInt(e.target.value) || 1)} className="bg-forest-deep border border-stone-grey/25 rounded px-2 py-0.5 text-xs text-text-offwhite w-12 text-center focus:outline-none focus:border-safety-orange" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Activity Name</label>
                          <input type="text" value={act.name} onChange={(e) => updateActivityField(actId, 'name', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Specs / Metrics</label>
                          <input type="text" value={act.metric} onChange={(e) => updateActivityField(actId, 'metric', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Tagline</label>
                        <input type="text" value={act.tagline} onChange={(e) => updateActivityField(actId, 'tagline', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Description</label>
                        <textarea value={act.description} onChange={(e) => updateActivityField(actId, 'description', e.target.value)} rows={2} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3">Pricing Packages Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Pricing Title</label>
                    <input type="text" value={dict.pricingTitle} onChange={(e) => updateDictField('pricingTitle', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Pricing Subtitle</label>
                    <input type="text" value={dict.pricingSub} onChange={(e) => updateDictField('pricingSub', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {dict.packages.map((pkg, pkgIdx) => (
                  <div key={pkgIdx} className="bg-forest-deep/30 border border-stone-grey/10 rounded-2xl p-4 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-grey/5 pb-2">
                      <span className="font-oswald font-bold uppercase text-safety-orange text-sm">Package {pkgIdx + 1}</span>
                      <div>
                        <label className="text-[10px] font-bold text-text-sage uppercase mr-2">Badge</label>
                        <input type="text" value={pkg.badge || ''} onChange={(e) => updatePackageField(pkgIdx, 'badge', e.target.value || undefined)} placeholder="e.g. Popular" className="bg-forest-deep border border-stone-grey/25 rounded px-2.5 py-1 text-xs text-text-offwhite focus:outline-none focus:border-safety-orange" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Title</label>
                        <input type="text" value={pkg.title} onChange={(e) => updatePackageField(pkgIdx, 'title', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Price</label>
                        <input type="text" value={pkg.price} onChange={(e) => updatePackageField(pkgIdx, 'price', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">CTA text</label>
                        <input type="text" value={pkg.cta} onChange={(e) => updatePackageField(pkgIdx, 'cta', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-text-sage uppercase">Features</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {pkg.features.map((feat, featIdx) => (
                          <input key={featIdx} type="text" value={feat} onChange={(e) => updatePackageFeature(pkgIdx, featIdx, e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Client Testimonials</h2>
              <div className="space-y-6">
                {dict.reviews.map((rev, revIdx) => (
                  <div key={revIdx} className="bg-forest-deep/30 border border-stone-grey/10 rounded-2xl p-4 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-grey/5 pb-2">
                      <span className="font-oswald font-bold uppercase text-safety-orange text-sm">Review {revIdx + 1}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold text-text-sage uppercase">Stars</span>
                        <input type="number" min="1" max="5" value={rev.rating} onChange={(e) => updateReviewField(revIdx, 'rating', parseInt(e.target.value) || 5)} className="bg-forest-deep border border-stone-grey/25 rounded px-2 py-0.5 text-xs text-text-offwhite w-12 text-center focus:outline-none focus:border-safety-orange" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Author</label>
                        <input type="text" value={rev.author} onChange={(e) => updateReviewField(revIdx, 'author', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Date</label>
                        <input type="text" value={rev.date} onChange={(e) => updateReviewField(revIdx, 'date', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-sage uppercase mb-1">Review Comment</label>
                      <textarea value={rev.text} onChange={(e) => updateReviewField(revIdx, 'text', e.target.value)} rows={2} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-3 py-2 text-xs text-text-offwhite focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Travel Directions & Work Hours</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Location Subtitle</label>
                    <input type="text" value={dict.locationSub} onChange={(e) => updateDictField('locationSub', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Directions Title</label>
                    <input type="text" value={dict.directionsTitle} onChange={(e) => updateDictField('directionsTitle', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-stone-grey/10">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">By Car</label>
                    <textarea value={dict.directionsCar} onChange={(e) => updateDictField('directionsCar', e.target.value)} rows={2} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">By Taxi</label>
                    <textarea value={dict.directionsTaxi} onChange={(e) => updateDictField('directionsTaxi', e.target.value)} rows={2} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">By Bus</label>
                    <textarea value={dict.directionsBus} onChange={(e) => updateDictField('directionsBus', e.target.value)} rows={2} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-grey/10">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Work Hours Label</label>
                    <input type="text" value={dict.workHoursTitle} onChange={(e) => updateDictField('workHoursTitle', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Work Hours Values</label>
                    <input type="text" value={dict.workHoursVal} onChange={(e) => updateDictField('workHoursVal', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">CTAs & Footer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">WhatsApp CTA</label>
                    <input type="text" value={dict.whatsappCTA} onChange={(e) => updateDictField('whatsappCTA', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Instagram CTA</label>
                    <input type="text" value={dict.instagramCTA} onChange={(e) => updateDictField('instagramCTA', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-4 pt-4 border-t border-stone-grey/10">
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Footer Location</label>
                    <input type="text" value={dict.footerLocation} onChange={(e) => updateDictField('footerLocation', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-sage uppercase mb-2">Footer Copyright</label>
                    <input type="text" value={dict.footerRights} onChange={(e) => updateDictField('footerRights', e.target.value)} className="w-full bg-forest-deep/60 border border-stone-grey/15 rounded-xl px-4 py-2.5 text-sm text-text-offwhite focus:border-safety-orange focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: IMAGES */}
          {activeTab === 'images' && (
            <div className="space-y-8">
              {/* Hero Image */}
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Hero Background Image</h2>
                <div className="max-w-md">
                  <ImageUploader imageKey="hero" label="Hero Section Background" />
                </div>
              </div>

              {/* Activity Images */}
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Activity Card Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {activityIds.map((actId) => (
                    <ImageUploader
                      key={actId}
                      imageKey={`activity_${actId}`}
                      label={dict.activities[actId]?.name || actId}
                    />
                  ))}
                </div>
              </div>

              {/* Gallery Images */}
              <div>
                <h2 className="text-xl font-bold font-oswald tracking-wide uppercase border-b border-stone-grey/10 pb-3 mb-6">Gallery Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <ImageUploader
                      key={num}
                      imageKey={`gallery_${num}`}
                      label={`Gallery Slot ${num}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
