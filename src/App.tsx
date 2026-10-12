/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  SCHEMES_DATABASE, 
  CATEGORY_TABS,
  SCHEME_SECTIONS 
} from './data/schemes';
import { 
  Scheme, 
  SchemeCategory, 
  ViewedRecord 
} from './types/scheme';
import { SplashScreen } from './components/SplashScreen';
import { LanguageSelectionPage } from './components/LanguageSelectionPage';
import { DashboardHeader, DashboardTab, FeedLayoutMode } from './components/DashboardHeader';
import { VideoPlayerFeed } from './components/VideoPlayerFeed';
import { SchemeSectionGroup } from './components/SchemeSectionGroup';
import { LastViewedView } from './components/LastViewedView';
import { InterestedView } from './components/InterestedView';
import { EligibilityModal } from './components/EligibilityModal';
import { SchemeDetailDrawer } from './components/SchemeDetailDrawer';
import { AiVideoGeneratorModal } from './components/AiVideoGeneratorModal';
import { VideoLanguage } from './data/schemeTranslations';
import { AppLanguage, UI_TRANSLATIONS } from './utils/i18n';
import { schemeAudioService } from './utils/audio';
import { 
  PlaySquare, 
  ChevronDown, 
  ArrowUp, 
  CheckCircle2
} from 'lucide-react';

const STORAGE_KEY_INTERESTED = 'scheme_ai_interested_ids';
const STORAGE_KEY_LAST_VIEWED = 'scheme_ai_last_viewed_records';

