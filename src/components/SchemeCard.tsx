import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Calendar,
  Users,
  Video
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { schemeAudioService, AudioLanguage } from '../utils/audio';
import { getSchemeVideoScript, VideoLanguage } from '../data/schemeTranslations';
import { AppLanguage, UI_TRANSLATIONS, getTranslatedSchemeTitle } from '../utils/i18n';

interface SchemeCardProps {
  scheme: Scheme;
  isInterested: boolean;
  onToggleInterested: (id: string) => void;
  onOpenDetails: (scheme: Scheme) => void;
  onOpenEligibility: (scheme: Scheme) => void;
  onPlayInPlayer?: (scheme: Scheme) => void;
  onOpenAiVideo?: (scheme: Scheme, lang?: VideoLanguage) => void;
  language?: AppLanguage;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  isInterested,
  onToggleInterested,
  onOpenDetails,
  onOpenEligibility,
  onPlayInPlayer,
  onOpenAiVideo,
  language = 'english',
}) => {
  const currentLang = language;
  const t = UI_TRANSLATIONS[currentLang];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeCardLang, setActiveCardLang] = useState<AudioLanguage>(language);

  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(0);
  const [totalSentencesCount, setTotalSentencesCount] = useState<number>(0);

  // Sync active audio language when app language changes
  useEffect(() => {
    setActiveCardLang(language);
  }, [language]);

  useEffect(() => {
    const unsubscribe = schemeAudioService.subscribe((state) => {
      const match = state.isSpeaking && state.schemeId === scheme.id;
      setIsSpeaking(match);
      if (match) {
        setActiveCardLang(state.language);
        setActiveSentenceIdx(state.activeSentenceIndex);
        setTotalSentencesCount(state.totalSentences);
      } else {
        setActiveSentenceIdx(0);
        setTotalSentencesCount(0);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [scheme.id]);

  const handleCardLanguageAudio = (lang: AudioLanguage, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCardLang(lang);
    const script = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
    const content = script[lang];
    
    // Divide the summary into clear distinct sentences
    const sentences = [
      content.tagline,
      content.headlineBenefit,
      ...(content.scriptLines && content.scriptLines.length > 0 ? content.scriptLines : [scheme.summaryIn60s])
    ].filter(Boolean);

    schemeAudioService.speakScheme(scheme.id, sentences, lang);
  };

  const handleAudioToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpeaking) {
      schemeAudioService.stop();
    } else {
      handleCardLanguageAudio(activeCardLang, e);
    }
  };

  const scriptData = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
  const displayTitle = getTranslatedSchemeTitle(scheme.id, scheme.title, currentLang);
  const displayHeadline = currentLang === 'english' ? scheme.headlineBenefit : (scriptData[currentLang]?.headlineBenefit || scheme.headlineBenefit);
  const displayCategoryLabel = t.categories[scheme.category] || scheme.categoryLabel;

  return (
    <div className="group relative flex flex-col justify-between bg-white rounded-2xl border border-neutral-200 hover:border-yellow-400 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-xl">
      {/* Top Header */}
      <div className="p-5 pb-3">
        {/* Unboxed Metadata Discipline */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2.5">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-black text-yellow-600">{displayCategoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate font-mono font-medium text-neutral-600">{scheme.code}</span>
          </div>

          {/* Interested Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleInterested(scheme.id);
            }}
            title={isInterested ? 'Remove from Interested' : 'Save to Interested'}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isInterested
                ? 'text-black bg-yellow-400 border border-yellow-500'
                : 'text-neutral-400 hover:text-black hover:bg-neutral-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isInterested ? 'fill-black' : ''}`} />
          </button>
        </div>

        {/* Big Benefit Callout */}
        <div className="mb-3">
          <div className="text-[10px] font-mono uppercase text-neutral-500 font-bold mb-0.5">{t.primaryAid}</div>
          <div className="text-lg font-black text-black group-hover:text-yellow-600 transition-colors">
            {displayHeadline}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black text-black mb-2 leading-snug line-clamp-1">
          {displayTitle}
        </h3>

        {/* Brief summary */}
        <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
          {scheme.summaryIn60s}
        </p>

        {/* 2 Quick Key Points */}
        <div className="space-y-1.5 text-xs text-neutral-700">
          <div className="flex items-start gap-1.5">
            <span className="text-yellow-500 font-black">✓</span>
            <span className="line-clamp-1">{scheme.keyBullets[0]}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="text-yellow-500 font-black">✓</span>
            <span className="line-clamp-1">{scheme.keyBullets[1]}</span>
          </div>
        </div>
      </div>

      {/* Footer Info & Action Controls */}
      <div className="p-5 pt-3 border-t border-neutral-200 bg-neutral-50/80 mt-auto">
        <div className="flex items-center justify-between text-[11px] text-neutral-600 mb-3">
          <div className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-yellow-600" />
            <span className="truncate max-w-[130px]">{scheme.applicationDeadline}</span>
          </div>
          <div className="flex items-center gap-1 font-mono tabular-nums text-black font-bold">
            <Users className="w-3.5 h-3.5 text-neutral-500" />
            <span>{scheme.beneficiariesReached}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio narration button */}
          <button
            onClick={handleAudioToggle}
            title={isSpeaking ? t.audioStop : t.audioListen}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isSpeaking
                ? 'bg-yellow-400 text-black border-yellow-500 animate-pulse'
                : 'bg-white border-neutral-200 text-neutral-700 hover:text-black hover:border-yellow-400 shadow-xs'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Eligibility trigger */}
          <button
            onClick={() => onOpenEligibility(scheme)}
            className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black text-black bg-yellow-400 hover:bg-yellow-300 border border-yellow-500/40 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>{t.eligibilityBtn}</span>
          </button>

          {/* Details Button - Opens Studio Page */}
          <button
            onClick={() => {
              if (onOpenAiVideo) {
                onOpenAiVideo(scheme, activeCardLang);
              } else {
                onOpenDetails(scheme);
              }
            }}
            className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black text-white bg-black hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <span>{t.detailsBtn}</span>
            <ArrowRight className="w-3 h-3 text-neutral-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
