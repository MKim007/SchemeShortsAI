import React, { useState, useEffect } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  Share2, 
  Check, 
  Calendar,
  Building2,
  Users,
  Video
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { schemeAudioService } from '../utils/audio';
import { getSchemeVideoScript, VideoLanguage } from '../data/schemeTranslations';
import { AppLanguage, UI_TRANSLATIONS, getTranslatedSchemeTitle } from '../utils/i18n';

interface VideoPlayerFeedProps {
  schemes: Scheme[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  isInterested: (id: string) => boolean;
  onToggleInterested: (id: string) => void;
  onOpenDetails: (scheme: Scheme) => void;
  onOpenEligibility: (scheme: Scheme) => void;
  onRecordView: (id: string) => void;
  onOpenAiVideo: (scheme: Scheme, lang?: VideoLanguage) => void;
  onScrollToSections?: () => void;
  language?: AppLanguage;
}

export const VideoPlayerFeed: React.FC<VideoPlayerFeedProps> = ({
  schemes,
  currentIndex,
  onNavigate,
  isInterested,
  onToggleInterested,
  onOpenDetails,
  onOpenEligibility,
  onRecordView,
  onOpenAiVideo,
  onScrollToSections,
  language = 'english',
}) => {
  const t = UI_TRANSLATIONS[language];
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [activeSpeechLang, setActiveSpeechLang] = useState<string>(language);

  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(0);
  const [totalSentencesCount, setTotalSentencesCount] = useState<number>(0);

  const currentScheme = schemes[currentIndex];

  useEffect(() => {
    setActiveSpeechLang(language);
  }, [language]);

  useEffect(() => {
    const unsubscribe = schemeAudioService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setActiveSpeechId(state.schemeId);
      if (state.isSpeaking) {
        setActiveSpeechLang(state.language);
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
  }, []);

  const handleLanguageAudio = (lang: VideoLanguage) => {
    setActiveSpeechLang(lang);
    const script = getSchemeVideoScript(currentScheme.id, currentScheme.title, currentScheme.headlineBenefit, currentScheme.keyBullets);
    const content = script[lang];
    
    // Divide the summary into distinct individual sentences
    const sentences = [
      content.tagline,
      content.headlineBenefit,
      ...(content.scriptLines && content.scriptLines.length > 0 ? content.scriptLines : [currentScheme.summaryIn60s])
    ].filter(Boolean);

    schemeAudioService.speakScheme(currentScheme.id, sentences, lang);
  };

  useEffect(() => {
    if (currentScheme) {
      onRecordView(currentScheme.id);
    }
  }, [currentScheme?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'j') {
        if (currentIndex < schemes.length - 1) {
          onNavigate(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        if (currentIndex > 0) {
          onNavigate(currentIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, schemes.length, onNavigate]);

  if (!currentScheme) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-neutral-500">
        <p>No schemes found matching criteria.</p>
      </div>
    );
  }

  const hasInterested = isInterested(currentScheme.id);
  const isThisSpeaking = isSpeaking && activeSpeechId === currentScheme.id;

  const handleAudioToggle = () => {
    if (isThisSpeaking) {
      schemeAudioService.stop();
    } else {
      const targetLang = (activeSpeechLang as VideoLanguage) || (language as VideoLanguage) || 'konkani';
      handleLanguageAudio(targetLang);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Check out ${currentScheme.title} on SchemeAI: ${currentScheme.headlineBenefit}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scriptData = getSchemeVideoScript(currentScheme.id, currentScheme.title, currentScheme.headlineBenefit, currentScheme.keyBullets);
  const displayTitle = getTranslatedSchemeTitle(currentScheme.id, currentScheme.title, language);
  const displayHeadline = language === 'english' ? currentScheme.headlineBenefit : (scriptData[language]?.headlineBenefit || currentScheme.headlineBenefit);
  const displayCategory = t.categories[currentScheme.category] || currentScheme.categoryLabel;

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center py-2 sm:py-6">
      <div className="relative w-full flex items-center justify-center">
        {/* The Video Card Container - White Card with Yellow accents & Black text */}
        <div className="relative w-full max-w-md aspect-[9/16] max-h-[82vh] min-h-[580px] bg-white rounded-3xl border-2 border-neutral-200 shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Subtle Yellow Ambient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 via-yellow-50/10 to-transparent pointer-events-none" />

          {/* Top Header inside Video Player */}
          <div className="relative z-10 p-5 pb-2">
            {/* Progress / Step indicators */}
            <div className="flex items-center gap-1.5 mb-3">
              {schemes.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'bg-yellow-400'
                      : idx < currentIndex
                      ? 'bg-neutral-400'
                      : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black tracking-wider uppercase text-yellow-600">
                {displayCategory}
              </span>
              <span className="text-xs font-mono tabular-nums text-neutral-500 font-bold">
                {currentIndex + 1} / {schemes.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-neutral-600 mt-1">
              <Building2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate font-medium">{currentScheme.ministryOrAuthority}</span>
            </div>
          </div>

          {/* Middle Content Zone: Title, Headline Benefit, and 3 Bullets */}
          <div className="relative z-10 px-5 my-auto">
            {/* Big Headline Benefit Callout */}
            <div className="p-4 rounded-2xl bg-neutral-50 border-2 border-yellow-400 shadow-md mb-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-yellow-700 block mb-1">
                {t.primaryAid}
              </span>
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight leading-tight">
                {displayHeadline}
              </div>
            </div>

            {/* Scheme Title */}
            <h2 className="text-lg sm:text-xl font-black text-black mb-2 leading-snug">
              {displayTitle}
            </h2>

            <p className="text-xs text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
              {currentScheme.summaryIn60s}
            </p>

            {/* 3 Digestible Bullets */}
            <div className="space-y-2.5">
              {currentScheme.keyBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-800">
                  <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center shrink-0 font-black text-[11px] mt-0.5 shadow-xs">
                    {idx + 1}
                  </div>
                  <span className="leading-snug font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* Key metadata strip */}
            <div className="flex items-center gap-3 mt-4 pt-2.5 border-t border-neutral-200 text-[11px] text-neutral-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-yellow-600" />
                <span className="font-semibold">{currentScheme.applicationDeadline}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1 font-mono tabular-nums text-black font-bold">
                <Users className="w-3.5 h-3.5 text-neutral-500" />
                <span>{currentScheme.beneficiariesReached}</span>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Bar inside Video Player */}
          <div className="relative z-10 p-5 pt-3 flex items-center justify-between gap-2 border-t border-neutral-200 bg-neutral-50">
            {/* Check Eligibility Button */}
            <button
              onClick={() => onOpenEligibility(currentScheme)}
              className="flex-1 py-2.5 px-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{t.eligibilityBtn}</span>
            </button>

            {/* Details Button - Opens Studio Page */}
            <button
              onClick={() => {
                if (onOpenAiVideo) {
                  onOpenAiVideo(currentScheme, activeSpeechLang as VideoLanguage);
                } else {
                  onOpenDetails(currentScheme);
                }
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-neutral-200" />
              <span>{t.detailsBtn}</span>
            </button>
          </div>

          {/* Right Vertical Action Stack */}
          <div className="absolute right-3.5 bottom-24 z-20 flex flex-col items-center gap-3.5">
            {/* 1. Interested Bookmark Toggle */}
            <button
              onClick={() => onToggleInterested(currentScheme.id)}
              title={hasInterested ? 'Remove from Interested' : 'Save to Interested'}
              className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer shadow-md ${
                hasInterested
                  ? 'bg-yellow-400 text-black scale-105 shadow-yellow-400/40 border border-yellow-500'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:text-black hover:border-yellow-400'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${hasInterested ? 'fill-black' : ''}`} />
            </button>

            {/* 2. Text-To-Speech Narration Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isThisSpeaking ? 'Stop Audio' : 'Listen 60s Summary'}
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                isThisSpeaking
                  ? 'bg-yellow-400 text-black animate-pulse border border-yellow-500'
                  : 'bg-white text-neutral-700 border border-neutral-300 hover:text-black hover:border-yellow-400'
              }`}
            >
              {isThisSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* 3. Share / Copy Link */}
            <button
              onClick={handleShare}
              title="Share Scheme"
              className="w-11 h-11 rounded-full bg-white text-neutral-700 border border-neutral-300 flex items-center justify-center hover:text-black hover:border-yellow-400 transition-all cursor-pointer shadow-md"
            >
              {copied ? <Check className="w-5 h-5 text-yellow-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* 4. Direct Official Portal Link */}
            <a
              href={currentScheme.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Official Ministry Portal"
              className="w-11 h-11 rounded-full bg-white text-neutral-700 border border-neutral-300 flex items-center justify-center hover:text-black hover:border-yellow-400 transition-all cursor-pointer shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Up/Down Video Advance Controls (Right side for desktop) */}
        <div className="hidden lg:flex flex-col gap-2 ml-4">
          <button
            onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
            disabled={currentIndex === 0}
            title="Previous Video (Up Arrow / k)"
            className={`p-3 rounded-full border transition-colors cursor-pointer ${
              currentIndex > 0
                ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-black hover:border-yellow-400 shadow-sm'
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={() => currentIndex < schemes.length - 1 && onNavigate(currentIndex + 1)}
            disabled={currentIndex === schemes.length - 1}
            title="Next Video (Down Arrow / j)"
            className={`p-3 rounded-full border transition-colors cursor-pointer ${
              currentIndex < schemes.length - 1
                ? 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:text-black hover:border-yellow-400 shadow-sm'
                : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {onScrollToSections && (
        <div className="w-full flex justify-center pt-4 pb-2">
          <button
            onClick={onScrollToSections}
            className="inline-flex items-center gap-2 text-xs text-neutral-800 hover:text-black font-extrabold transition-all cursor-pointer py-2 px-5 rounded-full bg-white border border-neutral-200 hover:border-yellow-400 shadow-md"
          >
            <span>Scroll down to see all schemes under their sections</span>
            <ChevronDown className="w-4 h-4 text-yellow-500 animate-bounce" />
          </button>
        </div>
      )}
    </div>
  );
};
