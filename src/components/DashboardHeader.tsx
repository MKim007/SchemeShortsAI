import React from 'react';
import { Home, History, Bookmark, Layers, PlaySquare, Search, Globe } from 'lucide-react';
import { AppLanguage, UI_TRANSLATIONS } from '../utils/i18n';

export type DashboardTab = 'home' | 'last_viewed' | 'interested';
export type FeedLayoutMode = 'sections' | 'player';

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  feedLayoutMode: FeedLayoutMode;
  onToggleFeedLayout: (mode: FeedLayoutMode) => void;
  lastViewedCount: number;
  interestedCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onBackToSplash: () => void;
  language: AppLanguage;
  onSelectLanguage: (lang: AppLanguage) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onTabChange,
  feedLayoutMode,
  onToggleFeedLayout,
  lastViewedCount,
  interestedCount,
  searchQuery,
  onSearchChange,
  onBackToSplash,
  language,
  onSelectLanguage,
}) => {
  const t = UI_TRANSLATIONS[language];
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-xs">
      {/* Primary Top Bar with Sideways Scrollable Controls */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth">
          {/* Brand Logo & Back-to-Splash trigger */}
          <button
            onClick={onBackToSplash}
            title="SchemeShortsAI Home / Return to Splash"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none shrink-0 pr-1"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-black border-2 border-yellow-400 p-[1px] shadow-sm flex items-center justify-center">
              <span className="font-black text-xs sm:text-sm text-yellow-400 tracking-tight">SA</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm sm:text-base font-black tracking-tight text-black group-hover:text-yellow-600 transition-colors whitespace-nowrap">
                SchemeShorts<span className="text-yellow-500">AI</span>
              </span>
            </div>
          </button>

          {/* Primary Top Navigation Tabs (Sideways Scrollable Container) */}
          <div className="flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0">
              {/* 1. Home Button */}
              <button
                onClick={() => onTabChange('home')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'home'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-700 hover:text-black hover:bg-white'
                }`}
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
                <span>{t.navHome}</span>
              </button>

              {/* 2. Last Viewed Button */}
              <button
                onClick={() => onTabChange('last_viewed')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'last_viewed'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-700 hover:text-black hover:bg-white'
                }`}
              >
                <History className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
                <span>{t.navLastViewed}</span>
                {lastViewedCount > 0 && (
                  <span
                    className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === 'last_viewed'
                        ? 'bg-black text-yellow-400'
                        : 'bg-neutral-200 text-black'
                    }`}
                  >
                    {lastViewedCount}
                  </span>
                )}
              </button>

              {/* 3. Interested Button */}
              <button
                onClick={() => onTabChange('interested')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTab === 'interested'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-700 hover:text-black hover:bg-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.3]" />
                <span>{t.navInterested}</span>
                {interestedCount > 0 && (
                  <span
                    className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === 'interested'
                        ? 'bg-black text-yellow-400'
                        : 'bg-yellow-400/40 text-black border border-yellow-500/50'
                    }`}
                  >
                    {interestedCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Quick Language Selector */}
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 shrink-0">
              <button
                onClick={() => onSelectLanguage('english')}
                title="English"
                className={`px-2 py-1 rounded-md text-[11px] font-black transition-colors cursor-pointer shrink-0 ${
                  language === 'english'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSelectLanguage('hindi')}
                title="हिन्दी (Hindi)"
                className={`px-2 py-1 rounded-md text-[11px] font-black transition-colors cursor-pointer shrink-0 ${
                  language === 'hindi'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onSelectLanguage('konkani')}
                title="कोंकणी (Konkani)"
                className={`px-2 py-1 rounded-md text-[11px] font-black transition-colors cursor-pointer shrink-0 ${
                  language === 'konkani'
                    ? 'bg-yellow-400 text-black shadow-xs'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                कोंकणी
              </button>
            </div>

            {/* Layout Toggle (Sections vs Player) */}
            {activeTab === 'home' && (
              <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200 shrink-0">
                <button
                  onClick={() => onToggleFeedLayout('sections')}
                  title="Scrollable Sections View"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    feedLayoutMode === 'sections'
                      ? 'bg-yellow-400 text-black shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{t.viewSections}</span>
                </button>
                <button
                  onClick={() => onToggleFeedLayout('player')}
                  title="60s Video Player Mode"
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    feedLayoutMode === 'player'
                      ? 'bg-yellow-400 text-black shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  <PlaySquare className="w-3.5 h-3.5" />
                  <span>{t.viewPlayer}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sub-bar for Search */}
        <div className="pb-3 pt-1 flex items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-neutral-50 border border-neutral-200 text-black text-xs sm:text-sm pl-9 pr-8 py-1.5 rounded-lg focus:outline-none focus:bg-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50 transition-all placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-black font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
