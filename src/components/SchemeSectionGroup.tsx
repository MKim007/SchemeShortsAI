import React from 'react';
import { 
  HeartPulse, 
  Sprout, 
  Briefcase, 
  GraduationCap, 
  Home, 
  ShieldCheck, 
  Sparkles, 
  PlaySquare
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { SchemeSectionMeta } from '../data/schemes';
import { SchemeCard } from './SchemeCard';
import { VideoLanguage } from '../data/schemeTranslations';
import { AppLanguage, UI_TRANSLATIONS } from '../utils/i18n';

interface SchemeSectionGroupProps {
  meta: SchemeSectionMeta;
  schemes: Scheme[];
  isInterested: (id: string) => boolean;
  onToggleInterested: (id: string) => void;
  onOpenDetails: (scheme: Scheme) => void;
  onOpenEligibility: (scheme: Scheme) => void;
  onPlayInPlayer: (scheme: Scheme) => void;
  onPlaySectionVideos: (schemes: Scheme[]) => void;
  onOpenAiVideo: (scheme: Scheme, lang?: VideoLanguage) => void;
  language?: AppLanguage;
}

const getSectionIcon = (iconName: string) => {
  const iconClass = "w-5 h-5 text-black stroke-[2.3]";
  switch (iconName) {
    case 'HeartPulse':
      return <HeartPulse className={iconClass} />;
    case 'Sprout':
      return <Sprout className={iconClass} />;
    case 'Briefcase':
      return <Briefcase className={iconClass} />;
    case 'GraduationCap':
      return <GraduationCap className={iconClass} />;
    case 'Home':
      return <Home className={iconClass} />;
    case 'ShieldCheck':
      return <ShieldCheck className={iconClass} />;
    case 'Sparkles':
      return <Sparkles className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
};

export const SchemeSectionGroup: React.FC<SchemeSectionGroupProps> = ({
  meta,
  schemes,
  isInterested,
  onToggleInterested,
  onOpenDetails,
  onOpenEligibility,
  onPlayInPlayer,
  onPlaySectionVideos,
  onOpenAiVideo,
  language = 'english',
}) => {
  const t = UI_TRANSLATIONS[language];
  if (schemes.length === 0) return null;

  return (
    <section 
      id={`section-${meta.category}`} 
      className="scroll-mt-36 mb-12"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-5 border-b border-neutral-200">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-yellow-400 border border-yellow-500 shrink-0 mt-0.5 shadow-xs">
            {getSectionIcon(meta.icon)}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-lg sm:text-xl font-black text-black tracking-tight">
                {t.categories[meta.category] || meta.title}
              </h2>
              <span className="text-[10px] font-mono tabular-nums px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 font-bold">
                {schemes.length} {schemes.length === 1 ? t.schemeSingular : t.schemePlural}
              </span>
            </div>
            <p className="text-xs text-neutral-600 max-w-2xl leading-relaxed">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Action to watch this section's schemes in 60s video player */}
        <button
          onClick={() => onPlaySectionVideos(schemes)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-black bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-yellow-400 transition-colors cursor-pointer shrink-0 self-start sm:self-center shadow-xs"
        >
          <PlaySquare className="w-3.5 h-3.5 text-yellow-600" />
          <span>{t.watchVideos} {meta.badge}</span>
        </button>
      </div>

      {/* Grid of Schemes under this section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {schemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            isInterested={isInterested(scheme.id)}
            onToggleInterested={onToggleInterested}
            onOpenDetails={onOpenDetails}
            onOpenEligibility={onOpenEligibility}
            onPlayInPlayer={onPlayInPlayer}
            onOpenAiVideo={onOpenAiVideo}
            language={language}
          />
        ))}
      </div>
    </section>
  );
};
