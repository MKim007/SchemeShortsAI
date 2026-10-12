import React, { useState } from 'react';
import { 
  Bookmark, 
  Trash2, 
  PlaySquare, 
  ExternalLink, 
  ArrowRight, 
  Calendar, 
  FileCheck2, 
  Share2, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { AppLanguage, UI_TRANSLATIONS, getTranslatedSchemeTitle } from '../utils/i18n';
import { getSchemeVideoScript } from '../data/schemeTranslations';

interface InterestedViewProps {
  interestedIds: string[];
  allSchemes: Scheme[];
  onToggleInterested: (id: string) => void;
  onOpenDetails: (scheme: Scheme) => void;
  onPlayInPlayer: (scheme: Scheme) => void;
  onGoToHome: () => void;
  language?: AppLanguage;
}

export const InterestedView: React.FC<InterestedViewProps> = ({
  interestedIds,
  allSchemes,
  onToggleInterested,
  onOpenDetails,
  onPlayInPlayer,
  onGoToHome,
  language = 'english',
}) => {
  const t = UI_TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);

  const interestedSchemes = allSchemes.filter((s) => interestedIds.includes(s.id));

  // Compute common documents across interested schemes
  const allDocs = Array.from(
    new Set(interestedSchemes.flatMap((s) => s.requiredDocuments))
  );

  const handleCopySavedList = () => {
    const text = interestedSchemes
      .map(
        (s, i) =>
          `${i + 1}. ${s.title}\n   Benefit: ${s.headlineBenefit}\n   Deadline: ${s.applicationDeadline}\n   Portal: ${s.officialPortalUrl}`
      )
      .join('\n\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `My Saved Schemes from SchemeAI:\n\n${text}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (interestedSchemes.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto mb-4 text-black">
          <Bookmark className="w-8 h-8 text-yellow-600" />
        </div>
        <h2 className="text-xl font-black text-black mb-2">{t.interestedEmptyTitle}</h2>
        <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
          {t.interestedEmptyDesc}
        </p>
        <button
          onClick={onGoToHome}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm transition-colors cursor-pointer shadow-md"
        >
          <span>{t.interestedFind}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 mb-6">
        <div>
          <h2 className="text-xl font-black text-black flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-yellow-500 fill-yellow-400 stroke-[2.3]" />
            <span>{t.interestedTitle} ({interestedSchemes.length})</span>
          </h2>
          <p className="text-xs text-neutral-600 mt-0.5">
            {t.interestedSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySavedList}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-yellow-400 transition-colors cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-yellow-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? t.interestedListCopied : t.interestedCopyList}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Saved Scheme Cards */}
        <div className="lg:col-span-2 space-y-4">
          {interestedSchemes.map((scheme) => {
            const script = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
            const displayTitle = getTranslatedSchemeTitle(scheme.id, scheme.title, language);
            const displayHeadline = language === 'english' ? scheme.headlineBenefit : (script[language]?.headlineBenefit || scheme.headlineBenefit);
            const displayCat = t.categories[scheme.category] || scheme.categoryLabel;

            return (
              <div
                key={scheme.id}
                className="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-yellow-400 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-yellow-600">{displayCat}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">{scheme.code}</span>
                    </div>

                    <button
                      onClick={() => onToggleInterested(scheme.id)}
                      title="Remove from Interested"
                      className="text-xs text-neutral-400 hover:text-black transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-black text-black mb-1">{displayTitle}</h3>

                  <div className="text-sm font-extrabold text-neutral-900 mb-3">
                    {displayHeadline}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-700 bg-neutral-100 border border-neutral-200 px-3 py-1.5 rounded-lg mb-4 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-yellow-600 shrink-0" />
                    <span className="truncate">{scheme.applicationDeadline}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-neutral-200">
                  <button
                    onClick={() => onPlayInPlayer(scheme)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <PlaySquare className="w-3.5 h-3.5" />
                    <span>{t.interestedWatch}</span>
                  </button>

                <button
                  onClick={() => onOpenDetails(scheme)}
                  className="py-1.5 px-3 rounded-lg bg-black hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Guidelines</span>
                </button>

                <a
                  href={scheme.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 shadow-xs"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

        {/* Right 1 Column: Document Readiness Checklist & Tips */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2 text-black font-extrabold text-sm mb-3">
              <FileCheck2 className="w-4 h-4 text-yellow-500" />
              <span>Universal Document Checklist</span>
            </div>
            <p className="text-xs text-neutral-600 mb-4">
              Gather these documents in advance to prepare your applications:
            </p>

            <ul className="space-y-2">
              {allDocs.slice(0, 7).map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-neutral-700">
                  <span className="w-4 h-4 rounded bg-yellow-400 text-black font-black flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-snug font-medium">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-50 border border-yellow-200 shadow-xs">
            <div className="flex items-center gap-2 text-black font-black text-xs mb-1.5">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span>Important Citizen Notice</span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              Official government schemes never charge application fees via unauthorized third-party agents. Always use verified state/central portals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
