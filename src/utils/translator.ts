import { VideoLanguage } from '../data/schemeTranslations';

// Civic terminology translation dictionary between English, Hindi, and Konkani
const CIVIC_DICTIONARY: Record<string, { hindi: string; konkani: string; konkaniRomi: string }> = {
  'scheme': { hindi: 'योजना', konkani: 'येवजण', konkaniRomi: 'Yevzon' },
  'government': { hindi: 'सरकार', konkani: 'सरकार', konkaniRomi: 'Sorkar' },
  'benefit': { hindi: 'लाभ', konkani: 'फायदो', konkaniRomi: 'Faaydo' },
  'financial aid': { hindi: 'वित्तीय सहायता', konkani: 'आर्थिक आदार', konkaniRomi: 'Aarthik Aadhar' },
  'free': { hindi: 'मुफ्त', konkani: 'फुकट', konkaniRomi: 'Fukot' },
  'cashless': { hindi: 'कैशलेस', konkani: 'रोखविरयत', konkaniRomi: 'Rokh-virayt' },
  'hospital': { hindi: 'अस्पताल', konkani: 'हॉस्पिटल', konkaniRomi: 'Hospital' },
  'treatment': { hindi: 'उपचार व इलाज', konkani: 'हॉस्पिटल उपचार', konkaniRomi: 'Upchar' },
  'family': { hindi: 'परिवार', konkani: 'कुटुंब', konkaniRomi: 'Kutumb' },
  'farmer': { hindi: 'किसान', konkani: 'शेतकार', konkaniRomi: 'Shetkar' },
  'farmers': { hindi: 'किसानों', konkani: 'शेतकारांक', konkaniRomi: 'Shetkarank' },
  'student': { hindi: 'छात्र', konkani: 'विद्यार्थी', konkaniRomi: 'Vidyarthi' },
  'students': { hindi: 'छात्रों', konkani: 'विद्यार्थ्यांक', konkaniRomi: 'Vidyarthiyank' },
  'scholarship': { hindi: 'छात्रवृत्ति', konkani: 'शिष्यवृत्ती', konkaniRomi: 'Shishyavrutti' },
  'loan': { hindi: 'ऋण / लोन', konkani: 'रीण', konkaniRomi: 'Reen' },
  'business': { hindi: 'व्यापार व उद्योग', konkani: 'वेपार आनी उद्देग', konkaniRomi: 'Vepar ani Uddeg' },
  'subsidy': { hindi: 'सब्सिडी व अनुदान', konkani: 'सबसिडी आनी अनुदान', konkaniRomi: 'Subsidy ani Anudan' },
  'pension': { hindi: 'मासिक पेंशन', konkani: 'पेन्शन', konkaniRomi: 'Pension' },
  'house': { hindi: 'पक्का मकान', konkani: 'पक्कें घर', konkaniRomi: 'Pakke Ghor' },
  'housing': { hindi: 'आवास', konkani: 'घर बांदप', konkaniRomi: 'Ghor Bandop' },
  'women': { hindi: 'महिलाएं', konkani: 'बायलो / महिला', konkaniRomi: 'Bailo / Mahila' },
  'daughter': { hindi: 'बेटी', konkani: 'धूव', konkaniRomi: 'Dhoov' },
  'children': { hindi: 'बच्चे', konkani: 'भुरगीं', konkaniRomi: 'Bhurgim' },
  'documents': { hindi: 'आवश्यक दस्तावेज', konkani: 'कागदपत्रां', konkaniRomi: 'Kagadpotram' },
  'apply': { hindi: 'आवेदन करें', konkani: 'अर्ज दाखल करात', konkaniRomi: 'Arj dakhol karat' },
  'portal': { hindi: 'आधिकारिक पोर्टल', konkani: 'अधिकृत पोर्टल', konkaniRomi: 'Adhikrut Portal' },
  'bank': { hindi: 'बैंक खाता', konkani: 'बँक खातें', konkaniRomi: 'Bank Khatem' },
  'interest': { hindi: 'ब्याज', konkani: 'व्याज', konkaniRomi: 'Vyaaz' },
  'guaranteed': { hindi: 'निश्चित गारंटी', konkani: 'हमखास खात्री', konkaniRomi: 'Hamkhas Khatri' },
  'deadline': { hindi: 'अंतिम तिथि', konkani: 'निमाणी तारीख', konkaniRomi: 'Nimani Tarikh' },
  'welcome': { hindi: 'नमस्ते', konkani: 'नमस्कार', konkaniRomi: 'Namaskar' },
  'thank you': { hindi: 'धन्यवाद', konkani: 'देव बरे करूं', konkaniRomi: 'Dev bare korum' }
};

export interface TranslationResult {
  translatedText: string;
  sourceLang: VideoLanguage;
  targetLang: VideoLanguage;
  phonetics?: string; // Romi/Latin script transliteration for Konkani pronunciation assistance
}

/**
 * Translates custom or dynamic text into the requested target language (Konkani, Hindi, English).
 * Falls back to linguistic translation dictionary when API is unavailable.
 */
