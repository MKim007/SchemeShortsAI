import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  Check,
  Video,
  Play
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { schemeAudioService, AudioLanguage } from '../utils/audio';
import { getSchemeVideoScript, VideoLanguage } from '../data/schemeTranslations';
import { AppLanguage, UI_TRANSLATIONS, getTranslatedSchemeTitle } from '../utils/i18n';

interface SchemeDetailDrawerProps {
  scheme: Scheme | null;
  onClose: () => void;
  isInterested: boolean;
  onToggleInterested: (id: string) => void;
  onOpenEligibility: (scheme: Scheme) => void;
  onOpenAiVideo: (scheme: Scheme, lang?: VideoLanguage) => void;
  language?: AppLanguage;
}

export const SchemeDetailDrawer: React.FC<SchemeDetailDrawerProps> = ({
  scheme,
  onClose,
  isInterested,
  onToggleInterested,
  onOpenEligibility,
  onOpenAiVideo,
  language = 'english',
}) => {
  const t = UI_TRANSLATIONS[language];
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechLang, setActiveSpeechLang] = useState<string>('');
  const [selectedDrawerLang, setSelectedDrawerLang] = useState<VideoLanguage>(language);
  const [copied, setCopied] = useState(false);
  const [activeSentenceIdx, setActiveSentenceIdx] = useState<number>(0);
  const [totalSentencesCount, setTotalSentencesCount] = useState<number>(0);

  useEffect(() => {
    setSelectedDrawerLang(language);
  }, [language]);

  useEffect(() => {
    if (!scheme) return undefined;
    const unsubscribe = schemeAudioService.subscribe((state) => {
      const match = state.isSpeaking && state.schemeId === scheme.id;
      setIsSpeaking(match);
      if (match) {
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
  }, [scheme?.id]);

  const handlePlayLanguageAudio = (lang: VideoLanguage) => {
    if (!scheme) return;
    setSelectedDrawerLang(lang);
    setActiveSpeechLang(lang);
    const script = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
    const content = script[lang];
    
    // Divide summary and points into separate distinct sentences
    const sentences = [
      content.tagline,
      content.headlineBenefit,
      ...(content.scriptLines && content.scriptLines.length > 0 ? content.scriptLines : [scheme.summaryIn60s])
    ].filter(Boolean);

    schemeAudioService.speakScheme(scheme.id, sentences, lang);
  };

  if (!scheme) return null;

  const scriptData = getSchemeVideoScript(scheme.id, scheme.title, scheme.headlineBenefit, scheme.keyBullets);
  const displayTitle = getTranslatedSchemeTitle(scheme.id, scheme.title, language);
  const displayHeadline = language === 'english' ? scheme.headlineBenefit : (scriptData[language]?.headlineBenefit || scheme.headlineBenefit);
  const displayTagline = language === 'english' ? scheme.tagline : (scriptData[language]?.tagline || scheme.tagline);
  const displayCategoryLabel = t.categories[scheme.category] || scheme.categoryLabel;

  const handleAudioToggle = () => {
    if (isSpeaking) {
      schemeAudioService.stop();
    } else {
      const targetLang = (selectedDrawerLang as AudioLanguage) || (language as AudioLanguage) || 'konkani';
      handlePlayLanguageAudio(targetLang);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Learn about ${displayTitle} on SchemeAI: ${displayHeadline}. Apply at: ${scheme.officialPortalUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm overflow-hidden">
      {/* Slide-over panel container */}
      <div className="relative w-full max-w-2xl bg-white border-l border-neutral-200 h-full flex flex-col justify-between shadow-2xl overflow-y-auto text-black">
        {/* Sticky Drawer Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md p-6 pb-4 border-b border-neutral-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <span className="font-black text-yellow-600">{displayCategoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-bold text-neutral-800">{scheme.code}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read */}
            <button
              onClick={handleAudioToggle}
              title={isSpeaking ? t.audioStop : t.audioListen}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSpeaking
                  ? 'bg-yellow-400 text-black border-yellow-500 animate-pulse'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-700 hover:text-black hover:border-yellow-400'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleInterested(scheme.id)}
              title={isInterested ? 'Remove from Interested' : 'Save to Interested'}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isInterested
                  ? 'text-black bg-yellow-400 border border-yellow-500'
                  : 'text-neutral-700 hover:text-black bg-neutral-100 border border-neutral-200'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isInterested ? 'fill-black' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              title={t.drawerShareScheme}
              className="p-2 rounded-lg text-neutral-700 hover:text-black bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-yellow-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              title={t.drawerClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-black bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 space-y-6">
          {/* Headline Aid Card */}
          <div className="p-5 rounded-2xl bg-neutral-50 border-2 border-yellow-400 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-700 block mb-1">
              {t.drawerPrimeBenefit}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-black tracking-tight leading-tight mb-2">
              {displayHeadline}
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium">
              {displayTagline}
            </p>
          </div>

          {/* Scheme Title & Authority */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-black mb-2 leading-snug">
              {displayTitle}
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <Building2 className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>{scheme.ministryOrAuthority}</span>
            </div>
          </div>

          {/* 60-Second Digest */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h3 className="text-xs font-black uppercase tracking-wider text-black mb-2">
              {t.drawerSummary}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-medium">
              {scheme.summaryIn60s}
            </p>
          </div>

          {/* 3 Core Highlights */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3">
              {t.keyHighlights}
            </h3>
            <div className="space-y-2.5">
              {scheme.keyBullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800">
                  <div className="w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-relaxed font-medium">{bullet}</span>
                </div>
              ))}
            </div>

            {/* AI Video Creation Option below Key Scheme Highlights */}
            <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border-2 border-yellow-400 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-black text-yellow-400 flex items-center justify-center shadow-xs">
                    <Video className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-black">Create AI Video Explaining Scheme</h4>
                    <p className="text-[11px] text-neutral-600 font-medium">
                      Translated script and voiceover in <span className="font-bold text-black">Konkani, Hindi or English</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Audio in 3 Languages */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-[11px] font-black uppercase text-neutral-600 mb-1.5">
                  <span>Listen in Your Language:</span>
                  {isSpeaking && totalSentencesCount > 0 ? (
                    <span className="text-[10px] text-yellow-700 font-extrabold lowercase animate-pulse">
                      Sentence {activeSentenceIdx + 1} of {totalSentencesCount}
                    </span>
                  ) : (
                    <span className="text-[10px] text-yellow-700 font-bold lowercase">Click to play audio</span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['konkani', 'hindi', 'english'] as const).map((lang) => {
                    const isLangActive = isSpeaking && activeSpeechLang === lang;
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handlePlayLanguageAudio(lang)}
                        className={`p-2 rounded-xl border text-xs font-black transition-all flex flex-col items-center justify-center gap-1 cursor-pointer shadow-2xs group ${
                          isLangActive
                            ? 'bg-yellow-400 border-yellow-500 text-black shadow-sm animate-pulse'
                            : 'bg-white border-neutral-200 hover:border-yellow-400 text-black'
                        }`}
                        title={`Listen to scheme summary in ${lang === 'konkani' ? 'Konkani (कोंकणी)' : lang === 'hindi' ? 'Hindi (हिन्दी)' : 'English'}`}
                      >
                        <div className="flex items-center gap-1">
                          <Volume2 className={`w-3.5 h-3.5 ${isLangActive ? 'text-black' : 'text-yellow-600 group-hover:text-black'}`} />
                          <span>{lang === 'konkani' ? 'कोंकणी' : lang === 'hindi' ? 'हिन्दी' : 'English'}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 group-hover:text-black font-semibold">
                          {lang === 'konkani' ? 'Konkani' : lang === 'hindi' ? 'Hindi' : 'English'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => onOpenAiVideo(scheme, selectedDrawerLang)}
                className="w-full py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs border border-yellow-500/40"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Open AI Video Studio</span>
              </button>
            </div>
          </div>

          {/* Detailed Eligibility Section */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span>Eligibility Criteria</span>
              </h3>
              <button
                onClick={() => {
                  onClose();
                  onOpenEligibility(scheme);
                }}
                className="text-xs font-extrabold text-black hover:text-yellow-600 underline cursor-pointer"
              >
                Calculate My Score
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-800">
              <div className="flex items-center justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Age Bracket:</span>
                <span className="font-mono text-black font-black">{scheme.eligibility.minAge} to {scheme.eligibility.maxAge} Years</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Target Occupations:</span>
                <span className="text-black font-bold text-right max-w-xs">{scheme.eligibility.allowedOccupations.join(', ')}</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Income Ceiling:</span>
                <span className="font-mono text-black font-black">
                  {scheme.eligibility.maxAnnualIncomeInLakhs !== undefined
                    ? `Max ₹${scheme.eligibility.maxAnnualIncomeInLakhs} Lakhs/year`
                    : 'No Income Cap'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Citizenship / Residence:</span>
                <span className="text-black font-semibold">{scheme.eligibility.citizenRequirement}</span>
              </div>

              {scheme.eligibility.specialCriteria && (
                <div className="pt-2 text-neutral-600">
                  <span className="font-bold text-black">Special Notes: </span>
                  {scheme.eligibility.specialCriteria}
                </div>
              )}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-yellow-500" />
              <span>Mandatory Documents Required</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.requiredDocuments.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                  <span className="leading-tight font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deadline info strip */}
          <div className="flex items-center gap-2 text-xs text-neutral-800 bg-neutral-100 border border-neutral-200 p-3 rounded-xl font-medium">
            <Calendar className="w-4 h-4 text-yellow-600 shrink-0" />
            <div>
              <span className="font-black text-black">Application Cycle: </span>
              {scheme.applicationDeadline}
            </div>
          </div>
        </div>

        {/* Sticky Drawer Footer Actions */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md p-6 border-t border-neutral-200 flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenEligibility(scheme);
            }}
            className="flex-1 py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-neutral-200"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Test My Eligibility</span>
          </button>

          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-yellow-400/20"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
