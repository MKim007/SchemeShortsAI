/**
 * Web Audio API and Web Speech API sound engine
 * Provides:
 * 1. Multi-language speech narration (Konkani, Hindi, English)
 * 2. Web Audio synthesized ambient background music soundtrack for AI video
 * 3. Sound effects (UI clicks, slide transitions, language switch earcon, play/pause chimes)
 */

export type AudioLanguage = 'english' | 'hindi' | 'konkani';
export type SoundEffectType = 'switch' | 'play' | 'pause' | 'slide' | 'success' | 'click';

export interface AudioPlaybackState {
  isSpeaking: boolean;
  schemeId: string | null;
  language: AudioLanguage;
  isBgmPlaying: boolean;
  activeSentenceIndex: number;
  totalSentences: number;
  currentSentenceText: string;
}

class SchemeAudioService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isSpeaking: boolean = false;
  private activeSchemeId: string | null = null;
  private activeLanguage: AudioLanguage = 'english';
  private activeSentenceIndex: number = 0;
  private totalSentences: number = 0;
  private currentSentenceText: string = '';
  private sequenceCancelId: number = 0; // Incremented to abort any active sentence chain
  private audioCtx: AudioContext | null = null;
  private listeners: Set<(state: AudioPlaybackState) => void> = new Set();

  // Background Ambient Music state
  private isBgmActive: boolean = false;
  private bgmGainNode: GainNode | null = null;
  private bgmIntervalId: number | null = null;
  private bgmVolume: number = 0.05; // Gentle background bed volume so voice is clearly heard

  constructor() {
    // Listen for voice loading in modern browsers
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Voices loaded in browser
      };
    }
  }

  public subscribe(listener: (state: AudioPlaybackState) => void) {
    this.listeners.add(listener);
    listener({ 
      isSpeaking: this.isSpeaking, 
      schemeId: this.activeSchemeId, 
      language: this.activeLanguage,
      isBgmPlaying: this.isBgmActive,
      activeSentenceIndex: this.activeSentenceIndex,
      totalSentences: this.totalSentences,
      currentSentenceText: this.currentSentenceText
    });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn({ 
      isSpeaking: this.isSpeaking, 
      schemeId: this.activeSchemeId, 
      language: this.activeLanguage,
      isBgmPlaying: this.isBgmActive,
      activeSentenceIndex: this.activeSentenceIndex,
      totalSentences: this.totalSentences,
      currentSentenceText: this.currentSentenceText
    }));
  }

  private getAudioContext(): AudioContext | null {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      return this.audioCtx;
    } catch {
      return null;
    }
  }

  /**
   * Play interactive sound effects (earcons)
   */
  public playChime(type: SoundEffectType = 'switch') {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'switch') {
        // Friendly ascending two-tone earcon for language switch
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, startTime); // A4
        osc.frequency.exponentialRampToValueAtTime(659.25, startTime + 0.07); // E5
        osc.frequency.setValueAtTime(880, startTime + 0.08); // A5
        gain.gain.setValueAtTime(0.06, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.18);
      } else if (type === 'play') {
        // Bright upbeat play chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(392, startTime); // G4
        osc.frequency.exponentialRampToValueAtTime(523.25, startTime + 0.06); // C5
        osc.frequency.setValueAtTime(659.25, startTime + 0.07); // E5
        gain.gain.setValueAtTime(0.07, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.22);
      } else if (type === 'pause') {
        // Soft descending pause chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, startTime); // D5
        osc.frequency.exponentialRampToValueAtTime(392, startTime + 0.1); // G4
        gain.gain.setValueAtTime(0.05, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.14);
      } else if (type === 'slide') {
        // Soft airy slide transition whoosh
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, startTime);
        osc.frequency.exponentialRampToValueAtTime(500, startTime + 0.04);
        osc.frequency.exponentialRampToValueAtTime(250, startTime + 0.1);
        gain.gain.setValueAtTime(0.03, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.12);
      } else if (type === 'success') {
        // Celebratory harmonic chord
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, startTime + idx * 0.05);
          noteGain.gain.setValueAtTime(0.04, startTime + idx * 0.05);
          noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.start(startTime + idx * 0.05);
          noteOsc.stop(startTime + 0.4);
        });
      } else {
        // Standard subtle click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, startTime);
        osc.frequency.exponentialRampToValueAtTime(400, startTime + 0.03);
        gain.gain.setValueAtTime(0.03, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.04);
      }
    } catch {
      // AudioContext policy or restricted browser
    }
  }

  /**
   * Start generative ambient background soundtrack for AI Video
   * Generates a warm, uplifting chord progression using gentle sine/triangle waves & filters
   */
  public startBackgroundMusic(targetVolume: number = 0.04) {
    if (this.isBgmActive) return;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isBgmActive = true;
    this.bgmVolume = targetVolume;
    this.notify();

    try {
      const masterBgmGain = ctx.createGain();
      masterBgmGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterBgmGain.gain.exponentialRampToValueAtTime(this.bgmVolume, ctx.currentTime + 0.5);
      masterBgmGain.connect(ctx.destination);
      this.bgmGainNode = masterBgmGain;

      // Chord sequences in C Major / G Major: relaxing, modern tech documentary feel
      const chordNotes = [
        [261.63, 329.63, 392.00], // C major (C4, E4, G4)
        [220.00, 261.63, 329.63], // A minor (A3, C4, E4)
        [349.23, 440.00, 523.25], // F major (F4, A4, C5)
        [392.00, 493.88, 587.33], // G major (G4, B4, D5)
      ];

      let chordIndex = 0;

      const playChordPulse = () => {
        if (!this.isBgmActive || !this.audioCtx || this.audioCtx.state === 'closed') return;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        chordIndex++;

        const now = this.audioCtx.currentTime;
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now); // Gentle lowpass filter keeps it warm and mellow

        currentChord.forEach((freq, idx) => {
          if (!this.audioCtx || !this.bgmGainNode) return;
          const osc = this.audioCtx.createOscillator();
          const voiceGain = this.audioCtx.createGain();

          osc.type = idx === 0 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now);

          // Gentle fade in and sustain
          const duration = 2.4;
          voiceGain.gain.setValueAtTime(0.001, now);
          voiceGain.gain.linearRampToValueAtTime(0.025, now + 0.4);
          voiceGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

          osc.connect(voiceGain);
          voiceGain.connect(filter);
          filter.connect(this.bgmGainNode);

          osc.start(now);
          osc.stop(now + duration);
        });
      };

      playChordPulse();
      this.bgmIntervalId = window.setInterval(playChordPulse, 2200);
    } catch {
      // AudioContext fallback
    }
  }

  /**
   * Stop ambient background soundtrack
   */
  public stopBackgroundMusic() {
    if (!this.isBgmActive) return;

    this.isBgmActive = false;
    if (this.bgmIntervalId) {
      clearInterval(this.bgmIntervalId);
      this.bgmIntervalId = null;
    }

    if (this.bgmGainNode && this.audioCtx) {
      try {
        const now = this.audioCtx.currentTime;
        this.bgmGainNode.gain.cancelScheduledValues(now);
        this.bgmGainNode.gain.setValueAtTime(this.bgmGainNode.gain.value, now);
        this.bgmGainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        setTimeout(() => {
          if (this.bgmGainNode) {
            this.bgmGainNode.disconnect();
            this.bgmGainNode = null;
          }
        }, 350);
      } catch {
        this.bgmGainNode = null;
      }
    }

    this.notify();
  }

  public toggleBackgroundMusic(): boolean {
    if (this.isBgmActive) {
      this.stopBackgroundMusic();
      return false;
    } else {
      this.startBackgroundMusic();
      return true;
    }
  }

  public isBackgroundMusicPlaying(): boolean {
    return this.isBgmActive;
  }

  /**
   * Find the most appropriate speech synthesis voice for target language
   */
  public getBestVoice(lang: AudioLanguage): SpeechSynthesisVoice | null {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null;

    if (lang === 'hindi' || lang === 'konkani') {
      // Search for Hindi/Devanagari voices which pronounce Konkani phonetics accurately
      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('hi') || 
        v.name.toLowerCase().includes('hindi') ||
        v.lang.toLowerCase().includes('deva')
      );
      if (hindiVoice) return hindiVoice;

      // Fallback to Indian English or regional voices
      const inVoice = voices.find(v => v.lang.toLowerCase().endsWith('-in') || v.name.toLowerCase().includes('india'));
      if (inVoice) return inVoice;
    } else {
      // English
      const enVoice = voices.find(v => v.lang.toLowerCase() === 'en-in') ||
                      voices.find(v => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) return enVoice;
    }

    return null;
  }

  /**
   * Helper to split text into distinct individual sentences.
   * Handles Devanagari purna viram (।), periods (.), exclamation (!), question marks (?), semicolons, and newlines.
   */
  public splitIntoSentences(text: string): string[] {
    const cleaned = text.trim();
    if (!cleaned) return [];
    
    // Split by sentence delimiters
    const parts = cleaned.split(/([।\.\!\?\n]+)/);
    const sentences: string[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      const sentence = (parts[i] + (parts[i + 1] || '')).trim();
      if (sentence && sentence.length > 1) {
        sentences.push(sentence);
      }
    }
    return sentences.length > 0 ? sentences : [cleaned];
  }

  /**
   * Attain audio for a single sentence from Google Translate and play it.
   * Returns a promise that resolves when the audio completes playing.
   */
  private playSingleGoogleSentence(sentence: string, lang: AudioLanguage, cancelId: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.sequenceCancelId !== cancelId) {
        resolve();
        return;
      }

      const clean = sentence.trim();
      if (!clean) {
        resolve();
        return;
      }

      const ttsUrl = `/api/tts?text=${encodeURIComponent(clean)}&lang=${lang}`;
      const audio = new Audio(ttsUrl);
      this.currentAudioElement = audio;

      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        if (this.currentAudioElement === audio) {
          this.currentAudioElement = null;
        }
        resolve();
      };

      audio.onended = finish;

      const fallbackLangCode = lang === 'konkani' ? 'mr' : 'hi';

      audio.onerror = () => {
        // Fallback directly to Google Translate endpoint
        try {
          if (this.sequenceCancelId !== cancelId) {
            finish();
            return;
          }
          const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${fallbackLangCode}&q=${encodeURIComponent(clean.slice(0, 135))}`;
          const fallbackAudio = new Audio(directUrl);
          this.currentAudioElement = fallbackAudio;
          fallbackAudio.onended = finish;
          fallbackAudio.onerror = finish;
          fallbackAudio.play().catch(finish);
        } catch {
          finish();
        }
      };

      audio.play().catch((err) => {
        console.warn('Audio play error:', err);
        try {
          if (this.sequenceCancelId !== cancelId) {
            finish();
            return;
          }
          const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${fallbackLangCode}&q=${encodeURIComponent(clean.slice(0, 135))}`;
          const fallbackAudio = new Audio(directUrl);
          this.currentAudioElement = fallbackAudio;
          fallbackAudio.onended = finish;
          fallbackAudio.onerror = finish;
          fallbackAudio.play().catch(finish);
        } catch {
          finish();
        }
      });
    });
  }

  /**
   * Play multiple sentences sequentially using Google Translate.
   * Only advances to sentence i+1 when sentence i ends!
   */
  public async playSentencesSequential(
    sentences: string[],
    lang: AudioLanguage = 'konkani',
    schemeId: string | null = null,
    onEnd?: () => void
  ) {
    this.stopSpeechOnly();
    this.playChime('switch');

    const validSentences = sentences.map(s => s.trim()).filter(Boolean);
    if (!validSentences.length) {
      if (onEnd) onEnd();
      return;
    }

    const cancelId = ++this.sequenceCancelId;
    this.isSpeaking = true;
    this.activeSchemeId = schemeId;
    this.activeLanguage = lang;
    this.totalSentences = validSentences.length;

    for (let i = 0; i < validSentences.length; i++) {
      if (this.sequenceCancelId !== cancelId) {
        // Aborted/stopped
        return;
      }

      this.activeSentenceIndex = i;
      this.currentSentenceText = validSentences[i];
      this.notify();

      // Await until the current sentence audio finishes playing!
      await this.playSingleGoogleSentence(validSentences[i], lang, cancelId);

      // Brief natural pause between sentences (200ms)
      if (i < validSentences.length - 1 && this.sequenceCancelId === cancelId) {
        await new Promise((r) => setTimeout(r, 200));
      }
    }

    if (this.sequenceCancelId === cancelId) {
      this.isSpeaking = false;
      this.activeSchemeId = null;
      this.activeSentenceIndex = 0;
      this.totalSentences = 0;
      this.currentSentenceText = '';
      this.notify();
      if (onEnd) onEnd();
    }
  }

  /**
   * Attain audio from Google Translate and apply it to HTML5 Audio element.
   * Automatically splits into sentences and plays each sentence sequentially.
   */
  public playGoogleTranslateAudio(
    text: string,
    lang: AudioLanguage = 'konkani',
    schemeId: string | null = null,
    onEnd?: () => void
  ) {
    const sentences = this.splitIntoSentences(text);
    return this.playSentencesSequential(sentences, lang, schemeId, onEnd);
  }

  /**
   * Speak arbitrary text in the selected language with proper phonetics.
   * If Konkani (or speechSynthesis unavailable), divides into sentences and plays sequentially using Google Translate.
   */
  public speakText(text: string, lang: AudioLanguage = 'english', onEnd?: () => void) {
    if (!text.trim()) {
      if (onEnd) onEnd();
      return;
    }

    // Use high quality Google Translate TTS audio with sequential sentence pacing
    this.playGoogleTranslateAudio(text, lang, null, onEnd);
  }

  /**
   * Play speech synthesis utterances sequentially, advancing only when each sentence completes
   */
  private async speakUtterancesSequential(
    sentences: string[],
    lang: AudioLanguage,
    schemeId: string | null,
    onEnd?: () => void
  ) {
    this.stopSpeechOnly();
    this.playChime('switch');

    const cancelId = ++this.sequenceCancelId;
    this.isSpeaking = true;
    this.activeSchemeId = schemeId;
    this.activeLanguage = lang;
    this.totalSentences = sentences.length;

    for (let i = 0; i < sentences.length; i++) {
      if (this.sequenceCancelId !== cancelId) return;

      this.activeSentenceIndex = i;
      this.currentSentenceText = sentences[i];
      this.notify();

      await new Promise<void>((resolve) => {
        if (!('speechSynthesis' in window)) {
          resolve();
          return;
        }
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(sentences[i]);
        if (lang === 'hindi') {
          utterance.lang = 'hi-IN';
          utterance.rate = 0.96;
        } else {
          utterance.lang = 'en-US';
          utterance.rate = 1.0;
        }

        const matchedVoice = this.getBestVoice(lang);
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      });

      if (i < sentences.length - 1 && this.sequenceCancelId === cancelId) {
        await new Promise((r) => setTimeout(r, 180));
      }
    }

    if (this.sequenceCancelId === cancelId) {
      this.isSpeaking = false;
      this.activeSchemeId = null;
      this.activeSentenceIndex = 0;
      this.totalSentences = 0;
      this.currentSentenceText = '';
      this.notify();
      if (onEnd) onEnd();
    }
  }

  private speakSingleUtterance(
    text: string,
    lang: AudioLanguage,
    schemeId: string | null,
    onEnd?: () => void
  ) {
    this.stopSpeechOnly();
    this.playChime('switch');

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'hindi') {
      utterance.lang = 'hi-IN';
      utterance.rate = 0.96;
    } else {
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
    }

    const matchedVoice = this.getBestVoice(lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.activeSchemeId = schemeId;
      this.activeLanguage = lang;
      this.activeSentenceIndex = 0;
      this.totalSentences = 1;
      this.currentSentenceText = text;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.activeSchemeId = null;
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.playGoogleTranslateAudio(text, lang, schemeId, onEnd);
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  /**
   * Speak a scheme with language selection, divided into sentences.
   * Only plays the next sentence when the current sentence ends.
   */
  public speakScheme(id: string, textOrSentences: string | string[], lang: AudioLanguage = 'english') {
    // If currently speaking this scheme and language, toggle off
    if (this.isSpeaking && this.activeSchemeId === id && this.activeLanguage === lang) {
      this.stop();
      return;
    }

    const sentences = Array.isArray(textOrSentences) 
      ? textOrSentences.filter(Boolean)
      : this.splitIntoSentences(textOrSentences);

    // Attain audio directly from Google Translate and apply sequentially
    this.playSentencesSequential(sentences, lang, id);
  }

  public stopSpeechOnly() {
    this.sequenceCancelId++; // Invalidate any running sequence

    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
        this.currentAudioElement.src = '';
      } catch {
        // ignore
      }
      this.currentAudioElement = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.activeSchemeId = null;
    this.activeSentenceIndex = 0;
    this.totalSentences = 0;
    this.currentSentenceText = '';
    this.notify();
  }

  public stop() {
    this.stopSpeechOnly();
    this.stopBackgroundMusic();
  }

  public getSpeakingState(): AudioPlaybackState {
    return { 
      isSpeaking: this.isSpeaking, 
      schemeId: this.activeSchemeId, 
      language: this.activeLanguage,
      isBgmPlaying: this.isBgmActive,
      activeSentenceIndex: this.activeSentenceIndex,
      totalSentences: this.totalSentences,
      currentSentenceText: this.currentSentenceText
    };
  }
}

export const schemeAudioService = new SchemeAudioService();