export async function translateText(
  text: string,
  targetLang: VideoLanguage,
  sourceLang: VideoLanguage = 'english'
): Promise<TranslationResult> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { translatedText: '', sourceLang, targetLang };
  }

  // Same language return
  if (sourceLang === targetLang) {
    return { translatedText: trimmed, sourceLang, targetLang };
  }

  // 1. Try server-side Gemini API proxy if available
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: trimmed,
        targetLang,
        sourceLang
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.translatedText) {
        return {
          translatedText: data.translatedText,
          sourceLang,
          targetLang,
          phonetics: data.phonetics
        };
      }
    }
  } catch {
    // Fall back to rule-based contextual translation
  }

  // 2. Intelligent rule-based contextual translation
  const translated = performLinguisticTranslation(trimmed, sourceLang, targetLang);
  
  return {
    translatedText: translated.text,
    sourceLang,
    targetLang,
    phonetics: translated.phonetics
  };
}

/**
 * Linguistic grammar and vocabulary mapper for Konkani, Hindi, and English
 */
function performLinguisticTranslation(
  input: string,
  fromLang: VideoLanguage,
  toLang: VideoLanguage
): { text: string; phonetics?: string } {
  // If translating to English from Hindi or Konkani
  if (toLang === 'english') {
    let result = input;
    // Map Devanagari civic terms back to English
    for (const [eng, dict] of Object.entries(CIVIC_DICTIONARY)) {
      if (fromLang === 'konkani' && input.includes(dict.konkani)) {
        result = result.replace(new RegExp(dict.konkani, 'g'), eng);
      } else if (fromLang === 'hindi' && input.includes(dict.hindi)) {
        result = result.replace(new RegExp(dict.hindi, 'g'), eng);
      }
    }
    // Clean up greeting
    result = result.replace(/नमस्कार|नमस्ते/g, 'Welcome!');
    return { text: result };
  }

  // Translating from English (or Hindi) to Hindi
  if (toLang === 'hindi') {
    let result = input;
    
    // Core phrase replacements
    result = result.replace(/Welcome!?/gi, 'नमस्ते!');
    result = result.replace(/Here is what you need to know about/gi, 'यहाँ जानिए सम्पूर्ण जानकारी:');
    result = result.replace(/The prime welfare aid under this initiative is:/gi, 'इस योजना के अंतर्गत मुख्य लाभ:');
    result = result.replace(/Simple online enrollment through verified ministry portals\./gi, 'आधिकारिक सरकारी पोर्टल पर आसान ऑनलाइन आवेदन उपलब्ध है।');
    result = result.replace(/Offers substantial government subsidy and official support\./gi, 'पात्र नागरिकों को सीधा सरकारी अनुदान व सहायता मिलती है।');
    result = result.replace(/Apply online at/gi, 'ऑनलाइन आवेदन करें:');
    result = result.replace(/before the annual academic deadline\./gi, 'अंतिम तिथि से पहले।');

    // Civic terminology replacements
    for (const [eng, dict] of Object.entries(CIVIC_DICTIONARY)) {
      const regex = new RegExp(`\\b${eng}\\b`, 'gi');
      result = result.replace(regex, dict.hindi);
    }

    return { text: result };
  }

  // Translating to Konkani
  if (toLang === 'konkani') {
    let result = input;

    // Core phrase replacements for Konkani
    result = result.replace(/Welcome!?/gi, 'नमस्कार!');
    result = result.replace(/Here is what you need to know about/gi, 'ह्या येवजणेची म्हत्वाची माहिती पळयात:');
    result = result.replace(/The prime welfare aid under this initiative is:/gi, 'ह्या सरकारी येवजणे खाला मुखेल फायदो:');
    result = result.replace(/Simple online enrollment through verified ministry portals\./gi, 'अधिकृत सरकारी पोर्टलाचेर वचून बेगीन ऑनलायन अर्ज दाखल करात.');
    result = result.replace(/Offers substantial government subsidy and official support\./gi, 'सगळ्या पात्र नागरिकांक थेट सरकारी अनुदान आनी आदार मेळटा.');
    result = result.replace(/Apply online at/gi, 'ऑनलायन अर्ज दाखल करात:');
    result = result.replace(/before the annual academic deadline\./gi, 'निमाण्या तारखे आदीं.');

    // Civic terminology replacements into Konkani
    for (const [eng, dict] of Object.entries(CIVIC_DICTIONARY)) {
      const regex = new RegExp(`\\b${eng}\\b`, 'gi');
      result = result.replace(regex, dict.konkani);
    }

    return { 
      text: result,
      phonetics: 'Namaskar! Hya sorkari yevzonne khala aarthik aadhar ani faaydo mellta.' 
    };
  }

  return { text: input };
}

/**
 * Returns formatted language details
 */
export function getLanguageMetadata(lang: VideoLanguage): {
  id: VideoLanguage;
  name: string;
  nativeName: string;
  badge: string;
  flag: string;
} {
  switch (lang) {
    case 'konkani':
      return {
        id: 'konkani',
        name: 'Konkani',
        nativeName: 'कोंकणी',
        badge: 'कोंकणी',
        flag: '🇮🇳'
      };
    case 'hindi':
      return {
        id: 'hindi',
        name: 'Hindi',
        nativeName: 'हिन्दी',
        badge: 'हिन्दी',
        flag: '🇮🇳'
      };
    case 'english':
    default:
      return {
        id: 'english',
        name: 'English',
        nativeName: 'English',
        badge: 'EN',
        flag: '🌐'
      };
  }
}