export default function App() {
  // Navigation / Mode State: splash -> language -> dashboard
  const [currentView, setCurrentView] = useState<'splash' | 'language' | 'dashboard'>('splash');
  const [appLanguage, setAppLanguage] = useState<AppLanguage>('english');
  const t = UI_TRANSLATIONS[appLanguage];
  
  // 2. Top Dashboard Buttons: "home", "last viewed", and "interested"
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  // Default to 'sections' so user can scroll down through all sections of schemes immediately
  const [feedLayoutMode, setFeedLayoutMode] = useState<FeedLayoutMode>('sections');
  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persisted state: Interested (Bookmarks)
  const [interestedIds, setInterestedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_INTERESTED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed with 2 popular schemes for initial discovery
    return ['pm-jay', 'mudra-loan'];
  });

  // Persisted state: Last Viewed records
  const [viewedRecords, setViewedRecords] = useState<ViewedRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LAST_VIEWED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Seed with initial view records
    return [
      { schemeId: 'pm-jay', viewedAt: Date.now() - 1000 * 60 * 4 },
      { schemeId: 'pm-kisan', viewedAt: Date.now() - 1000 * 60 * 25 },
    ];
  });

  // Modals & Drawers
  const [selectedSchemeForDrawer, setSelectedSchemeForDrawer] = useState<Scheme | null>(null);
  const [selectedSchemeForVideo, setSelectedSchemeForVideo] = useState<Scheme | null>(null);
  const [videoInitialLanguage, setVideoInitialLanguage] = useState<VideoLanguage>('english');
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [eligibilityTargetScheme, setEligibilityTargetScheme] = useState<Scheme | null>(null);

  const handleOpenAiVideo = (scheme: Scheme, lang: VideoLanguage = 'english') => {
    handleRecordView(scheme.id);
    setSelectedSchemeForVideo(scheme);
    setVideoInitialLanguage(lang);
  };

  // Sync interested to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INTERESTED, JSON.stringify(interestedIds));
    } catch (e) {
      console.warn('Could not save interested to localStorage', e);
    }
  }, [interestedIds]);

  // Sync viewed to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LAST_VIEWED, JSON.stringify(viewedRecords));
    } catch (e) {
      console.warn('Could not save last viewed to localStorage', e);
    }
  }, [viewedRecords]);

  // Filter schemes by category and search query
  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter((scheme) => {
      const matchesCategory =
        selectedCategory === 'all' || scheme.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        scheme.title.toLowerCase().includes(q) ||
        scheme.code.toLowerCase().includes(q) ||
        scheme.headlineBenefit.toLowerCase().includes(q) ||
        scheme.ministryOrAuthority.toLowerCase().includes(q) ||
        scheme.categoryLabel.toLowerCase().includes(q) ||
        scheme.keyBullets.some((b) => b.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  // Reset activeVideoIndex if out of bounds after filtering
  useEffect(() => {
    if (activeVideoIndex >= filteredSchemes.length) {
      setActiveVideoIndex(0);
    }
  }, [filteredSchemes.length, activeVideoIndex]);

  // Record a view event
  const handleRecordView = (schemeId: string) => {
    setViewedRecords((prev) => {
      const filtered = prev.filter((r) => r.schemeId !== schemeId);
      return [{ schemeId, viewedAt: Date.now() }, ...filtered].slice(0, 50);
    });
  };

  // Toggle Interested
  const handleToggleInterested = (schemeId: string) => {
    setInterestedIds((prev) =>
      prev.includes(schemeId)
        ? prev.filter((id) => id !== schemeId)
        : [...prev, schemeId]
    );
  };

  const isInterested = (schemeId: string) => interestedIds.includes(schemeId);

  // Clear history
  const handleClearHistory = () => {
    if (window.confirm('Clear all viewed scheme history?')) {
      setViewedRecords([]);
    }
  };

  // Switch to video player and focus target scheme
  const handlePlayInPlayer = (scheme: Scheme) => {
    let idx = filteredSchemes.findIndex((s) => s.id === scheme.id);
    if (idx === -1) {
      setSelectedCategory('all');
      setSearchQuery('');
      idx = SCHEMES_DATABASE.findIndex((s) => s.id === scheme.id);
    }
    setActiveVideoIndex(Math.max(0, idx));
    setFeedLayoutMode('player');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Play all schemes of a section in video player
  const handlePlaySectionVideos = (sectionSchemes: Scheme[]) => {
    if (sectionSchemes.length === 0) return;
    const targetScheme = sectionSchemes[0];
    const idx = filteredSchemes.findIndex((s) => s.id === targetScheme.id);
    setActiveVideoIndex(idx !== -1 ? idx : 0);
    setFeedLayoutMode('player');
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll down to sections container smoothly
  const handleScrollToSections = () => {
    const el = document.getElementById('all-sections-container');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to a specific category section
  const handleCategoryClick = (catId: SchemeCategory) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      handleScrollToSections();
    } else {
      setTimeout(() => {
        const el = document.getElementById(`section-${catId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  // Open Eligibility Modal
  const handleOpenEligibility = (scheme?: Scheme) => {
    setEligibilityTargetScheme(scheme || null);
    setIsEligibilityModalOpen(true);
  };

  // 1. Splash Screen Mode
  if (currentView === 'splash') {
    return (
      <SplashScreen
        totalSchemesCount={SCHEMES_DATABASE.length}
        onGetStarted={() => {
          schemeAudioService.playChime('play');
          setCurrentView('language');
        }}
      />
    );
  }

  // 2. Simple Language Selection Page: 3 buttons with the language in them nothing else
  if (currentView === 'language') {
    return (
      <LanguageSelectionPage
        onSelectLanguage={(lang) => {
          schemeAudioService.playChime('success');
          setAppLanguage(lang);
          setCurrentView('dashboard');
        }}
      />
    );
  }

  // 3. Main Dashboard Page with Top Dashboard containing Home, Last Viewed, Interested
  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-yellow-400 selection:text-black">
      {/* Pinned Top Dashboard Header */}
      <DashboardHeader
        activeTab={activeTab}
        onTabChange={(tab) => {
          schemeAudioService.playChime('click');
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        feedLayoutMode={feedLayoutMode}
        onToggleFeedLayout={(mode) => {
          schemeAudioService.playChime('switch');
          setFeedLayoutMode(mode);
        }}
        lastViewedCount={viewedRecords.length}
        interestedCount={interestedIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBackToSplash={() => {
          schemeAudioService.playChime('click');
          setCurrentView('splash');
        }}
        language={appLanguage}
        onSelectLanguage={(lang) => {
          schemeAudioService.playChime('switch');
          setAppLanguage(lang);
        }}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* ================= VIEW 1: HOME ================= */}
        {activeTab === 'home' && (
          <div>
            {/* Quick Section Navigation Jump Bar (Sideways Scrollable Bar) */}
            <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-md py-2.5 mb-6 border-b border-neutral-200 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 flex-1">
                {CATEGORY_TABS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      schemeAudioService.playChime('click');
                      handleCategoryClick(cat.id);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer shrink-0 shadow-2xs ${
                      selectedCategory === cat.id
                        ? 'bg-yellow-400 text-black border border-yellow-500/50 shadow-xs scale-[1.02]'
                        : 'bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200 border border-neutral-200'
                    }`}
                  >
                    <span>{cat.id === 'all' ? t.allCategories : (t.categories[cat.id as keyof typeof t.categories] || cat.label)}</span>
                    <span
                      className={`ml-1.5 text-[10px] font-mono tabular-nums font-bold ${
                        selectedCategory === cat.id ? 'text-black' : 'text-neutral-500'
                      }`}
                    >
                      ({cat.count})
                    </span>
                  </button>
                ))}
              </div>

              {/* Jump to Sections Quick Nav Button */}
              <button
                onClick={() => {
                  schemeAudioService.playChime('click');
                  handleScrollToSections();
                }}
                className="hidden lg:inline-flex items-center gap-1.5 text-xs text-black hover:text-yellow-700 font-extrabold px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 hover:border-yellow-400 cursor-pointer shrink-0 shadow-2xs"
              >
                <span>{t.scrollToSections}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* If in full video player mode, show the player viewer */}
            {feedLayoutMode === 'player' ? (
              <div>
                <div className="mb-4 flex items-center justify-between text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-black font-mono tabular-nums">
                      {t.videoIndex} {activeVideoIndex + 1} {t.videoOf} {filteredSchemes.length}
                    </span>
                    <span className="text-neutral-500">· {t.videoAdvHint}</span>
                  </div>
                  <button
                    onClick={() => {
                      schemeAudioService.playChime('switch');
                      setFeedLayoutMode('sections');
                      setTimeout(handleScrollToSections, 50);
                    }}
                    className="text-black hover:text-yellow-700 underline font-extrabold cursor-pointer"
                  >
                    {t.switchToSections}
                  </button>
                </div>

                <VideoPlayerFeed
                  schemes={filteredSchemes}
                  currentIndex={activeVideoIndex}
                  onNavigate={(idx) => {
                    schemeAudioService.playChime('slide');
                    setActiveVideoIndex(idx);
                  }}
                  isInterested={isInterested}
                  onToggleInterested={handleToggleInterested}
                  onOpenDetails={(s) => {
                    schemeAudioService.playChime('click');
                    handleRecordView(s.id);
                    handleOpenAiVideo(s, (appLanguage as VideoLanguage) || 'english');
                  }}
                  onOpenEligibility={handleOpenEligibility}
                  onOpenAiVideo={handleOpenAiVideo}
                  onRecordView={handleRecordView}
                  onScrollToSections={() => {
                    schemeAudioService.playChime('switch');
                    setFeedLayoutMode('sections');
                    setTimeout(handleScrollToSections, 50);
                  }}
                  language={appLanguage}
                />
              </div>
            ) : (
              /* SECTIONS SCROLLABLE LAYOUT (User can scroll down through all sections of schemes!) */
              <div>
                {/* 1. Top Spotlight Banner: 60-Second Video Spotlight on White */}
                <div className="mb-10 p-5 sm:p-7 rounded-3xl bg-neutral-50 border-2 border-neutral-200 hover:border-yellow-400 shadow-sm relative overflow-hidden transition-colors">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black border border-yellow-500/30">
                          {t.spotlightEngine}
                        </span>
                        <span className="text-xs text-neutral-600 font-semibold">
                          {t.spotlightDigest}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-2">
                        {t.spotlightTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                        {t.spotlightDesc}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => {
                          schemeAudioService.playChime('play');
                          setFeedLayoutMode('player');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs transition-colors cursor-pointer shadow-sm border border-yellow-500/30"
                      >
                        <PlaySquare className="w-4 h-4" />
                        <span>{t.launchPlayer}</span>
                      </button>

                      <button
                        onClick={() => {
                          schemeAudioService.playChime('click');
                          handleScrollToSections();
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-sm"
                      >
                        <span>{t.scrollToSections}</span>
                        <ChevronDown className="w-4 h-4 text-yellow-400 animate-bounce" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. All Sections Container (Anchored for downward scrolling) */}
                <div id="all-sections-container" className="space-y-4">
                  {filteredSchemes.length === 0 ? (
                    <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-neutral-200">
                      <p className="text-base text-black font-black mb-2">
                        No schemes match your current search
                      </p>
                      <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-4">
                        Try clearing "{searchQuery}" or choose "All Schemes" in the filter tab.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSearchQuery('');
                        }}
                        className="px-4 py-2 rounded-lg bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    /* Render each Sector Section so user can scroll down through them all */
                    SCHEME_SECTIONS.map((sectionMeta) => {
                      const sectionSchemes = filteredSchemes.filter(
                        (s) => s.category === sectionMeta.category
                      );

                      if (sectionSchemes.length === 0) return null;

                      return (
                        <SchemeSectionGroup
                          key={sectionMeta.category}
                          meta={sectionMeta}
                          schemes={sectionSchemes}
                          isInterested={isInterested}
                          onToggleInterested={(id) => {
                            schemeAudioService.playChime('click');
                            handleToggleInterested(id);
                          }}
                          onOpenDetails={(s) => {
                            schemeAudioService.playChime('click');
                            handleRecordView(s.id);
                            handleOpenAiVideo(s, (appLanguage as VideoLanguage) || 'english');
                          }}
                          onOpenEligibility={(s) => {
                            schemeAudioService.playChime('click');
                            handleOpenEligibility(s);
                          }}
                          onPlayInPlayer={(s) => {
                            schemeAudioService.playChime('play');
                            handlePlayInPlayer(s);
                          }}
                          onPlaySectionVideos={(schemesList) => {
                            schemeAudioService.playChime('play');
                            handlePlaySectionVideos(schemesList);
                          }}
                          onOpenAiVideo={handleOpenAiVideo}
                          language={appLanguage}
                        />
                      );
                    })
                  )}
                </div>

                {/* Bottom Back-to-Top Anchor */}
                <div className="pt-8 pb-12 flex items-center justify-between border-t border-neutral-200 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black font-bold" />
                    <span>{t.allLoaded} ({SCHEMES_DATABASE.length} {t.schemePlural})</span>
                  </div>

                  <button
                    onClick={() => {
                      schemeAudioService.playChime('slide');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 border border-neutral-200 text-black hover:border-yellow-400 transition-colors cursor-pointer font-black shadow-2xs"
                  >
                    <span>{t.backToTop}</span>
                    <ArrowUp className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= VIEW 2: LAST VIEWED ================= */}
        {activeTab === 'last_viewed' && (
          <LastViewedView
            viewedRecords={viewedRecords}
            allSchemes={SCHEMES_DATABASE}
            onClearHistory={handleClearHistory}
            onOpenDetails={(s) => {
              schemeAudioService.playChime('click');
              handleRecordView(s.id);
              handleOpenAiVideo(s, (appLanguage as VideoLanguage) || 'english');
            }}
            onPlayInPlayer={(s) => {
              schemeAudioService.playChime('play');
              handlePlayInPlayer(s);
            }}
            onGoToHome={() => {
              schemeAudioService.playChime('click');
              setActiveTab('home');
            }}
            language={appLanguage}
          />
        )}

        {/* ================= VIEW 3: INTERESTED ================= */}
        {activeTab === 'interested' && (
          <InterestedView
            interestedIds={interestedIds}
            allSchemes={SCHEMES_DATABASE}
            onToggleInterested={(id) => {
              schemeAudioService.playChime('click');
              handleToggleInterested(id);
            }}
            onOpenDetails={(s) => {
              schemeAudioService.playChime('click');
              handleRecordView(s.id);
              handleOpenAiVideo(s, (appLanguage as VideoLanguage) || 'english');
            }}
            onPlayInPlayer={(s) => {
              schemeAudioService.playChime('play');
              handlePlayInPlayer(s);
            }}
            onGoToHome={() => {
              schemeAudioService.playChime('click');
              setActiveTab('home');
            }}
            language={appLanguage}
          />
        )}
      </main>

      {/* AI Eligibility Modal */}
      <EligibilityModal
        isOpen={isEligibilityModalOpen}
        onClose={() => setIsEligibilityModalOpen(false)}
        targetScheme={eligibilityTargetScheme}
        allSchemes={SCHEMES_DATABASE}
        onSelectScheme={(scheme) => {
          handleRecordView(scheme.id);
          setSelectedSchemeForDrawer(scheme);
        }}
      />

      {/* Scheme Detail Slide-Over Drawer */}
      <SchemeDetailDrawer
        scheme={selectedSchemeForDrawer}
        onClose={() => setSelectedSchemeForDrawer(null)}
        isInterested={selectedSchemeForDrawer ? isInterested(selectedSchemeForDrawer.id) : false}
        onToggleInterested={handleToggleInterested}
        onOpenEligibility={handleOpenEligibility}
        onOpenAiVideo={handleOpenAiVideo}
        language={appLanguage}
      />

      {/* AI Video Generator Modal (Konkani, Hindi, English audio options) */}
      <AiVideoGeneratorModal
        isOpen={Boolean(selectedSchemeForVideo)}
        onClose={() => setSelectedSchemeForVideo(null)}
        scheme={selectedSchemeForVideo}
        initialLanguage={videoInitialLanguage}
      />
    </div>
  );
}
