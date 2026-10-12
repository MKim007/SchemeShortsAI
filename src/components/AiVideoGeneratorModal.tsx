import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Video, 
  CheckCircle2, 
  Download, 
  ExternalLink,
  Languages,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Send,
  Loader2,
  Copy,
  Music
} from 'lucide-react';
import { Scheme } from '../types/scheme';
import { VideoLanguage, getSchemeVideoScript } from '../data/schemeTranslations';
import { translateText, getLanguageMetadata } from '../utils/translator';
import { schemeAudioService } from '../utils/audio';

interface AiVideoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  scheme: Scheme | null;
  initialLanguage?: VideoLanguage;
}

export const AiVideoGeneratorModal: React.FC<AiVideoGeneratorModalProps> = ({
  isOpen,
  onClose,
  scheme,
  initialLanguage = 'english',
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<VideoLanguage>(initialLanguage);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);
  const [isBgmEnabled, setIsBgmEnabled] = useState<boolean>(true);
  const [copiedTranscript, setCopiedTranscript] = useState<boolean>(false);
  const [copiedAllTranscripts, setCopiedAllTranscripts] = useState<boolean>(false);

  // Script Translation Studio State
  const [activeTab, setActiveTab] = useState<'video' | 'script_studio' | 'custom_translator'>('video');
  const [customInputText, setCustomInputText] = useState<string>('');
  const [customTranslatedText, setCustomTranslatedText] = useState<string>('');
  const [customTargetLanguage, setCustomTargetLanguage] = useState<VideoLanguage>('konkani');
  const [isTranslatingCustom, setIsTranslatingCustom] = useState<boolean>(false);

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // When modal opens or scheme changes, simulate AI video rendering pipeline
  useEffect(() => {
    if (!isOpen || !scheme) {
      stopAudio();
      schemeAudioService.stop();
      return;
    }

    if (initialLanguage) {
      setSelectedLanguage(initialLanguage);
    }
    setIsGenerating(true);
    setIsPlaying(false);
    setCurrentSlideIndex(0);
    setPlaybackProgress(0);
    setActiveTab('video');
    setCustomInputText('');
    setCustomTranslatedText('');

    const timer = setTimeout(() => {
      setIsGenerating(false);
      setIsPlaying(true);
      schemeAudioService.playChime('play');
    }, 900);

    return () => {
      clearTimeout(timer);
      stopAudio();
      schemeAudioService.stop();
    };
  }, [isOpen, scheme?.id, initialLanguage]);

  const scriptData = scheme
    ? getSchemeVideoScript(
        scheme.id,
        scheme.title,
        scheme.headlineBenefit,
        scheme.keyBullets
      )
    : null;

  const currentLangContent = scriptData ? scriptData[selectedLanguage] : null;
  const scriptLines = currentLangContent?.scriptLines || [];

  // Stop audio speech synthesis
  const stopAudio = () => {
    schemeAudioService.stopSpeechOnly();
    setIsSpeakingAudio(false);
  };

  // Play audio for current slide with multi-language voice and force-play support
  const playSlideAudio = (lineIndex: number, lang: VideoLanguage, forceSpeak: boolean = false) => {
    if (isMuted && !forceSpeak) return;

    stopAudio();

    // Read directly from target language script to ensure correct phonetics
    const targetLangContent = scriptData ? scriptData[lang] : null;
    const lines = targetLangContent?.scriptLines || [];
    const textToSpeak = lines[lineIndex] || targetLangContent?.tagline || '';
    if (!textToSpeak) return;

    setIsSpeakingAudio(true);
    schemeAudioService.speakText(textToSpeak, lang, () => {
      setIsSpeakingAudio(false);
    });
  };

  // Synchronize Background Music with Play/Mute states
  useEffect(() => {
    if (isPlaying && !isMuted && isBgmEnabled) {
      schemeAudioService.startBackgroundMusic();
    } else {
      schemeAudioService.stopBackgroundMusic();
    }
  }, [isPlaying, isMuted, isBgmEnabled]);

  // Handle Playback State: Only advance to the next sentence when current sentence audio ends
  useEffect(() => {
    if (isGenerating || isTranslating || !isPlaying || !scriptLines.length) return;

    let isCancelled = false;

    // Read current sentence audio, and only advance when it finishes playing!
    const targetLangContent = scriptData ? scriptData[selectedLanguage] : null;
    const lines = targetLangContent?.scriptLines || [];
    const textToSpeak = lines[currentSlideIndex] || targetLangContent?.tagline || '';

    if (!isMuted && textToSpeak) {
      setIsSpeakingAudio(true);
      schemeAudioService.speakText(textToSpeak, selectedLanguage, () => {
        if (isCancelled) return;
        setIsSpeakingAudio(false);

        // When current sentence ends, check if we advance to next sentence
        if (currentSlideIndex < scriptLines.length - 1) {
          schemeAudioService.playChime('slide');
          setCurrentSlideIndex((prev) => prev + 1);
          setPlaybackProgress(((currentSlideIndex + 1) / scriptLines.length) * 100);
        } else {
          // Reached the end of all sentences
          setIsPlaying(false);
          setPlaybackProgress(100);
          schemeAudioService.stopBackgroundMusic();
          schemeAudioService.playChime('success');
        }
      });
    } else {
      // If muted, advance after a readable duration (4.5s)
      const timer = window.setTimeout(() => {
        if (isCancelled) return;
        if (currentSlideIndex < scriptLines.length - 1) {
          schemeAudioService.playChime('slide');
          setCurrentSlideIndex((prev) => prev + 1);
          setPlaybackProgress(((currentSlideIndex + 1) / scriptLines.length) * 100);
        } else {
          setIsPlaying(false);
          setPlaybackProgress(100);
          schemeAudioService.stopBackgroundMusic();
          schemeAudioService.playChime('success');
        }
      }, 4500);

      return () => {
        isCancelled = true;
        clearTimeout(timer);
      };
    }

    return () => {
      isCancelled = true;
      stopAudio();
    };
  }, [isPlaying, isGenerating, isTranslating, selectedLanguage, currentSlideIndex, isMuted, scriptLines.length]);

  // Handle language switch / translation - ALWAYS provides audio in the selected language!
  const handleTranslateToLanguage = (newLang: VideoLanguage) => {
    stopAudio();
    setIsMuted(false); // Unmute so user immediately hears audio
    schemeAudioService.playChime('switch');

    // If clicked on already selected language, replay audio for the current slide immediately
    if (newLang === selectedLanguage && !isTranslating) {
      playSlideAudio(currentSlideIndex, newLang, true);
      return;
    }

    setIsTranslating(true);
    setSelectedLanguage(newLang);

    // Provide translation transition and immediately start speaking in the new language
    setTimeout(() => {
      setIsTranslating(false);
      // Play audio in the newly selected language right away
      playSlideAudio(currentSlideIndex, newLang, true);
      if (isPlaying && isBgmEnabled) {
        schemeAudioService.startBackgroundMusic();
      }
    }, 280);
  };

  const handleTogglePlay = () => {
    if (playbackProgress >= 100) {
      setPlaybackProgress(0);
      setCurrentSlideIndex(0);
      setIsPlaying(true);
      schemeAudioService.playChime('play');
    } else {
      if (isPlaying) {
        stopAudio();
        setIsPlaying(false);
        schemeAudioService.stopBackgroundMusic();
        schemeAudioService.playChime('pause');
      } else {
        setIsPlaying(true);
        schemeAudioService.playChime('play');
      }
    }
  };

  const handleReplay = () => {
    stopAudio();
    schemeAudioService.stopBackgroundMusic();
    setPlaybackProgress(0);
    setCurrentSlideIndex(0);
    setIsPlaying(true);
    schemeAudioService.playChime('play');
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      schemeAudioService.playChime('play');
      if (isPlaying) {
        if (isBgmEnabled) schemeAudioService.startBackgroundMusic();
        playSlideAudio(currentSlideIndex, selectedLanguage, true);
      }
    } else {
      setIsMuted(true);
      stopAudio();
      schemeAudioService.stopBackgroundMusic();
      schemeAudioService.playChime('pause');
    }
  };

  const handleToggleBgm = () => {
    if (isBgmEnabled) {
      setIsBgmEnabled(false);
      schemeAudioService.stopBackgroundMusic();
    } else {
      setIsBgmEnabled(true);
      schemeAudioService.playChime('play');
      if (isPlaying && !isMuted) {
        schemeAudioService.startBackgroundMusic();
      }
    }
  };

  const handleCopyTranscript = () => {
    if (!currentLangContent) return;
    const fullText = currentLangContent.scriptLines.join('\n\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `AI Video Explainer Transcript (${currentLangContent.languageLabel}) for ${scheme?.title}:\n\n${fullText}`
      );
      setCopiedTranscript(true);
      setTimeout(() => setCopiedTranscript(false), 2000);
    }
  };

  const handleCopyAllTranslations = () => {
    if (!scriptData || !scheme) return;
    const combined = `=== SCHEMEAI SCRIPT TRANSLATIONS ===\nScheme: ${scheme.title} (${scheme.code})\n\n[1. ENGLISH]\nTagline: ${scriptData.english.tagline}\nBenefit: ${scriptData.english.headlineBenefit}\n${scriptData.english.scriptLines.map((l, i) => `Slide ${i+1}: ${l}`).join('\n')}\n\n[2. HINDI (हिन्दी)]\nTagline: ${scriptData.hindi.tagline}\nBenefit: ${scriptData.hindi.headlineBenefit}\n${scriptData.hindi.scriptLines.map((l, i) => `Slide ${i+1}: ${l}`).join('\n')}\n\n[3. KONKANI (कोंकणी)]\nTagline: ${scriptData.konkani.tagline}\nBenefit: ${scriptData.konkani.headlineBenefit}\n${scriptData.konkani.scriptLines.map((l, i) => `Slide ${i+1}: ${l}`).join('\n')}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(combined);
      setCopiedAllTranscripts(true);
      setTimeout(() => setCopiedAllTranscripts(false), 2000);
    }
  };

  // Handle custom translator target language change with audio
  const handleCustomTargetLang = (lang: VideoLanguage) => {
    setCustomTargetLanguage(lang);
    schemeAudioService.playChime('switch');
    if (customTranslatedText) {
      schemeAudioService.speakText(customTranslatedText, lang);
    } else {
      const announcement = lang === 'konkani' 
        ? 'कोंकणी भास निवडल्या.' 
        : lang === 'hindi' 
        ? 'हिन्दी भाषा का चयन किया गया है।' 
        : 'English language selected.';
      schemeAudioService.speakText(announcement, lang);
    }
  };

  // Custom text translator action
  const handleTranslateCustom = async () => {
    if (!customInputText.trim()) return;
    setIsTranslatingCustom(true);
    try {
      const res = await translateText(customInputText, customTargetLanguage, 'english');
      setCustomTranslatedText(res.translatedText);
      
      // Auto-speak translated result with voice matching
      schemeAudioService.speakText(res.translatedText, customTargetLanguage);
    } finally {
      setIsTranslatingCustom(false);
    }
  };

  if (!isOpen || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border-2 border-neutral-200 rounded-3xl shadow-2xl overflow-hidden text-black my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-black flex items-center justify-center shadow-xs border border-yellow-500/30">
              <Video className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-black">
                  AI Video & Multi-Language Script Studio
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-black border border-yellow-500/40">
                  Konkani · Hindi · English
                </span>
              </div>
              <p className="text-xs text-neutral-600 truncate max-w-xs sm:max-w-lg font-medium">
                {scheme.title}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto">
          {/* ================= TAB 1: AI VIDEO PLAYER ================= */}
          {activeTab === 'video' && (
            <div>
              {/* Video Canvas / Player Area */}
              <div className="relative w-full aspect-video bg-black flex flex-col justify-between overflow-hidden select-none">
                {/* Generation / Translation Loader State */}
                {isGenerating || isTranslating ? (
                  <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="relative mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-yellow-400 text-black flex items-center justify-center animate-bounce shadow-xl shadow-yellow-400/30">
                        <Sparkles className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white mb-1">
                      {isTranslating ? 'Translating Script & Voiceover...' : 'Generating AI Video Explainer...'}
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-sm mb-3">
                      Translating script into <span className="text-yellow-400 font-bold uppercase">{selectedLanguage}</span> and synthesizing synchronized audio.
                    </p>
                    <div className="w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 animate-pulse w-3/4 rounded-full" />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Dynamic Animated Presentation Slide */}
                    <div className="relative z-10 w-full h-full p-5 sm:p-8 flex flex-col justify-between text-white bg-gradient-to-br from-neutral-950 via-neutral-900 to-black">
                      {/* Ambient Subtle Lighting in Video */}
                      <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400/15 rounded-full blur-3xl pointer-events-none" />

                      {/* Top Video Header: Logo & Avatar Presenter Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black text-xs">
                            AI
                          </div>
                          <div>
                            <span className="text-xs font-black tracking-tight text-white block">
                              Scheme<span className="text-yellow-400">AI</span>
                            </span>
                            <span className="text-[10px] text-neutral-400 block font-medium">
                              Verified Government Explainer
                            </span>
                          </div>
                        </div>

                        {/* Active Audio Wave Visualizer */}
                        {isPlaying && !isMuted && (
                          <div className="flex items-end gap-1 h-5 px-2.5 py-1 rounded-md bg-yellow-400/10 border border-yellow-400/30">
                            <div className="w-1 bg-yellow-400 rounded-full animate-[bounce_0.8s_infinite] h-4" />
                            <div className="w-1 bg-yellow-400 rounded-full animate-[bounce_0.6s_infinite] h-2.5" />
                            <div className="w-1 bg-yellow-400 rounded-full animate-[bounce_1.0s_infinite] h-5" />
                            <div className="w-1 bg-yellow-400 rounded-full animate-[bounce_0.7s_infinite] h-3" />
                            <span className="text-[10px] font-mono text-yellow-400 ml-1 font-bold">
                              {selectedLanguage.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Main Visual Slide Card Content */}
                      <div className="relative z-10 my-auto py-2">
                        {currentSlideIndex === 0 && (
                          <div className="text-left animate-fadeIn">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black mb-2 inline-block">
                              {scheme.categoryLabel}
                            </span>
                            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                              {scheme.title}
                            </h2>
                            <div className="text-base sm:text-xl font-extrabold text-yellow-400 mb-2">
                              {scheme.headlineBenefit}
                            </div>
                            <p className="text-xs text-neutral-300 max-w-xl font-medium">
                              {currentLangContent?.tagline}
                            </p>
                          </div>
                        )}

                        {currentSlideIndex === 1 && (
                          <div className="text-left animate-fadeIn">
                            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-1 block">
                              Guaranteed Welfare Aid
                            </span>
                            <div className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                              {scheme.headlineBenefit}
                            </div>
                            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-neutral-200 max-w-lg leading-relaxed">
                              {scriptLines[1] || scheme.summaryIn60s}
                            </div>
                          </div>
                        )}

                        {currentSlideIndex === 2 && (
                          <div className="text-left animate-fadeIn">
                            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-1 block">
                              Prime Highlights & Criteria
                            </span>
                            <h3 className="text-lg sm:text-2xl font-black text-white mb-3">
                              Key Rules & Eligibility
                            </h3>
                            <div className="space-y-2 max-w-xl">
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-xs text-neutral-200">
                                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                                <span>{scheme.keyBullets[0]}</span>
                              </div>
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-xs text-neutral-200">
                                <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                                <span>{scheme.keyBullets[1]}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentSlideIndex === 3 && (
                          <div className="text-left animate-fadeIn">
                            <span className="text-[10px] font-black uppercase tracking-wider text-yellow-400 mb-1 block">
                              How to Enroll & Apply
                            </span>
                            <h3 className="text-lg sm:text-2xl font-black text-white mb-2">
                              Official Direct Ministry Route
                            </h3>
                            <a
                              href={scheme.officialPortalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs transition-colors shadow-md"
                            >
                              <span>Open Official Portal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Scrub Bar */}
                    <div 
                      className="w-full h-1.5 bg-neutral-800 cursor-pointer relative group"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = ((e.clientX - rect.left) / rect.width) * 100;
                        setPlaybackProgress(pct);
                        const newSlide = Math.min(
                          scriptLines.length - 1,
                          Math.floor((pct / 100) * scriptLines.length)
                        );
                        setCurrentSlideIndex(newSlide);
                        playSlideAudio(newSlide, selectedLanguage);
                      }}
                    >
                      <div 
                        className="h-full bg-yellow-400 transition-all duration-100"
                        style={{ width: `${playbackProgress}%` }}
                      />
                    </div>

                    {/* Bottom Video Controls Bar */}
                    <div className="p-3 bg-neutral-950 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleTogglePlay}
                          className="p-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-colors cursor-pointer"
                          title={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                        </button>

                        <button
                          onClick={handleReplay}
                          className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                          title="Restart Video"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>

                        <button
                          onClick={handleToggleMute}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            isMuted 
                              ? 'text-red-400 hover:bg-neutral-800' 
                              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                          }`}
                          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>

                        {/* Background Music Score Toggle */}
                        <button
                          onClick={handleToggleBgm}
                          className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold border ${
                            isBgmEnabled && !isMuted
                              ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40'
                              : 'text-neutral-500 border-neutral-800 hover:text-neutral-300'
                          }`}
                          title={isBgmEnabled ? 'Turn Background Music OFF' : 'Turn Background Music ON'}
                        >
                          <Music className={`w-3.5 h-3.5 ${isBgmEnabled && !isMuted && isPlaying ? 'animate-bounce text-yellow-400' : ''}`} />
                          <span className="text-[11px] font-black">
                            {isBgmEnabled ? 'BGM On' : 'BGM Off'}
                          </span>
                        </button>
                      </div>

                      {/* Sound & Video Duration Indicator */}
                      <div className="flex items-center gap-2.5">
                        {isPlaying && !isMuted && (
                          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-[10px] font-mono font-bold">
                            <span className="flex items-end gap-0.5 h-2.5">
                              <span className="w-0.5 h-2 bg-yellow-400 animate-pulse" />
                              <span className="w-0.5 h-3 bg-yellow-400 animate-pulse delay-75" />
                              <span className="w-0.5 h-1.5 bg-yellow-400 animate-pulse delay-150" />
                            </span>
                            <span>Sound On ({currentLangContent?.languageLabel})</span>
                          </div>
                        )}
                        <div className="text-[11px] font-mono text-neutral-400 font-bold">
                          <span>{Math.floor((playbackProgress / 100) * 32)}s / 32s</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Language Selection & Audio Settings (Konkani, Hindi, English) */}
              <div className="p-4 sm:p-6 bg-white border-t border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-black text-black mb-1">
                      <Languages className="w-4 h-4 text-yellow-600 stroke-[2.5]" />
                      <span>Translate Script & Audio Voiceover</span>
                    </div>
                    <p className="text-xs text-neutral-600">
                      Click any language to translate the video slides, subtitles, and voiceover:
                    </p>
                  </div>

                  {/* Language Switcher Buttons: Konkani, Hindi, English */}
                  <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl border border-neutral-200 shrink-0">
                    {/* 1. English */}
                    <button
                      onClick={() => handleTranslateToLanguage('english')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedLanguage === 'english'
                          ? 'bg-yellow-400 text-black shadow-xs font-black'
                          : 'text-neutral-700 hover:text-black hover:bg-white'
                      }`}
                      title="Switch to English and listen to audio"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${selectedLanguage === 'english' && isSpeakingAudio ? 'text-black animate-pulse' : 'text-neutral-500'}`} />
                      <span>English</span>
                    </button>

                    {/* 2. Hindi */}
                    <button
                      onClick={() => handleTranslateToLanguage('hindi')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedLanguage === 'hindi'
                          ? 'bg-yellow-400 text-black shadow-xs font-black'
                          : 'text-neutral-700 hover:text-black hover:bg-white'
                      }`}
                      title="Switch to Hindi and listen to audio"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${selectedLanguage === 'hindi' && isSpeakingAudio ? 'text-black animate-pulse' : 'text-neutral-500'}`} />
                      <span>हिन्दी (Hindi)</span>
                    </button>

                    {/* 3. Konkani */}
                    <button
                      onClick={() => handleTranslateToLanguage('konkani')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedLanguage === 'konkani'
                          ? 'bg-yellow-400 text-black shadow-xs font-black'
                          : 'text-neutral-700 hover:text-black hover:bg-white'
                      }`}
                      title="Switch to Konkani and listen to audio"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${selectedLanguage === 'konkani' && isSpeakingAudio ? 'text-black animate-pulse' : 'text-neutral-500'}`} />
                      <span>कोंकणी (Konkani)</span>
                    </button>
                  </div>
                </div>

                {/* Translation & Audio Feedback Notice */}
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isSpeakingAudio ? 'bg-yellow-500 animate-ping' : 'bg-yellow-400'}`} />
                    <span className="font-medium text-neutral-700">
                      Active Language: <strong className="text-black">{currentLangContent?.nativeLabel} ({currentLangContent?.languageLabel})</strong>
                      {isSpeakingAudio && (
                        <span className="ml-2 font-black text-black inline-flex items-center gap-1">
                          <span className="inline-block animate-bounce">🔊</span> Audio Speaking Now...
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setIsMuted(false);
                        playSlideAudio(currentSlideIndex, selectedLanguage, true);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-[11px] transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Play audio in the selected language"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isSpeakingAudio ? 'Replay Voice' : `Play in ${currentLangContent?.languageLabel}`}</span>
                    </button>
                  </div>
                </div>

                {/* Action Row: Copy Script / Direct Apply */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-200 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyTranscript}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black font-bold transition-colors cursor-pointer border border-neutral-200 shadow-2xs"
                    >
                      {copiedTranscript ? <Check className="w-3.5 h-3.5 text-yellow-600" /> : <Download className="w-3.5 h-3.5" />}
                      <span>{copiedTranscript ? 'Copied!' : `Copy ${currentLangContent?.languageLabel} Script`}</span>
                    </button>

                    <button
                      onClick={handleCopyAllTranslations}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black font-bold transition-colors cursor-pointer border border-neutral-200 shadow-2xs"
                    >
                      {copiedAllTranscripts ? <Check className="w-3.5 h-3.5 text-yellow-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAllTranscripts ? 'All Copied!' : 'Copy All 3 Languages'}</span>
                    </button>
                  </div>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white font-extrabold transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Apply on Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: SCRIPT TRANSLATION STUDIO (ALL 3 LANGUAGES) ================= */}
          {activeTab === 'script_studio' && scriptData && (
            <div className="p-4 sm:p-6 bg-white space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
                <div>
                  <h3 className="text-base font-black text-black flex items-center gap-2">
                    <Languages className="w-5 h-5 text-yellow-600" />
                    <span>Side-by-Side Multi-Language Script Breakdown</span>
                  </h3>
                  <p className="text-xs text-neutral-600">
                    Compare the exact video scripts translated into Konkani, Hindi, and English for each slide.
                  </p>
                </div>

                <button
                  onClick={handleCopyAllTranslations}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs transition-colors cursor-pointer shadow-xs"
                >
                  {copiedAllTranscripts ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Complete 3-Language Script</span>
                </button>
              </div>

              {/* Slide by Slide Translation Cards */}
              <div className="space-y-4">
                {[0, 1, 2, 3].map((slideIdx) => (
                  <div key={slideIdx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 hover:border-yellow-400 transition-colors">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-black text-yellow-400 flex items-center justify-center font-mono font-bold text-xs">
                          {slideIdx + 1}
                        </span>
                        <span className="font-black text-black">
                          {slideIdx === 0 && 'Slide 1: Scheme Overview & Intro'}
                          {slideIdx === 1 && 'Slide 2: Primary Financial Aid Benefit'}
                          {slideIdx === 2 && 'Slide 3: Eligibility & Key Highlights'}
                          {slideIdx === 3 && 'Slide 4: Application Route & Portal'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentSlideIndex(slideIdx);
                          setActiveTab('video');
                          setIsPlaying(true);
                          playSlideAudio(slideIdx, selectedLanguage);
                        }}
                        className="text-xs font-black text-black hover:text-yellow-700 underline cursor-pointer"
                      >
                        Play in Video Player →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* English Script */}
                      <div className="p-3 rounded-xl bg-white border border-neutral-200">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-neutral-500 mb-1">
                          <span>English</span>
                          <button
                            onClick={() => {
                              schemeAudioService.speakText(scriptData.english.scriptLines[slideIdx], 'english');
                            }}
                            className="text-yellow-600 hover:text-black font-bold cursor-pointer p-1 rounded hover:bg-neutral-100"
                            title="Listen in English"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                          {scriptData.english.scriptLines[slideIdx]}
                        </p>
                      </div>

                      {/* Hindi Script */}
                      <div className="p-3 rounded-xl bg-white border border-neutral-200">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-neutral-500 mb-1">
                          <span>हिन्दी (Hindi)</span>
                          <button
                            onClick={() => {
                              schemeAudioService.speakText(scriptData.hindi.scriptLines[slideIdx], 'hindi');
                            }}
                            className="text-yellow-600 hover:text-black font-bold cursor-pointer p-1 rounded hover:bg-neutral-100"
                            title="Listen in Hindi"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                          {scriptData.hindi.scriptLines[slideIdx]}
                        </p>
                      </div>

                      {/* Konkani Script */}
                      <div className="p-3 rounded-xl bg-yellow-50/50 border border-yellow-300">
                        <div className="flex items-center justify-between text-[10px] font-black uppercase text-yellow-800 mb-1">
                          <span>कोंकणी (Konkani)</span>
                          <button
                            onClick={() => {
                              schemeAudioService.speakText(scriptData.konkani.scriptLines[slideIdx], 'konkani');
                            }}
                            className="text-yellow-700 hover:text-black font-bold cursor-pointer p-1 rounded hover:bg-yellow-100"
                            title="Listen in Konkani"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-neutral-900 leading-relaxed font-semibold">
                          {scriptData.konkani.scriptLines[slideIdx]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 3: LIVE CUSTOM SCRIPT TRANSLATOR ================= */}
          {activeTab === 'custom_translator' && (
            <div className="p-4 sm:p-6 bg-white space-y-6">
              <div>
                <h3 className="text-base font-black text-black flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-yellow-600" />
                  <span>Translate Custom Script or Citizen Questions</span>
                </h3>
                <p className="text-xs text-neutral-600">
                  Type any custom script line, scheme question, or note to instantly translate and listen in Konkani, Hindi, or English.
                </p>
              </div>

              {/* Quick Prompt Presets */}
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 block mb-2">
                  Quick Presets for {scheme.code}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    `What is the primary benefit of ${scheme.code}?`,
                    `What documents are mandatory to apply?`,
                    `Is there any family income ceiling for this scheme?`,
                    `How do I submit the application online?`
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomInputText(preset)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-medium cursor-pointer border border-neutral-200 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Translation Input Area */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
                <div>
                  <label className="text-xs font-black text-black block mb-1">
                    Input Script / Question:
                  </label>
                  <textarea
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder="Enter script text or question to translate..."
                    rows={3}
                    className="w-full p-3 rounded-xl bg-white border border-neutral-300 text-xs text-black placeholder:text-neutral-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-700">Translate to:</span>
                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-neutral-200">
                      {(['konkani', 'hindi', 'english'] as VideoLanguage[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => handleCustomTargetLang(lang)}
                          className={`px-2.5 py-1 rounded text-xs font-extrabold cursor-pointer transition-colors flex items-center gap-1 ${
                            customTargetLanguage === lang
                              ? 'bg-yellow-400 text-black shadow-xs'
                              : 'text-neutral-600 hover:text-black'
                          }`}
                          title={`Switch to ${lang} and listen to audio`}
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{lang === 'konkani' ? 'कोंकणी (Konkani)' : lang === 'hindi' ? 'हिन्दी (Hindi)' : 'English'}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleTranslateCustom}
                    disabled={isTranslatingCustom || !customInputText.trim()}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-black font-black text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    {isTranslatingCustom ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Translating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Translate & Speak</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Translated Output Box */}
                {customTranslatedText && (
                  <div className="p-4 rounded-xl bg-white border-2 border-yellow-400 mt-4 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs mb-2 pb-1 border-b border-neutral-100">
                      <span className="font-black text-black">
                        Translated Output ({customTargetLanguage.toUpperCase()}):
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            schemeAudioService.speakText(customTranslatedText, customTargetLanguage);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-black hover:text-yellow-700 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen Again</span>
                        </button>

                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(customTranslatedText);
                            }
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900 leading-relaxed">
                      {customTranslatedText}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
