import { Scheme, SchemeCategory } from '../types/scheme';

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'pm-jay',
    title: 'Ayushman Bharat - PM Jan Arogya Yojana',
    code: 'PM-JAY',
    category: 'healthcare',
    categoryLabel: 'Healthcare & Wellness',
    ministryOrAuthority: 'Ministry of Health and Family Welfare',
    headlineBenefit: '₹5,00,000 Cashless Health Cover Per Family/Year',
    benefitNumericValue: '₹5 Lakhs/yr',
    summaryIn60s: 'World largest government-funded healthcare assurance scheme offering secondary and tertiary hospitalization cover across 28,000+ empaneled private and public hospitals nationwide.',
    keyBullets: [
      'Zero paper, 100% cashless treatment across 1,949 medical procedures and surgeries.',
      'Pre-existing diseases covered from Day 1 with no family size or age cap.',
      'Includes 3 days pre-hospitalization and 15 days post-hospitalization medicine costs.'
    ],
    eligibility: {
      minAge: 0,
      maxAge: 100,
      allowedOccupations: ['Informal Laborer', 'Farmer', 'Unemployed', 'Domestic Worker', 'Artisan', 'Driver', 'Student'],
      maxAnnualIncomeInLakhs: 2.5,
      citizenRequirement: 'Indian Resident listed in SECC 2011 or NFSA database',
      specialCriteria: 'Families with no adult member between 16-59 or Kutcha house households receive automatic entitlement.'
    },
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Ration Card / Family ID document',
      'Income Certificate (if applicable)',
      'Active mobile number linked to Aadhaar'
    ],
    applicationDeadline: 'Open Year-Round (Continuous Enrollment)',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://beneficiary.nha.gov.in',
    beneficiariesReached: '55+ Crore Citizens',
    accentGradient: 'from-yellow-400/20 via-yellow-500/5 to-black',
    iconName: 'HeartPulse',
    tagline: 'Universal health protection without the fear of medical debt'
  },
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi Yojana',
    code: 'PM-KISAN',
    category: 'agriculture',
    categoryLabel: 'Agriculture & Farming',
    ministryOrAuthority: 'Ministry of Agriculture & Farmers Welfare',
    headlineBenefit: '₹6,000 Direct Annual Income Support',
    benefitNumericValue: '₹6,000/yr',
    summaryIn60s: 'Direct cash transfer scheme transferring ₹6,000 annually in three equal four-monthly installments of ₹2,000 directly into the bank accounts of landholding farmer families.',
    keyBullets: [
      'Direct Benefit Transfer (DBT) directly into Aadhaar-seeded bank accounts.',
      'Funds can be used freely for seeds, fertilizer, machinery, or domestic needs.',
      'e-KYC easily completed online via OTP or biometric face authentication.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 99,
      allowedOccupations: ['Farmer', 'Agricultural Worker', 'Self-Employed'],
      citizenRequirement: 'All landholding farmer families with cultivable land',
      specialCriteria: 'Excludes institutional landholders, income tax payers, and serving government staff.'
    },
    requiredDocuments: [
      'Landholding documents (Khasra/Khatauni or RoR copy)',
      'Aadhaar Card',
      'Bank Account passbook copy with IFSC code',
      'Land ownership registry in beneficiary name'
    ],
    applicationDeadline: 'Next Installment Cycle: 30 Nov 2026',
    deadlineType: 'annual_cycle',
    officialPortalUrl: 'https://pmkisan.gov.in',
    beneficiariesReached: '11+ Crore Farmers',
    accentGradient: 'from-yellow-400/20 via-yellow-500/5 to-black',
    iconName: 'Sprout',
    tagline: 'Guaranteed financial buffer for agricultural input expenses'
  },
  {
    id: 'mudra-loan',
    title: 'Pradhan Mantri MUDRA Yojana',
    code: 'PMMY',
    category: 'startup_msme',
    categoryLabel: 'Startups & MSME',
    ministryOrAuthority: 'Ministry of Finance & SIDBI',
    headlineBenefit: 'Up to ₹20,00,000 Collateral-Free Business Loans',
    benefitNumericValue: 'Up to ₹20 Lakhs',
    summaryIn60s: 'Empowers non-corporate, non-farm small and micro enterprises with collateral-free institutional credit in three tiers: Shishu (up to ₹50k), Kishore (₹50k-₹5L), and Tarun (₹5L-₹20L).',
    keyBullets: [
      'No collateral security or third-party guarantee needed from entrepreneurs.',
      'Nominal interest rates with repayment tenures stretching up to 5-7 years.',
      'Available through commercial banks, RRBs, Small Finance Banks, and NBFCs.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      allowedOccupations: ['Business Owner', 'Entrepreneur', 'Shopkeeper', 'Artisan', 'Freelancer', 'Self-Employed'],
      maxAnnualIncomeInLakhs: 50,
      citizenRequirement: 'Indian Citizen with a viable non-farming business plan',
      specialCriteria: 'No existing bank loan default history in CIBIL credit report.'
    },
    requiredDocuments: [
      'Identity Proof (Aadhaar / Voter ID / Passport)',
      'Proof of Business address and enterprise establishment certificate',
      'Bank account statements for the last 6 months',
      'Business quotation or project report for machinery/inventory'
    ],
    applicationDeadline: 'Open Daily at All Empaneled Banks & Portals',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://www.udyamimitra.in',
    beneficiariesReached: '44+ Crore Loans Sanctioned',
    accentGradient: 'from-yellow-400/20 via-white/5 to-black',
    iconName: 'Briefcase',
    tagline: 'Fueling grassroots entrepreneurship without requiring land pledges'
  },
  {
    id: 'nsp-central-sector',
    title: 'National Scholarship Scheme for Higher Education',
    code: 'NSP-CSSS',
    category: 'education',
    categoryLabel: 'Education & Students',
    ministryOrAuthority: 'Ministry of Education & UGC',
    headlineBenefit: 'Up to ₹20,000/Year College & PG Fellowship',
    benefitNumericValue: '₹20,000/yr',
    summaryIn60s: 'Merit-cum-means scholarship for top percentile students from 12th board exams pursuing regular degree or professional courses at recognized universities and colleges.',
    keyBullets: [
      '₹12,000/year for first 3 undergraduate years; ₹20,000/year for Postgraduate studies.',
      'Direct DBT credit straight to the scholar personal bank account.',
      'Renewal available throughout course duration upon maintaining 50%+ marks.'
    ],
    eligibility: {
      minAge: 17,
      maxAge: 25,
      allowedOccupations: ['Student'],
      maxAnnualIncomeInLakhs: 4.5,
      citizenRequirement: 'Indian Student enrolled in regular degree program',
      specialCriteria: 'Scored above 80th percentile in relevant stream in Class 12 board examination.'
    },
    requiredDocuments: [
      'Class 12th Board Marksheet & Passing Certificate',
      'Current College Admission Fee Receipt & Student ID card',
      'Income Certificate issued by Revenue Authority',
      'Aadhaar seeded bank account passbook copy'
    ],
    applicationDeadline: 'Applications Close: 31 Dec 2026',
    deadlineType: 'closing_soon',
    officialPortalUrl: 'https://scholarships.gov.in',
    beneficiariesReached: '82,000 Fresh Scholars/Yr',
    accentGradient: 'from-yellow-300/20 via-yellow-500/5 to-black',
    iconName: 'GraduationCap',
    tagline: 'Supporting high-achieving youth to complete university degrees'
  },
  {
    id: 'pm-awas-urban',
    title: 'Pradhan Mantri Awas Yojana (PMAY-Urban & Gramin)',
    code: 'PMAY-2.0',
    category: 'welfare',
    categoryLabel: 'Citizen Welfare & Housing',
    ministryOrAuthority: 'Ministry of Housing and Urban Affairs',
    headlineBenefit: 'Up to ₹2.67 Lakhs Direct Home Loan Subsidy',
    benefitNumericValue: 'Up to ₹2.67 Lakhs',
    summaryIn60s: 'Flagship pucca housing initiative providing upfront interest subsidies on housing loans alongside direct construction grants for affordable permanent homes.',
    keyBullets: [
      'Interest subsidy up to 6.5% on home loans under Credit Linked Subsidy Scheme (CLSS).',
      'Mandatory co-ownership or sole ownership in the name of the female head of house.',
      'Covers new home construction, flat purchase, or pucca house extension.'
    ],
    eligibility: {
      minAge: 21,
      maxAge: 70,
      allowedOccupations: ['Informal Laborer', 'Private Employee', 'Self-Employed', 'Farmer', 'Domestic Worker'],
      maxAnnualIncomeInLakhs: 18,
      citizenRequirement: 'Indian Family with no existing all-weather pucca house anywhere in India',
      specialCriteria: 'EWS/LIG families prioritized with maximum subsidy brackets.'
    },
    requiredDocuments: [
      'Aadhaar card of all household family members',
      'Proof of no pucca house (Affidavit)',
      'Income certificate or ITR copy',
      'Approved building plan or builder allotment agreement'
    ],
    applicationDeadline: 'Phase 2 Open Through 2029',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://pmaymis.gov.in',
    beneficiariesReached: '1.18+ Crore Houses',
    accentGradient: 'from-yellow-500/20 via-amber-400/10 to-black',
    iconName: 'Home',
    tagline: 'Fulfilling the dream of safe permanent shelter for every family'
  },
  {
    id: 'atal-pension',
    title: 'Atal Pension Yojana (Guaranteed Pension)',
    code: 'APY',
    category: 'senior_citizen',
    categoryLabel: 'Senior Citizens & Social Security',
    ministryOrAuthority: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    headlineBenefit: '₹1,000 to ₹5,000 Guaranteed Monthly Lifetime Pension',
    benefitNumericValue: '₹5,000/mo',
    summaryIn60s: 'Government-backed voluntary retirement savings pension scheme guaranteeing a fixed monthly pension from age 60 for unorganized sector workers and independent earners.',
    keyBullets: [
      'Guaranteed lifetime pension payable to subscriber; continued to spouse after death.',
      'Accumulated corpus returned to nominated legal heirs after spouse passing.',
      'Minimal auto-debit contribution starting as low as ₹42 per month.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      allowedOccupations: ['Self-Employed', 'Informal Laborer', 'Farmer', 'Shopkeeper', 'Domestic Worker', 'Freelancer'],
      citizenRequirement: 'Indian Citizen with active savings bank account',
      specialCriteria: 'Must not be an income taxpayer at the time of enrollment.'
    },
    requiredDocuments: [
      'Savings Bank Account with Auto-Debit permission',
      'Aadhaar Card copy',
      'Nominee details & relationship proof',
      'Active mobile number'
    ],
    applicationDeadline: 'Open Daily (Enroll before turning 40)',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://www.npscra.nsdl.co.in',
    beneficiariesReached: '6.2+ Crore Subscribers',
    accentGradient: 'from-yellow-400/20 via-white/5 to-black',
    iconName: 'ShieldCheck',
    tagline: 'Lifelong financial independence and dignity in your golden years'
  },
  {
    id: 'sukanya-samriddhi',
    title: 'Sukanya Samriddhi Yojana (Girl Child Security)',
    code: 'SSY',
    category: 'women_child',
    categoryLabel: 'Women & Child Welfare',
    ministryOrAuthority: 'Ministry of Finance (Small Savings)',
    headlineBenefit: '8.2% Tax-Free Interest & High Corpus for Daughters',
    benefitNumericValue: '8.2% Compounded',
    summaryIn60s: 'Special small-savings scheme for girl children with the highest government interest rate, full triple tax exemption (EEE), and dedicated funds for higher education and marriage.',
    keyBullets: [
      'Triple Tax Exemption under 80C: Investment, interest earned, and maturity are 100% tax-free.',
      'Deposit as little as ₹250 up to ₹1.5 Lakhs per financial year.',
      '50% partial withdrawal allowed at age 18 for university admission fees.'
    ],
    eligibility: {
      minAge: 0,
      maxAge: 10,
      allowedOccupations: ['Student', 'Minor Child'],
      citizenRequirement: 'Girl child born in India (opened by parents/legal guardians)',
      specialCriteria: 'Maximum two accounts per family (three allowed in case of first-born twin girls).'
    },
    requiredDocuments: [
      'Birth Certificate of the girl child',
      'Identity and Address proof of Parent/Guardian (Aadhaar/PAN)',
      'Passport size photos of guardian and child',
      'Initial deposit receipt from Post Office or Bank'
    ],
    applicationDeadline: 'Open Year-Round at Post Offices & Banks',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://www.indiapost.gov.in',
    beneficiariesReached: '3.5+ Crore Girl Accounts',
    accentGradient: 'from-yellow-300/20 via-yellow-500/10 to-black',
    iconName: 'Sparkles',
    tagline: 'Securing girl children educational wings and financial sovereignty'
  },
  {
    id: 'standup-india',
    title: 'Stand-Up India Scheme for Women & SC/ST',
    code: 'STANDUP-IN',
    category: 'startup_msme',
    categoryLabel: 'Startups & MSME',
    ministryOrAuthority: 'Ministry of Finance & Department of Financial Services',
    headlineBenefit: '₹10 Lakh to ₹1 Crore Green-Field Enterprise Financing',
    benefitNumericValue: '₹10L - ₹1 Crore',
    summaryIn60s: 'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up greenfield ventures.',
    keyBullets: [
      'Supports greenfield projects across manufacturing, services, agri-allied, or trading.',
      'Margin money requirement capped at max 15% with convergence assistance.',
      'Handholding support provided through SIDBI, NABARD, and District Industry Centers.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      allowedOccupations: ['Business Owner', 'Entrepreneur', 'Self-Employed'],
      citizenRequirement: 'SC/ST category entrepreneurs OR Women entrepreneurs of any category',
      specialCriteria: 'In non-individual enterprises, 51% of shareholding and controlling stake must be held by SC/ST or woman.'
    },
    requiredDocuments: [
      'Caste Certificate (for SC/ST applicants)',
      'Detailed Project Report (DPR) with projected balance sheets',
      'Udyam Registration Certificate',
      'Proof of business location / lease agreement'
    ],
    applicationDeadline: 'Continuous Lending Window Open Across 1,20,000+ Branches',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://www.standupmitra.in',
    beneficiariesReached: '2.1+ Lakh Enterprises Funded',
    accentGradient: 'from-yellow-400/20 via-yellow-600/10 to-black',
    iconName: 'Rocket',
    tagline: 'Democratizing access to high-value capital for underrepresented founders'
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Artisan Empowerment Scheme',
    code: 'PM-VISHWAKARMA',
    category: 'welfare',
    categoryLabel: 'Citizen Welfare & Housing',
    ministryOrAuthority: 'Ministry of Micro, Small and Medium Enterprises',
    headlineBenefit: '₹3,00,000 Collateral-Free Loan at 5% + ₹15,000 Toolkit',
    benefitNumericValue: '₹3L Loan + ₹15k Kit',
    summaryIn60s: 'Comprehensive scheme offering formal recognition, basic and advanced skill training with ₹500/day stipend, modern toolkits, and ultra-low interest loans for 18 traditional artisan trades.',
    keyBullets: [
      'Free PM Vishwakarma ID card and formal digital artisan certification.',
      '₹15,000 digital voucher for modern toolkits upon completing basic training.',
      'Collateral-free credit: ₹1 Lakh (Tranche 1) and ₹2 Lakhs (Tranche 2) at concessional 5% interest.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 70,
      allowedOccupations: ['Artisan', 'Carpenter', 'Blacksmith', 'Potter', 'Sculptor', 'Cobbler', 'Tailor', 'Barber', 'Mason', 'Fisherman'],
      citizenRequirement: 'Traditional artisan or craftsperson working with hands and tools',
      specialCriteria: 'Only one member per family eligible; excludes families with active PMEGP or MUDRA defaults.'
    },
    requiredDocuments: [
      'Aadhaar Card & mobile linked for OTP',
      'Active Bank Account details',
      'Self-declaration of traditional artisan trade',
      'Ration Card / Family composite ID'
    ],
    applicationDeadline: 'Enrolling Now Nationwide at CSC Centers',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://pmvishwakarma.gov.in',
    beneficiariesReached: '20+ Lakh Artisans Certified',
    accentGradient: 'from-yellow-500/20 via-amber-400/10 to-black',
    iconName: 'Wrench',
    tagline: 'Dignity, modern tools, and cheap credit for traditional creators'
  },
  {
    id: 'pm-fasal-bima',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    code: 'PMFBY',
    category: 'agriculture',
    categoryLabel: 'Agriculture & Farming',
    ministryOrAuthority: 'Ministry of Agriculture and Farmers Welfare',
    headlineBenefit: 'Comprehensive Crop Loss Insurance at 1.5% - 2% Premium',
    benefitNumericValue: 'Full Crop Cover',
    summaryIn60s: 'Shields farmers against non-preventable natural risks (drought, flood, unseasonal rain, pests) with full sum insured at nominal 1.5% to 2% premium.',
    keyBullets: [
      'Govt pays remaining 85%+ premium subsidy directly to insurance companies.',
      'Prompt claim settlement with remote sensing and digital crop-cutting surveys.',
      'Post-harvest losses covered up to 14 days from cyclonic or unseasonal rains.'
    ],
    eligibility: {
      minAge: 18,
      maxAge: 90,
      allowedOccupations: ['Farmer', 'Agricultural Worker', 'Tenant Farmer', 'Sharecropper'],
      citizenRequirement: 'All farmers cultivating notified crops in notified areas',
      specialCriteria: 'Compulsory for loanee farmers, fully voluntary for non-loanee farmers.'
    },
    requiredDocuments: [
      'Land Record Document (Khasra/Khatauni/Patta)',
      'Aadhaar Card',
      'Sowing Certificate / Crop Sowing Declaration',
      'Active Bank Passbook with IFSC'
    ],
    applicationDeadline: 'Kharif: 31 July | Rabi: 31 December',
    deadlineType: 'annual_cycle',
    officialPortalUrl: 'https://pmfby.gov.in',
    beneficiariesReached: '5.5+ Crore Farmers Covered/Yr',
    accentGradient: 'from-yellow-400/20 via-white/5 to-black',
    iconName: 'Shield',
    tagline: 'Guaranteed financial indemnity against adverse weather shocks'
  },
  {
    id: 'jan-aushadhi',
    title: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana',
    code: 'PMBJP',
    category: 'healthcare',
    categoryLabel: 'Healthcare & Wellness',
    ministryOrAuthority: 'Department of Pharmaceuticals',
    headlineBenefit: '50% to 90% Cheaper High-Quality Generic Medicines',
    benefitNumericValue: '50%-90% Off',
    summaryIn60s: 'Provides generic medicines of equivalent therapeutic efficacy at 50% to 90% lower prices compared to branded medicines across 10,000+ Janaushadhi Kendras.',
    keyBullets: [
      '2,000+ essential medicines and 300+ surgical equipment items available.',
      'Oxo-biodegradable sanitary pads available at only ₹1 per pad.',
      'Open to all citizens with a valid medical prescription with zero income caps.'
    ],
    eligibility: {
      minAge: 0,
      maxAge: 100,
      allowedOccupations: ['All Citizens', 'Student', 'Farmer', 'Worker', 'Senior Citizen'],
      citizenRequirement: 'All Indian citizens with doctor prescription',
      specialCriteria: 'No income limits or document verification required at counter.'
    },
    requiredDocuments: [
      'Doctor Medical Prescription (for scheduled medicines)',
      'No income proof needed'
    ],
    applicationDeadline: 'Available Daily across 10,000+ Kendras',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://janaushadhi.gov.in',
    beneficiariesReached: '10+ Crore Patients Served',
    accentGradient: 'from-yellow-300/20 via-yellow-500/5 to-black',
    iconName: 'Pill',
    tagline: 'Quality healthcare essentials affordable for every common citizen'
  },
  {
    id: 'pm-vidyalaxmi',
    title: 'PM Vidyalaxmi Collateral-Free Education Loan',
    code: 'PM-VIDYALAXMI',
    category: 'education',
    categoryLabel: 'Education & Students',
    ministryOrAuthority: 'Ministry of Education & Department of Financial Services',
    headlineBenefit: 'Up to ₹7.5 Lakhs Collateral-Free Student Loans at 3% Subsidy',
    benefitNumericValue: 'Up to ₹7.5 Lakhs',
    summaryIn60s: 'Unified digital portal guaranteeing collateral-free and guarantor-free education loans for students admitted to India top 860 quality higher educational institutions.',
    keyBullets: [
      'Zero collateral or third-party guarantor required for loans up to ₹7.5 Lakhs.',
      '3% interest subvention for students from families with income up to ₹8 Lakhs/year.',
      '100% digital, transparent application process through unified portal.'
    ],
    eligibility: {
      minAge: 17,
      maxAge: 35,
      allowedOccupations: ['Student'],
      maxAnnualIncomeInLakhs: 8.0,
      citizenRequirement: 'Indian student admitted to approved NIRF-ranked institution',
      specialCriteria: 'Must have secured merit admission in approved higher education course.'
    },
    requiredDocuments: [
      'College Admission Offer Letter & Fee Structure',
      'Class 10th & 12th / Graduation Marksheets',
      'Family Income Certificate / ITR',
      'Aadhaar and PAN Card of Student and Co-borrower'
    ],
    applicationDeadline: 'Continuous Enrollment for Academic Sessions',
    deadlineType: 'ongoing',
    officialPortalUrl: 'https://www.vidyalakshmi.co.in',
    beneficiariesReached: '22+ Lakh Students Registered',
    accentGradient: 'from-yellow-400/20 via-yellow-500/5 to-black',
    iconName: 'GraduationCap',
    tagline: 'Ensuring no meritorious student is denied higher education for lack of funds'
  }
];

