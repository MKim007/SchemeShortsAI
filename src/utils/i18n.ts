export type AppLanguage = 'english' | 'hindi' | 'konkani';

export interface TranslationStrings {
  brandSubtitle: string;
  verifiedSchemes: string;
  navHome: string;
  navLastViewed: string;
  navInterested: string;
  searchPlaceholder: string;
  viewSections: string;
  viewPlayer: string;
  changeLanguage: string;
  
  spotlightEngine: string;
  spotlightDigest: string;
  spotlightTitle: string;
  spotlightDesc: string;
  launchPlayer: string;
  scrollToSections: string;
  videoIndex: string;
  videoOf: string;
  videoAdvHint: string;
  switchToSections: string;
  backToTop: string;
  allLoaded: string;

  primaryAid: string;
  eligibilityBtn: string;
  detailsBtn: string;
  createAiVideo: string;
  keyHighlights: string;
  audioListen: string;
  audioStop: string;
  watchVideos: string;
  schemeSingular: string;
  schemePlural: string;

  allCategories: string;
  categories: {
    healthcare: string;
    agriculture: string;
    startup_msme: string;
    education: string;
    welfare: string;
    senior_citizen: string;
    women_child: string;
  };

  drawerMinistryGuidelines: string;
  drawerPrimeBenefit: string;
  drawerEligibilityCriteria: string;
  drawerRequiredDocuments: string;
  drawerApplicationRoute: string;
  drawerApplyOnPortal: string;
  drawerShareScheme: string;
  drawerLinkCopied: string;
  drawerClose: string;
  drawerOverview: string;
  drawerSummary: string;
  drawerKeyProvisions: string;
  drawerDeadline: string;
  drawerBeneficiaries: string;

  lastViewedTitle: string;
  lastViewedSubtitle: string;
  lastViewedClear: string;
  lastViewedEmptyTitle: string;
  lastViewedEmptyDesc: string;
  lastViewedExplore: string;
  lastViewedWatch: string;

  interestedTitle: string;
  interestedSubtitle: string;
  interestedCopyList: string;
  interestedListCopied: string;
  interestedEmptyTitle: string;
  interestedEmptyDesc: string;
  interestedFind: string;
  interestedWatch: string;
}

