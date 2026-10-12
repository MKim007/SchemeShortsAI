export type VideoLanguage = 'english' | 'hindi' | 'konkani';

export interface SchemeLanguageContent {
  languageLabel: string;
  nativeLabel: string;
  voiceLangCode: string;
  tagline: string;
  headlineBenefit: string;
  scriptLines: string[];
}

export interface SchemeTranslations {
  english: SchemeLanguageContent;
  hindi: SchemeLanguageContent;
  konkani: SchemeLanguageContent;
}

export const SCHEME_VIDEO_SCRIPTS: Record<string, SchemeTranslations> = {
  'pm-jay': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Universal cashless health protection for Indian families',
      headlineBenefit: '₹5,00,000 Free Cashless Medical Treatment Per Family/Year',
      scriptLines: [
        'Welcome! Ayushman Bharat PM-JAY is India’s flagship healthcare assurance mission.',
        'It gives up to 5 lakh rupees of 100% cashless treatment each year for your entire family.',
        'All pre-existing illnesses are covered from day one in 28,000 empaneled hospitals.',
        'Simply carry your Aadhaar card and Ration card to your nearest hospital Ayushman kiosk to enroll.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'हर गरीब परिवार के लिए 5 लाख का मुफ्त इलाज',
      headlineBenefit: 'प्रति परिवार प्रति वर्ष ₹5,00,000 तक का मुफ्त कैशलेस इलाज',
      scriptLines: [
        'नमस्ते! आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना देश का सबसे बड़ा स्वास्थ्य मिशन है।',
        'इस योजना के तहत आपके परिवार को हर साल 5 लाख रुपये तक का मुफ्त व कैशलेस इलाज मिलता है।',
        '28,000 से अधिक सरकारी और निजी अस्पतालों में पहले दिन से सभी पुरानी बीमारियां कवर होती हैं।',
        'अपने आधार कार्ड और राशन कार्ड के साथ नजदीकी अस्पताल जाकर आयुष्मान कार्ड बनवाएं।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN', // Browser fallback voice
      tagline: 'सगळ्या कुटुंबांक रोखविरयत भलायकी कवच आनी वखदां',
      headlineBenefit: 'दर कुटुंबाक दर वर्सा ₹5,00,000 मेरेन रोखविरयत हॉस्पिटल उपचार',
      scriptLines: [
        'नमस्कार! आयुष्मान भारत पीएम-जेएवाय ही सरकाराची एक व्हड भलायकी येवजण आसा.',
        'ह्या येवजणे खाला दर वर्सा दर कुटुंबाक ५ लाख रुपया मेरेन रोखविरयत हॉस्पिटल उपचार मेळटा.',
        '२८ हजारां परस चड सरकारी आनी खाजगी हॉस्पिटलांनी पयल्या दिसा सावन सगळ्यो बिमाऱ्यो समाविश्ट आसात.',
        'तुमचें आधार कार्ड आनी रेशन कार्ड घेवन लागींच्या हॉस्पिटलांत वचून कार्ड तयार करात.'
      ]
    }
  },
  'pm-kisan': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Guaranteed annual financial support for cultivable landholding farmers',
      headlineBenefit: '₹6,000 Annual Direct Cash Support in 3 Installments',
      scriptLines: [
        'PM Kisan Samman Nidhi transfers financial aid directly into farmer bank accounts.',
        'Eligible farmers receive 6,000 rupees every year in three equal installments of 2,000 rupees.',
        'The funds can be utilized freely for seeds, fertilizers, and agricultural inputs.',
        'Register your land documents and complete e-KYC on the PM-Kisan portal to start receiving transfers.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'किसानों के बैंक खाते में सीधे ₹6,000 की वार्षिक सहायता',
      headlineBenefit: '₹6,000 वार्षिक प्रत्यक्ष बैंक अंतरण (DBT)',
      scriptLines: [
        'प्रधानमंत्री किसान सम्मान निधि योजना देश के सभी अन्नदाताओं को आर्थिक सुरक्षा देती है।',
        'किसानों को हर साल ₹6,000 की नकद सहायता सीधे बैंक खाते में तीन किस्तों में मिलती है।',
        'इस राशि से आप बीज, खाद, कीटनाशक या अपनी घरेलू जरूरतें पूरी कर सकते हैं।',
        'पीएम किसान पोर्टल पर भूलेख विवरण और ई-केवाईसी पूरा करके आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'शेतकारांक दर वर्सा हमखास रोख रकमेचो आदार',
      headlineBenefit: 'दर वर्सा ₹6,000 थेट बँक खात्यांत तीन हफ्त्यांनी',
      scriptLines: [
        'नमस्कार! पीएम किसान सन्मान निधी ही शेतकारांक खात्रीशीर आर्थिक आदार दिता.',
        'दर वर्सा ६ हजार रुपया थेट शेतकारांच्या बँक खात्यांत २-२ हजारांच्या तीन हफ्त्यांनी जमा जातात.',
        'ह्या पैशांचो वापर बी-बियाणे, सारां आनी शेतकामाच्या साहित्या खातीर मेकळेपणान करूं येता.',
        'पीएम किसान पोर्टलाचेर वचून तुमची जमीन नोंदणी आनी ई-केवायसी बेगीन पूर्ण करात.'
      ]
    }
  },
  'mudra-loan': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Collateral-free enterprise loans for small businesses and shopkeepers',
      headlineBenefit: 'Up to ₹20,00,000 Collateral-Free Loans at Concessional Rates',
      scriptLines: [
        'Pradhan Mantri MUDRA Yojana fuels grassroots small business ventures.',
        'Borrow up to 20 lakh rupees without pledging land, home, or physical collateral.',
        'Three tiers are available: Shishu up to 50,000, Kishore up to 5 lakhs, and Tarun up to 20 lakhs.',
        'Apply directly at any commercial bank or via the UdyamiMitra online portal.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'बिना गारंटी छोटे कारोबारियों को ₹20 लाख तक का लोन',
      headlineBenefit: 'बिना किसी गारंटी ₹20,00,000 तक का सस्ता बिजनेस लोन',
      scriptLines: [
        'प्रधानमंत्री मुद्रा योजना छोटे व्यापारियों और उद्यमियों के सपनों को पंख देती है।',
        'बिना किसी संपत्ति या जमीन को गिरवी रखे ₹20 लाख तक का आसान बिजनेस लोन प्राप्त करें।',
        'शिशु, किशोर और तरुण तीन श्रेणियों में अपनी जरूरत के हिसाब से पूंजी चुनें।',
        'अपने प्रोजेक्ट विवरण के साथ किसी भी बैंक या उद्यमी मित्र पोर्टल पर आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'ल्हान वेपाऱ्यांक आनी उद्देगकारांक तारणविरयत रीण',
      headlineBenefit: 'कसल्याय तारणा बगर ₹20,00,000 मेरेन वेपार आनी उद्देग रीण',
      scriptLines: [
        'प्रधानमंत्री मुद्रा येवजण ही ल्हान वेपारी आनी नव्या उद्देगकारांक भांडवल मेळोवन दिता.',
        'कसलीच जमीन वा घर तारण दवरिनासतना २० लाख रुपया मेरेन सवाय दराचें रीण मेळटा.',
        'शिशू, किशोर आनी तरुण अशा तीन गटांत वेपाराच्या गरजेप्रमाण रीण मंजूर जाता.',
        'तुमच्या लागींच्या खंयच्याय बँकेत वा उद्यमीमित्र पोर्टलाचेर वचून अर्ज दाखल करात.'
      ]
    }
  },
  'nsp-central-sector': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Merit-cum-means college scholarships for higher studies',
      headlineBenefit: 'Up to ₹20,000/Year University Degree Scholarships',
      scriptLines: [
        'The National Scholarship Scheme supports top Class 12 board pass-outs pursuing degree courses.',
        'Undergraduates receive 12,000 rupees per year and Postgraduates receive 20,000 rupees per year.',
        'Funds are credited directly to your Aadhaar-linked savings bank account.',
        'Apply online at scholarships.gov.in before the annual academic deadline.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'कॉलेज और उच्च शिक्षा के लिए हर साल ₹20,000 छात्रवृत्ति',
      headlineBenefit: 'कॉलेज व पीजी छात्रों को प्रति वर्ष ₹20,000 तक सीधी छात्रवृत्ति',
      scriptLines: [
        'राष्ट्रीय छात्रवृत्ति योजना मेधावी छात्रों को उच्च शिक्षा पूरी करने का संबल देती है।',
        '12वीं में अच्छे अंक पाने वाले छात्रों को कॉलेज में ₹12,000 और पीजी में ₹20,000 सालाना मिलते हैं।',
        'छात्रवृत्ति की राशि सीधे छात्र के बैंक खाते में डीबीटी द्वारा भेजी जाती है।',
        'नेशनल स्कॉलरशिप पोर्टल scholarships.gov.in पर जाकर समय पर ऑनलाइन आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'हुशार विद्यार्थ्यांक कॉलेज आनी उच्च शिक्षणा खातीर स्कॉलरशिप',
      headlineBenefit: 'कॉलेज आनी पदव्युत्तर पदवे खातीर दर वर्सा ₹20,000 मेरेन शिष्यवृत्ती',
      scriptLines: [
        'बारावींत बऱ्या मार्कांनी पास जाल्ल्या हुशार विद्यार्थ्यांक ही राष्ट्रीय शिष्यवृत्ती मेळटा.',
        'पदवी शिक्षणा खातीर दर वर्सा १२ हजार आनी मागीर पीजी खातीर २० हजार रुपया मेळटात.',
        'ही रक्कम थेट विद्यार्थ्याच्या बँक खात्यांत जमा जाता आनी दर वर्सा नूतनीकरण जाता.',
        'scholarships.gov.in पोर्टलाचेर वचून तुमचो ऑनलायन अर्ज सादर करात.'
      ]
    }
  },
  'pm-awas-urban': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Affordable pucca housing subsidy and home grants',
      headlineBenefit: 'Up to ₹2,67,000 Direct Home Loan Subsidy',
      scriptLines: [
        'Pradhan Mantri Awas Yojana turns the dream of permanent pucca housing into reality.',
        'Eligible families receive up to 2.67 lakh rupees upfront interest subsidy on home loans.',
        'Covers new construction, apartment purchase, or existing room extension with female co-ownership.',
        'Submit your Aadhaar and family details online on pmaymis.gov.in or at your local municipal office.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'हर बेघर परिवार के लिए पक्के मकान का सपना सच',
      headlineBenefit: 'होम लोन पर ₹2,67,000 तक की सीधी ब्याज सब्सिडी',
      scriptLines: [
        'प्रधानमंत्री आवास योजना हर गरीब व मध्यमवर्गीय परिवार को सुरक्षित पक्का घर देती है।',
        'इस योजना में नए घर या विस्तार के लिए ₹2.67 लाख तक की ब्याज सब्सिडी सीधे मिलती है।',
        'घर का मालिकाना हक परिवार की महिला मुखिया के नाम पर या संयुक्त रूप से दिया जाता है।',
        'पीएम आवास पोर्टल pmaymis.gov.in या नगर पालिका कार्यालय में जाकर आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'दर एका कुटुंबाक स्वताच्या पक्क्या घराचो आदार',
      headlineBenefit: 'घर बांदपाक वा विकतें घेवपाक ₹2,67,000 मेरेन थेट सबसिडी',
      scriptLines: [
        'नमस्कार! प्रधानमंत्री आवास येवजण सगळ्या गरीब आनी मध्यमवर्गीयांक पक्कें घर दिता.',
        'ह्या येवजणे खाला नवें घर बांदपाक २.६७ लाख रुपया मेरेन व्याजाचेर थेट सबसिडी मेळटा.',
        'घराचेर कुटुंबांतल्या महिला मुखेल्याचें नांव आसप बंधनकारक आसा.',
        'pmaymis.gov.in पोर्टलाचेर वा तुमच्या नगरपालिकेंत वचून अर्ज दाखल करात.'
      ]
    }
  },
  'atal-pension': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Guaranteed monthly lifelong pension for unorganized workers',
      headlineBenefit: '₹1,000 to ₹5,000 Guaranteed Monthly Lifetime Pension',
      scriptLines: [
        'Atal Pension Yojana secures your retirement with guaranteed monthly income after age 60.',
        'Receive between 1,000 and 5,000 rupees every month for life, backed entirely by the Government of India.',
        'The same monthly pension continues to your spouse, and the full accumulated fund goes to your nominee.',
        'Open an APY account at your bank branch or online with a minimal auto-debit starting at 42 rupees monthly.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'वृद्धावस्था में ₹5,000 मासिक पेंशन की सरकारी गारंटी',
      headlineBenefit: '₹1,000 से ₹5,000 तक आजीवन गारंटीड मासिक पेंशन',
      scriptLines: [
        'अटल पेंशन योजना असंगठित क्षेत्र के कामगारों और स्वतंत्र नागरिकों को बुढ़ापे का सहारा देती है।',
        '60 वर्ष की आयु के बाद आपको जीवनभर ₹1,000 से ₹5,000 तक की निश्चित मासिक पेंशन मिलती है।',
        'पेंशनधारक के बाद जीवनसाथी को पूरी पेंशन और अंत में नॉमिनी को पूरी जमा पूंजी लौटाई जाती है।',
        'अपने बचत बैंक खाते से मात्र ₹42 प्रति माह से शुरू कर ऑटो-डेबिट द्वारा योजना से जुड़ें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'म्हातारपणांत खात्रीशीर दर म्हयन्याची सरकारी पेन्शन',
      headlineBenefit: 'दर म्हयन्याक ₹1,000 ते ₹5,000 मेरेन हमखास आजीवन पेन्शन',
      scriptLines: [
        'नमस्कार! अटल पेन्शन येवजण ६० वर्सां उपरांत तुमकां खात्रीशीर म्हयन्याची पेन्शन दिता.',
        'दर म्हयन्याक १,००० ते ५,००० रुपया मेरेन आजीवन पेन्शन सरकारा कडल्यान मेळटा.',
        'तुमच्या उपरांत तुमच्या जोडीदाराक ही पेन्शन मेळटा आनी मागीर वारसदाराक सगळो फंड मेळटा.',
        'तुमच्या बँकेत वचून दर म्हयन्याक ४२ रुपयां सावन ऑटो-डेबिट सुरू करून नोंदणी करात.'
      ]
    }
  },
  'sukanya-samriddhi': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'High-interest tax-free small savings for your daughter future',
      headlineBenefit: '8.2% Compounded Interest & Complete Tax Exemption for Girls',
      scriptLines: [
        'Sukanya Samriddhi Yojana builds a safe financial fortress for your daughter education and future.',
        'Earn an industry-leading 8.2% compounded interest with 100% triple tax-free benefits on deposit and maturity.',
        'Start with as little as 250 rupees per year until the girl child reaches 15 years of age.',
        'Open an account at any post office or nationalized bank with your child birth certificate.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'बेटियों की उच्च शिक्षा व भविष्य के लिए 8.2% ब्याज दर',
      headlineBenefit: '8.2% चक्रवृद्धि ब्याज और 100% टैक्स फ्री बचत योजना',
      scriptLines: [
        'सुकन्या समृद्धि योजना बेटियों के उज्ज्वल भविष्य और उच्च शिक्षा के लिए सबसे सुरक्षित निवेश है।',
        'इस योजना में 8.2% की सर्वाधिक ब्याज दर मिलती है और मूलधन व ब्याज पूरी तरह टैक्स-फ्री हैं।',
        'आप मात्र ₹250 प्रति वर्ष से खाता शुरू कर सकते हैं और 18 वर्ष की आयु में 50% राशि निकाल सकते हैं।',
        'बेटी के जन्म प्रमाण पत्र के साथ नजदीकी डाकघर या बैंक में जाकर खाता खुलवाएं।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'धुवांच्या फुडारा खातीर आनी शिक्षणा खातीर व्हड फायद्याची येवजण',
      headlineBenefit: '८.२% चक्रवाढ व्याज आनी १००% करमुक्त (Tax-Free) परतावो',
      scriptLines: [
        'नमस्कार! सुकन्या समृद्धी येवजण ही धुवांच्या उच्च शिक्षणा खातीर आनी लग्ना खातीर व्हड भांडवल दिता.',
        'ह्या खात्याचेर सरकार ८.२% चक्रवाढ व्याज दिता आनी ताचेर कसलोच कर (Tax) पडना.',
        'दर वर्सा फकत २५० रुपयां सावन पोस्ट ऑफिसांत वा बँकेत खातें सुरू करूं येता.',
        'धुवेच्या जल्माचो दाखलो घेवन लागींच्या पोस्ट ऑफिसांत वा बँकेत वचून खातें उकतात.'
      ]
    }
  },
  'stand-up-india': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Greenfield enterprise loans for Women and SC/ST founders',
      headlineBenefit: '₹10 Lakhs to ₹1 Crore Bank Loans for Greenfield Ventures',
      scriptLines: [
        'Stand-Up India promotes entrepreneurship among Women and SC/ST innovators.',
        'Access composite bank credit between 10 lakh and 1 crore rupees for manufacturing, services, or agri-allied units.',
        'Includes extensive handholding support, credit guarantee coverage, and working capital limits.',
        'Apply online through standupmitra.in or visit your nearest scheduled commercial bank branch.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'महिला और SC/ST उद्यमियों के लिए ₹1 करोड़ तक का बिजनेस लोन',
      headlineBenefit: 'नए उद्यम के लिए ₹10 लाख से ₹1 करोड़ तक का बैंक ऋण',
      scriptLines: [
        'स्टैंड-अप इंडिया योजना महिला और SC/ST वर्ग के उद्यमियों को नए व्यापार के लिए बड़ा संबल देती है।',
        'विनिर्माण, सेवा या व्यापार क्षेत्र में नई यूनिट लगाने के लिए ₹10 लाख से ₹1 करोड़ तक का लोन मिलता है।',
        'इस योजना में क्रेडिट गारंटी और सरकारी हैंडहोल्डिंग सपोर्ट भी प्रदान किया जाता है।',
        'standupmitra.in पोर्टल पर अपने प्रोजेक्ट प्लान के साथ ऑनलाइन आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'महिला आनी SC/ST नवोद्देगकारांक व्हड वेपार रीण',
      headlineBenefit: 'नव्या उद्योगा खातीर ₹10 लाख ते ₹1 कोटी मेरेन बँक रीण',
      scriptLines: [
        'नमस्कार! स्टँड-अप इंडिया येवजण महिलांक आनी SC/ST नवोद्देगकारांक स्वताचे पाय उबे रावपाक आदार दिता.',
        'नवो उद्देग वा वेपार सुरू करपाक १० लाख ते १ कोटी रुपयां मेरेन बँक रीण मेळटा.',
        'हातूंत सरकाराचें मार्गदर्शन आनी क्रेडिट गॅरंटी कव्हरेज लेगीत मेळटा.',
        'standupmitra.in पोर्टलाचेर वचून तुमचो ऑनलायन अर्ज सादर करात.'
      ]
    }
  },
  'pm-vishwakarma': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Dignity, modern tools, and cheap credit for traditional artisans',
      headlineBenefit: '₹3,00,000 Collateral-Free Loan at 5% plus ₹15,000 Toolkit',
      scriptLines: [
        'PM Vishwakarma provides complete support to traditional artisans and craftspeople.',
        'Receive a free digital ID card and skill training with a daily stipend.',
        'Get a fifteen thousand rupee toolkit voucher and collateral-free loan at five percent interest.',
        'Enroll at your nearest CSC Center or register online at pmvishwakarma.gov.in.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'पारंपरिक कारीगरों और शिल्पकारों के लिए ₹3 लाख का सस्ता लोन',
      headlineBenefit: '5% ब्याज पर ₹3 लाख का लोन और ₹15,000 का टूलकिट वाउचर',
      scriptLines: [
        'पीएम विश्वकर्मा योजना 18 पारंपरिक शिल्पों के कारीगरों को सशक्त बनाती है।',
        'प्रशिक्षण के दौरान ₹500 प्रतिदिन का वजीफा और ₹15,000 का मुफ्त टूलकिट अनुदान मिलता है।',
        'बिना गारंटी 5% की रियायती ब्याज दर पर ₹3 लाख तक का बिजनेस लोन प्राप्त करें।',
        'अपने नजदीकी जन सेवा केंद्र या आधिकारिक पोर्टल पर जाकर नामांकन कराएं।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'पारंपारीक कारागिरांक आनी कारागिरांक आधुनिक साधनां आनी रीण',
      headlineBenefit: '५% व्याजान ₹3,00,000 मेरेन रीण आनी ₹15,000 किट अनुदान',
      scriptLines: [
        'नमस्कार! पीएम विश्वकर्मा येवजण पारंपारीक कारागिरांक आनी हस्तकलेच्या कामगारांक आदार दिता.',
        'ह्या येवजणे खाला १५ हजार रुपयांचो आधुनिक टूलकिट वाउचर मेळटा.',
        '५ टक्के सवाय व्याजाच्या दरान ३ लाख रुपयां मेरेन तारणविरयत रीण उपलब्ध जाता.',
        'तुमच्या लागींच्या सीएससी केंद्रांत वचून वा pmvishwakarma.gov.in चेर नोंदणी करात.'
      ]
    }
  },
  'pm-fasal-bima': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Comprehensive crop insurance against drought, flood, and pests',
      headlineBenefit: 'Full Crop Loss Cover at Nominal 1.5% to 2% Premium',
      scriptLines: [
        'Pradhan Mantri Fasal Bima Yojana protects farmers from unexpected crop destruction.',
        'Insure your foodgrains and commercial crops against drought, floods, and unseasonal rains.',
        'Farmers pay only 1.5 to 2 percent premium while the government covers the rest.',
        'Apply online at pmfby.gov.in or through your bank before the seasonal deadline.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'फसल बर्बादी पर पूरा मुआवजा, मात्र 1.5% प्रीमियम पर',
      headlineBenefit: 'प्राकृतिक आपदाओं से फसल सुरक्षा का संपूर्ण सरकारी बीमा',
      scriptLines: [
        'प्रधानमंत्री फसल बीमा योजना किसानों को मौसम की मार से सुरक्षा प्रदान करती है।',
        'सूखा, बाढ़, ओलावृष्टि या कीटों से हुए नुकसान पर पूरा क्लेम मिलता है।',
        'किसानों को सिर्फ 1.5% से 2% का मामूली प्रीमियम देना होता है।',
        'pmfby.gov.in पोर्टल या अपनी बैंक शाखा में जाकर अपनी फसल का बीमा कराएं।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'शेतकारांक पिकांचे नुकसानी खातीर हमखास भरपाय',
      headlineBenefit: 'फकत १.५% ते २% हफ्त्यार पुराय पिकाचो विमा कव्हरेज',
      scriptLines: [
        'नमस्कार! प्रधानमंत्री पीक विमा येवजण अवकाळी पावस आनी हुंवार सावन शेतकारांक राखता.',
        'पिकांचें लुकसाण जाल्यार सरकारा कडल्यान पुराय भरपाय थेट मेळटा.',
        'शेतकारांक फकत १.५ ते २ टक्के इतलोच बारीक विमो भरचो पडटा.',
        'pmfby.gov.in पोर्टलाचेर वा बँकेत वचून पिकाची नोंदणी बेगीन करात.'
      ]
    }
  },
  'jan-aushadhi': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'High quality generic medicines at 50% to 90% discount',
      headlineBenefit: '50% to 90% Cheaper Top-Quality Generic Medicines',
      scriptLines: [
        'Pradhan Mantri Bhartiya Janaushadhi Pariyojana makes healthcare affordable for everyone.',
        'Purchase certified high quality generic medicines at half to one tenth of branded prices.',
        'Over two thousand essential medicines and surgical supplies are available daily.',
        'Visit any of the ten thousand plus Janaushadhi Kendras with your prescription.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'ब्रांडेड जैसी उत्तम दवाइयां, 50% से 90% तक सस्ती',
      headlineBenefit: '10,000+ जन औषधि केंद्रों पर 50% से 90% सस्ती दवाइयां',
      scriptLines: [
        'प्रधानमंत्री भारतीय जन औषधि परियोजना हर नागरिक को सस्ती और उत्तम दवाएं देती है।',
        'यहां सभी आवश्यक जेनेरिक दवाइयां बाजार से 50% से 90% कम कीमत पर मिलती हैं।',
        '2,000 से अधिक दवाइयां और सर्जिकल सामान बिना किसी आय प्रमाण पत्र के उपलब्ध हैं।',
        'डॉक्टर का पर्चा लेकर अपने नजदीकी जन औषधि केंद्र पर जाएं और बचत करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'उंच दर्ज्याचीं वखदां ५०% ते ९०% सवाय दरांनी',
      headlineBenefit: '१०,००० परस चड केंद्रांनी ५०% ते ९०% सवाय जेनेरिक वखदां',
      scriptLines: [
        'नमस्कार! जन औषधी येवजण सगळ्या नागरिकांक अतिशय सवाय दरांनी वखदां पुरवयता.',
        'ब्रांडेड वखदां इतलीच गुणकारी जेनेरिक वखदां ५० ते ९० टक्के कमी भावांत मेळटात.',
        '२ हजारां परस चड गरजेचीं वखदां खंयच्याय उत्पन्न प्रमाणपत्रा बगर मेळटात.',
        'डॉकटराची चिठ्ठी घेवन लागींच्या जन औषधी केंद्रांत वचात आनी फायदो घेयात.'
      ]
    }
  },
  'pm-vidyalaxmi': {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: 'Guaranteed collateral-free loans for quality higher education',
      headlineBenefit: 'Up to ₹7.5 Lakhs Collateral-Free Student Loans at 3% Subsidy',
      scriptLines: [
        'PM Vidyalaxmi guarantees that no deserving student drops out due to education costs.',
        'Secure collateral-free and guarantor-free loans up to seven point five lakh rupees.',
        'Enjoy a three percent interest subvention for family incomes up to eight lakhs.',
        'Apply completely online on the unified portal at vidyalakshmi.co.in.'
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: 'उच्च शिक्षा के लिए बिना गारंटी ₹7.5 लाख तक का स्टूडेंट लोन',
      headlineBenefit: 'बिना किसी गारंटर ₹7.5 लाख तक का सस्ता शिक्षा ऋण',
      scriptLines: [
        'पीएम विद्यालक्ष्मी योजना मेधावी विद्यार्थियों को उच्च शिक्षा का सुनहरा अवसर देती है।',
        'देश के शीर्ष 860 संस्थानों में प्रवेश पर ₹7.5 लाख तक का बिना गारंटी लोन मिलता है।',
        '₹8 लाख तक वार्षिक पारिवारिक आय वाले छात्रों को 3% ब्याज छूट का लाभ मिलता है।',
        'vidyalakshmi.co.in पोर्टल पर अपने दाखिला पत्र के साथ ऑनलाइन आवेदन करें।'
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: 'उच्च शिक्षणा खातीर तारणविरयत सरकारी विध्यार्थी रीण',
      headlineBenefit: '₹7.5 लाख मेरेन तारणविरयत विध्यार्थी रीण ३% सबसिडी सयत',
      scriptLines: [
        'नमस्कार! पीएम विद्यालक्ष्मी येवजण पैशां अभावाक लागून कोणाचेंच शिक्षण बंद पडूंक दिवची ना.',
        'देशांतल्या उत्तम कॉलेजांनी शिकपाक ७.५ लाख रुपयां मेरेन तारणविरयत रीण मेळटा.',
        '८ लाख रुपयां भितर उत्पन्न आशिल्ल्या कुटुंबांक ३ टक्के व्याजाची सबसिडी मेळटा.',
        'vidyalakshmi.co.in पोर्टलाचेर वचून तुमचो ऑनलायन अर्ज आजूच सादर करात.'
      ]
    }
  }
};

// Generic fallback generator for schemes not in dedicated dictionary
export function getSchemeVideoScript(schemeId: string, schemeTitle: string, headlineBenefit: string, bullets: string[]): SchemeTranslations {
  if (SCHEME_VIDEO_SCRIPTS[schemeId]) {
    return SCHEME_VIDEO_SCRIPTS[schemeId];
  }

  return {
    english: {
      languageLabel: 'English',
      nativeLabel: 'English',
      voiceLangCode: 'en-US',
      tagline: `Quick AI visual explainer for ${schemeTitle}`,
      headlineBenefit: headlineBenefit,
      scriptLines: [
        `Welcome to SchemeAI. Here is what you need to know about ${schemeTitle}.`,
        `The prime welfare aid under this initiative is: ${headlineBenefit}.`,
        `${bullets[0] || 'Offers substantial government subsidy and official support.'}`,
        `${bullets[1] || 'Simple online enrollment through verified ministry portals.'}`
      ]
    },
    hindi: {
      languageLabel: 'Hindi',
      nativeLabel: 'हिन्दी',
      voiceLangCode: 'hi-IN',
      tagline: `${schemeTitle} की संपूर्ण जानकारी हिंदी में`,
      headlineBenefit: headlineBenefit,
      scriptLines: [
        `नमस्ते! स्कीम एआई पर ${schemeTitle} की पूरी जानकारी देखें।`,
        `इस सरकारी योजना के अंतर्गत मुख्य लाभ: ${headlineBenefit}।`,
        `${bullets[0] || 'पात्र नागरिकों को सीधा वित्तीय व सामाजिक लाभ दिया जाता है।'}`,
        `अपने आवश्यक दस्तावेजों के साथ आधिकारिक पोर्टल पर आज ही आवेदन करें।`
      ]
    },
    konkani: {
      languageLabel: 'Konkani',
      nativeLabel: 'कोंकणी',
      voiceLangCode: 'hi-IN',
      tagline: `${schemeTitle} येवजणेची सविस्तर माहिती कोंकणींत`,
      headlineBenefit: headlineBenefit,
      scriptLines: [
        `नमस्कार! स्कीम एआय चेर ${schemeTitle} येवजणेची म्हत्वाची माहिती पळयात.`,
        `ह्या सरकारी येवजणे खाला मुखेल फायदो: ${headlineBenefit}.`,
        `सगळ्या पात्र नागरिकांक थेट सरकारी आदार आनी सुविधा मेळटात.`,
        `लागिंच्या केंद्रांत वा अधिकृत पोर्टलाचेर वचून बेगीन अर्ज दाखल करात.`
      ]
    }
  };
}