export interface SchemeSectionMeta {
  category: Exclude<SchemeCategory, 'all'>;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
}

export const SCHEME_SECTIONS: SchemeSectionMeta[] = [
  {
    category: 'healthcare',
    title: 'Healthcare & Medical Assurance',
    subtitle: 'Free hospitalization, medical treatments, critical illness coverage & subsidized medicines',
    icon: 'HeartPulse',
    badge: 'Health Security'
  },
  {
    category: 'agriculture',
    title: 'Agriculture & Farming Support',
    subtitle: 'Income support, comprehensive crop disaster insurance, and farming equipment subsidies',
    icon: 'Sprout',
    badge: 'Farmer Buffer'
  },
  {
    category: 'startup_msme',
    title: 'Startups, MSME & Entrepreneur Loans',
    subtitle: 'Collateral-free credit, working capital, and seed funding for small businesses & innovators',
    icon: 'Briefcase',
    badge: 'Business Growth'
  },
  {
    category: 'education',
    title: 'Education, Fellowships & Student Grants',
    subtitle: 'Higher education merit scholarships, university tuition fellowships & student loans',
    icon: 'GraduationCap',
    badge: 'Youth & Scholars'
  },
  {
    category: 'welfare',
    title: 'Citizen Welfare & Affordable Housing',
    subtitle: 'Pucca housing subsidies, artisan skill kits, and foundational social welfare security',
    icon: 'Home',
    badge: 'Housing & Aid'
  },
  {
    category: 'senior_citizen',
    title: 'Senior Citizens & Guaranteed Pensions',
    subtitle: 'Lifelong retirement income, monthly social security pensions, and elder welfare',
    icon: 'ShieldCheck',
    badge: 'Retirement Care'
  },
  {
    category: 'women_child',
    title: 'Women & Child Empowerment',
    subtitle: 'Girl child financial security, triple-tax-free savings, and women-led entrepreneurship',
    icon: 'Sparkles',
    badge: 'Dignity & Future'
  }
];

export const CATEGORY_TABS: { id: SchemeCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Schemes', count: SCHEMES_DATABASE.length },
  { id: 'healthcare', label: 'Healthcare', count: SCHEMES_DATABASE.filter(s => s.category === 'healthcare').length },
  { id: 'welfare', label: 'Welfare & Housing', count: SCHEMES_DATABASE.filter(s => s.category === 'welfare').length },
  { id: 'startup_msme', label: 'Startups & MSME', count: SCHEMES_DATABASE.filter(s => s.category === 'startup_msme').length },
  { id: 'education', label: 'Education & Grants', count: SCHEMES_DATABASE.filter(s => s.category === 'education').length },
  { id: 'agriculture', label: 'Agriculture', count: SCHEMES_DATABASE.filter(s => s.category === 'agriculture').length },
  { id: 'senior_citizen', label: 'Senior Citizens', count: SCHEMES_DATABASE.filter(s => s.category === 'senior_citizen').length },
  { id: 'women_child', label: 'Women & Child', count: SCHEMES_DATABASE.filter(s => s.category === 'women_child').length },
];

