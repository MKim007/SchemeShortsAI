import React from 'react';
import { History, Trash2, PlaySquare, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { Scheme, ViewedRecord } from '../types/scheme';
import { AppLanguage, UI_TRANSLATIONS, getTranslatedSchemeTitle } from '../utils/i18n';
import { getSchemeVideoScript } from '../data/schemeTranslations';

interface LastViewedViewProps {
  viewedRecords: ViewedRecord[];
  allSchemes: Scheme[];
  onClearHistory: () => void;
  onOpenDetails: (scheme: Scheme) => void;
  onPlayInPlayer: (scheme: Scheme) => void;
  onGoToHome: () => void;
  language?: AppLanguage;
}

export const LastViewedView: React.FC<LastViewedViewProps> = ({
  viewedRecords,
  allSchemes,
  onClearHistory,
  onOpenDetails,
  onPlayInPlayer,
  onGoToHome,
  language = 'english',
}) => {
  const t = UI_TRANSLATIONS[language];
  const schemeMap = new Map(allSchemes.map((s) => [s.id, s]));
  const recordsWithSchemes = viewedRecords
    .map((rec) => ({
      record: rec,
      scheme: schemeMap.get(rec.schemeId),
    }))
    .filter((item): item is { record: ViewedRecord; scheme: Scheme } => Boolean(item.scheme));

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (recordsWithSchemes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-black">
          <History className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-xl font-black text-black mb-2">{t.lastViewedEmptyTitle}</h2>
        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
          {t.lastViewedEmptyDesc}
        </p>
        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm transition-colors cursor-pointer shadow-md"
        >
          <span>{t.lastViewedExplore}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Header bar for Last Viewed */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 mb-6">
        <div>
          <h2 className="text-xl font-black text-black flex items-center gap-2">
            <History className="w-5 h-5 text-yellow-600 stroke-[2.3]" />
            <span>{t.lastViewedTitle}</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            {t.lastViewedSubtitle} ({recordsWithSchemes.length})
          </p>
        </div>

        <button
          onClick={onClearHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-neutral-700 hover:text-black bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer shadow-xs"
        >
          <Trash2 className="w-3.5 h-3.5 text-neutral-500" />
          <span>{t.lastViewedClear}</span>
        </button>
      </div>

      {/* Timeline items list */}
      <div className="space-y-3">
        {recordsWithSchemes.map(({ record, scheme }) => {
          const script = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
          const displayTitle = getTranslatedSchemeTitle(scheme.id, scheme.title, language);
          const displayHeadline = language === 'english' ? scheme.headlineBenefit : (script[language]?.headlineBenefit || scheme.headlineBenefit);
          const displayCat = t.categories[scheme.category] || scheme.categoryLabel;

          return (
            <div
              key={`${record.schemeId}-${record.viewedAt}`}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-neutral-200 hover:border-yellow-400 transition-colors shadow-sm"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1">
                  <span className="font-black text-yellow-600">{displayCat}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{formatRelativeTime(record.viewedAt)}</span>
                  </span>
                </div>

                <h3 className="text-base font-black text-black truncate mb-1">
                  {displayTitle}
                </h3>

                <p className="text-xs text-neutral-700 font-semibold">
                  {displayHeadline}
                </p>
              </div>

              {/* Actions for this history record */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onPlayInPlayer(scheme)}
                  className="px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <PlaySquare className="w-3.5 h-3.5" />
                  <span>{t.lastViewedWatch}</span>
                </button>

              <button
                onClick={() => onOpenDetails(scheme)}
                className="px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>Details</span>
              </button>

              <a
                href={scheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Official Portal"
                className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black transition-colors cursor-pointer border border-neutral-200 shadow-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};