export const UI_TRANSLATIONS: Record<AppLanguage, TranslationStrings> = {
  english: {
    brandSubtitle: 'Civic Intelligence Engine',
    verifiedSchemes: 'Verified Schemes Live',
    navHome: 'Home',
    navLastViewed: 'Last Viewed',
    navInterested: 'Interested',
    searchPlaceholder: 'Search scheme name, grant amount, or ministry...',
    viewSections: 'Sections',
    viewPlayer: 'Player',
    changeLanguage: 'Language',

    spotlightEngine: '60s Video Engine',
    spotlightDigest: 'Bite-Sized Welfare Digest',
    spotlightTitle: 'Explore Government & Public Aid Schemes Below',
    spotlightDesc: 'Scroll down to browse all schemes neatly organized under their respective sectors—or launch the interactive 60-second video player.',
    launchPlayer: 'Launch Video Player',
    scrollToSections: 'Scroll Down to Sections',
    videoIndex: 'Video',
    videoOf: 'of',
    videoAdvHint: 'Use down arrow or scroll to advance',
    switchToSections: 'Switch to Scrollable Sections View',
    backToTop: 'Back to Top',
    allLoaded: 'All verified national schemes loaded',

    primaryAid: 'Primary Aid',
    eligibilityBtn: 'Eligibility',
    detailsBtn: 'Details',
    createAiVideo: 'Create AI Video Explaining Scheme',
    keyHighlights: 'Key Scheme Highlights',
    audioListen: 'Listen 60s summary',
    audioStop: 'Stop Audio',
    watchVideos: 'Watch',
    schemeSingular: 'Scheme',
    schemePlural: 'Schemes',

    allCategories: 'All Categories',
    categories: {
      healthcare: 'Healthcare & Wellness',
      agriculture: 'Agriculture & Farming',
      startup_msme: 'Startups & MSME',
      education: 'Education & Students',
      welfare: 'Citizen Welfare & Housing',
      senior_citizen: 'Senior Citizens & Social Security',
      women_child: 'Women & Child Welfare',
    },

    drawerMinistryGuidelines: 'Official Ministry Guidelines',
    drawerPrimeBenefit: 'Prime Benefit',
    drawerEligibilityCriteria: 'Eligibility Criteria',
    drawerRequiredDocuments: 'Required Documents',
    drawerApplicationRoute: 'Official Application Route',
    drawerApplyOnPortal: 'Apply on Official Ministry Portal',
    drawerShareScheme: 'Share Scheme',
    drawerLinkCopied: 'Link Copied!',
    drawerClose: 'Close Guidelines',
    drawerOverview: 'Program Overview & Scope',
    drawerSummary: '60-Second Overview',
    drawerKeyProvisions: 'Key Provisions & Rules',
    drawerDeadline: 'Application Cycle',
    drawerBeneficiaries: 'Beneficiaries Reached',

    lastViewedTitle: 'Recently Viewed Schemes',
    lastViewedSubtitle: 'Chronological audit of schemes you reviewed recently.',
    lastViewedClear: 'Clear History',
    lastViewedEmptyTitle: 'No Viewing History Yet',
    lastViewedEmptyDesc: 'Schemes you inspect or watch in the 60-second video player will automatically appear here so you can pick up where you left off.',
    lastViewedExplore: 'Explore Schemes on Home',
    lastViewedWatch: 'Watch Video',

    interestedTitle: 'My Interested Schemes',
    interestedSubtitle: 'Your personal application saved list with deadline reminders and document readiness.',
    interestedCopyList: 'Copy Saved List',
    interestedListCopied: 'List Copied!',
    interestedEmptyTitle: 'No Interested Schemes Saved Yet',
    interestedEmptyDesc: 'Bookmark welfare programs, loans, and subsidies you plan to apply for by clicking the bookmark icon on any scheme card or video.',
    interestedFind: 'Find Schemes to Save',
    interestedWatch: 'Watch Video',
  },

  hindi: {
    brandSubtitle: 'नागरिक सहायता एवं कल्याण मंच',
    verifiedSchemes: 'सत्यापित योजनाएं उपलब्ध',
    navHome: 'होम',
    navLastViewed: 'हाल ही में देखे गए',
    navInterested: 'पसंदीदा योजनाएं',
    searchPlaceholder: 'योजना का नाम, अनुदान राशि या मंत्रालय खोजें...',
    viewSections: 'अनुभाग',
    viewPlayer: 'वीडियो प्लेयर',
    changeLanguage: 'भाषा',

    spotlightEngine: '60 सेकंड वीडियो इंजन',
    spotlightDigest: 'संक्षिप्त सरकारी सहायता डाइजेस्ट',
    spotlightTitle: 'सभी सरकारी व जन कल्याणकारी योजनाएं देखें',
    spotlightDesc: 'नीचे सभी योजनाओं को संबंधित क्षेत्रों के अनुसार ब्राउज़ करें—या सीधे 60 सेकंड का वीडियो प्लेयर शुरू करें।',
    launchPlayer: 'वीडियो प्लेयर शुरू करें',
    scrollToSections: 'नीचे अनुभागों पर जाएं',
    videoIndex: 'वीडियो',
    videoOf: 'का',
    videoAdvHint: 'आगे बढ़ने के लिए नीचे स्क्रोल करें',
    switchToSections: 'अनुभाग सूची में देखें',
    backToTop: 'शीर्ष पर वापस जाएं',
    allLoaded: 'सभी सत्यापित राष्ट्रीय योजनाएं लोड की गईं',

    primaryAid: 'मुख्य सहायता',
    eligibilityBtn: 'पात्रता जांचें',
    detailsBtn: 'पूर्ण विवरण',
    createAiVideo: 'योजना का एआई वीडियो बनाएं',
    keyHighlights: 'योजना के मुख्य बिंदु',
    audioListen: '60 सेकंड सारांश सुनें',
    audioStop: 'ऑडियो बंद करें',
    watchVideos: 'वीडियो देखें',
    schemeSingular: 'योजना',
    schemePlural: 'योजनाएं',

    allCategories: 'सभी श्रेणियां',
    categories: {
      healthcare: 'स्वास्थ्य एवं कल्याण',
      agriculture: 'कृषि एवं किसान कल्याण',
      startup_msme: 'स्टार्टअप एवं एमएसएमई',
      education: 'शिक्षा एवं छात्र',
      welfare: 'नागरिक कल्याण एवं आवास',
      senior_citizen: 'वरिष्ठ नागरिक एवं सामाजिक सुरक्षा',
      women_child: 'महिला एवं बाल विकास',
    },

    drawerMinistryGuidelines: 'आधिकारिक मंत्रालय दिशा-निर्देश',
    drawerPrimeBenefit: 'मुख्य सरकारी लाभ',
    drawerEligibilityCriteria: 'पात्रता मानदंड',
    drawerRequiredDocuments: 'आवश्यक दस्तावेज',
    drawerApplicationRoute: 'आधिकारिक आवेदन प्रक्रिया',
    drawerApplyOnPortal: 'आधिकारिक मंत्रालय पोर्टल पर आवेदन करें',
    drawerShareScheme: 'योजना शेयर करें',
    drawerLinkCopied: 'लिंक कॉपी हो गया!',
    drawerClose: 'दिशा-निर्देश बंद करें',
    drawerOverview: 'योजना का संक्षिप्त विवरण',
    drawerSummary: '60 सेकंड का सारांश',
    drawerKeyProvisions: 'मुख्य प्रावधान एवं नियम',
    drawerDeadline: 'आवेदन की समयसीमा',
    drawerBeneficiaries: 'लाभांवित नागरिक',

    lastViewedTitle: 'हाल ही में देखी गई योजनाएं',
    lastViewedSubtitle: 'हाल ही में जांची गई योजनाओं का कालक्रमानुसार विवरण।',
    lastViewedClear: 'इतिहास मिटाएं',
    lastViewedEmptyTitle: 'अभी कोई इतिहास नहीं है',
    lastViewedEmptyDesc: 'जिन योजनाओं को आप 60 सेकंड के वीडियो प्लेयर में देखेंगे वे यहां जुड़ जाएंगी ताकि आप आसानी से पुनः देख सकें।',
    lastViewedExplore: 'होम पर योजनाएं खोजें',
    lastViewedWatch: 'वीडियो देखें',

    interestedTitle: 'मेरी पसंदीदा योजनाएं',
    interestedSubtitle: 'आपकी सहेजी गई योजनाओं की सूची, जरूरी दस्तावेज व तिथियों सहित।',
    interestedCopyList: 'सहेजी गई सूची कॉपी करें',
    interestedListCopied: 'सूची कॉपी हो गई!',
    interestedEmptyTitle: 'अभी कोई योजना सहेजी नहीं गई',
    interestedEmptyDesc: 'योजना कार्ड या वीडियो पर बुकमार्क आइकन दबाकर अपनी पसंदीदा योजनाओं को सहेजें।',
    interestedFind: 'सहेजने हेतु योजनाएं खोजें',
    interestedWatch: 'वीडियो देखें',
  },

  konkani: {
    brandSubtitle: 'नागरिक कल्याण आनी म्हायती मंच',
    verifiedSchemes: 'तपासिल्ल्यो येवजण्यो उपलब्ध',
    navHome: 'होम',
    navLastViewed: 'फाटल्यान पळयल्ले',
    navInterested: 'आवडिल्ल्यो येवजण्यो',
    searchPlaceholder: 'येवजणेचें नांव, अनुदानाची रक्कम वा मंत्रालय सोधात...',
    viewSections: 'विभाग',
    viewPlayer: 'व्हिडिओ प्लेयर',
    changeLanguage: 'भास',

    spotlightEngine: '60 सेकंद व्हिडिओ इंजिन',
    spotlightDigest: 'थोडक्यांत सरकारी आदार',
    spotlightTitle: 'सगळ्यो सरकारी आनी लोककल्याण येवजण्यो पळयात',
    spotlightDesc: 'सकयल विभागां प्रमाण येवजण्यो पळयात—वा थेट 60 सेकंदांचो संवादात्मक व्हिडिओ प्लेयर सुरू करात.',
    launchPlayer: 'व्हिडिओ प्लेयर सुरू करात',
    scrollToSections: 'सकयल विभागांचेर वचात',
    videoIndex: 'व्हिडिओ',
    videoOf: 'पयकी',
    videoAdvHint: 'फुडें वचपाक स्क्रोल करात वा बाण वापरत',
    switchToSections: 'विभाग वळेरेंत बदलोत',
    backToTop: 'वयल्यान वचात',
    allLoaded: 'सगळ्यो तपासिल्ल्यो राष्ट्रीय येवजण्यो लोड जाल्यो',

    primaryAid: 'मुखेल आदार',
    eligibilityBtn: 'पात्रताय तपासात',
    detailsBtn: 'सविस्तर म्हायती',
    createAiVideo: 'येवजणेचो एआय व्हिडिओ तयार करात',
    keyHighlights: 'येवजणेचे मुखेल मुद्दे',
    audioListen: '60 सेकंद सारांश आयकात',
    audioStop: 'ऑडिओ बंद करात',
    watchVideos: 'व्हिडिओ पळयात',
    schemeSingular: 'येवजण',
    schemePlural: 'येवजण्यो',

    allCategories: 'सगळ्यो वर्ग',
    categories: {
      healthcare: 'भलायकी आनी आरोग्य',
      agriculture: 'शेतकाम आनी शेतकार',
      startup_msme: 'स्टार्टअप आनी वेपार',
      education: 'शिक्षण आनी विद्यार्थी',
      welfare: 'नागरिक कल्याण आनी घर',
      senior_citizen: 'जाण्टी व्यक्ती आनी निवृत्तीवेतन',
      women_child: 'बायलो आनी भुरगीं कल्याण',
    },

    drawerMinistryGuidelines: 'अधिकृत मंत्रालय मार्गदर्शन',
    drawerPrimeBenefit: 'मुखेल सरकारी फायदो',
    drawerEligibilityCriteria: 'पात्रताय अटी',
    drawerRequiredDocuments: 'गरजेचीं कागदपत्रां',
    drawerApplicationRoute: 'अधिकृत अर्ज प्रक्रिया',
    drawerApplyOnPortal: 'अधिकृत मंत्रालय पोर्टलाचेर अर्ज करात',
    drawerShareScheme: 'येवजण वांटा',
    drawerLinkCopied: 'दुवो कॉपी जालो!',
    drawerClose: 'मार्गदर्शन धांपात',
    drawerOverview: 'येवजणेची थोडक्यांत म्हायती',
    drawerSummary: '60 सेकंदांचो सारांश',
    drawerKeyProvisions: 'मुखेल तरतुदी आनी नेम',
    drawerDeadline: 'अर्ज करपाची मुदत',
    drawerBeneficiaries: 'लाभांवित नागरिक',

    lastViewedTitle: 'फाटल्यान पळयल्ल्यो येवजण्यो',
    lastViewedSubtitle: 'फाटल्यान तुमी पळयल्ल्या येवजण्यांचो सविस्तर तपशील.',
    lastViewedClear: 'इतिहास काडात',
    lastViewedEmptyTitle: 'अजुन कसलोच इतिहास ना',
    lastViewedEmptyDesc: 'तुमी 60 सेकंदांच्या व्हिडिओ प्लेयरान पळयल्ल्यो येवजण्यो आपशींच हांगा दिसतल्यो.',
    lastViewedExplore: 'होम चेर येवजण्यो सोधात',
    lastViewedWatch: 'व्हिडिओ पळयात',

    interestedTitle: 'म्हज्यी आवडिल्ल्यो येवजण्यो',
    interestedSubtitle: 'तुमची खाजगी सांबाळिल्ली येवजण्यांची वळेरी, कागदपत्रां आनी मुदत तारखां सयत.',
    interestedCopyList: 'सांबाळिल्ली वळेरी कॉपी करात',
    interestedListCopied: 'वळेरी कॉपी जाली!',
    interestedEmptyTitle: 'अजुन कसलीच येवजण सांबाळिल्ली ना',
    interestedEmptyDesc: 'येवजणेच्या कार्डाचेर वा व्हिडियोचेर बुकमार्क चिन्ह दाबून आवडिल्ल्यो येवजण्यो सांबाळात.',
    interestedFind: 'सांबाळपा खातीर येवजण्यो सोधात',
    interestedWatch: 'व्हिडिओ पळयात',
  },
};

// Map Scheme titles to Hindi and Konkani
export const SCHEME_TITLES_I18N: Record<string, { hindi: string; konkani: string }> = {
  'pm-jay': {
    hindi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
    konkani: 'आयुष्मान भारत - पीएम जन आरोग्य येवजण',
  },
  'pm-kisan': {
    hindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
    konkani: 'पीएम किसान सन्मान निधी येवजण',
  },
  'mudra-loan': {
    hindi: 'प्रधानमंत्री मुद्रा योजना (ऋण सहायता)',
    konkani: 'प्रधान मंत्री मुद्रा येवजण (वेपार रीण)',
  },
  'nsp-central-sector': {
    hindi: 'राष्ट्रीय उच्च शिक्षा छात्रवृत्ति योजना',
    konkani: 'राष्ट्रीय उच्च शिक्षण शिष्यवृत्ती येवजण',
  },
  'pm-awas-urban': {
    hindi: 'प्रधानमंत्री आवास योजना (शहरी एवं ग्रामीण)',
    konkani: 'प्रधान मंत्री आवास येवजण (घर येवजण)',
  },
  'atal-pension': {
    hindi: 'अटल पेंशन योजना (गारंटीड पेंशन)',
    konkani: 'अटल पेन्शन येवजण (हमी निवृत्तीवेतन)',
  },
  'sukanya-samriddhi': {
    hindi: 'सुकन्या समृद्धि योजना (बेटी सुरक्षा खाता)',
    konkani: 'सुकन्या समृद्धी येवजण (धुवेची सुरक्षा येवजण)',
  },
  'standup-india': {
    hindi: 'स्टैंड-अप इंडिया योजना (महिला व उद्यमी सहायता)',
    konkani: 'स्टँड-अप इंडिया येवजण (बायलां खातीर उद्यमिता)',
  },
  'pm-vishwakarma': {
    hindi: 'प्रधानमंत्री विश्वकर्मा कारीगर योजना',
    konkani: 'पीएम विश्वकर्मा कारागीर सशक्तिकरण येवजण',
  },
  'pm-fasal-bima': {
    hindi: 'प्रधानमंत्री फसल बीमा योजना (फसल सुरक्षा)',
    konkani: 'प्रधान मंत्री पीक विमा येवजण',
  },
  'jan-aushadhi': {
    hindi: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना (सस्ती दवाएं)',
    konkani: 'प्रधान मंत्री जनऔषधी परियोजना (किफायती वखदां)',
  },
  'pm-vidyalaxmi': {
    hindi: 'पीएम विद्यालक्ष्मी गारंटी-मुक्त शिक्षा ऋण योजना',
    konkani: 'पीएम विद्यालक्ष्मी शिक्षण रीण येवजण',
  },
};

export function getTranslatedSchemeTitle(schemeId: string, englishTitle: string, lang: AppLanguage): string {
  if (lang === 'english') return englishTitle;
  const match = SCHEME_TITLES_I18N[schemeId];
  if (!match) return englishTitle;
  return match[lang] || englishTitle;
}
