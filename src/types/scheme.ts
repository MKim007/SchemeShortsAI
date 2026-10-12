export type SchemeCategory = 
  | 'all'
  | 'healthcare'
  | 'welfare'
  | 'education'
  | 'startup_msme'
  | 'agriculture'
  | 'senior_citizen'
  | 'women_child';

export interface Scheme {
  id: string;
  title: string;
  code: string;
  category: Exclude<SchemeCategory, 'all'>;
  categoryLabel: string;
  ministryOrAuthority: string;
  headlineBenefit: string;
  benefitNumericValue?: string;
  summaryIn60s: string;
  keyBullets: [string, string, string];
  eligibility: {
    minAge: number;
    maxAge: number;
    allowedOccupations: string[];
    maxAnnualIncomeInLakhs?: number; // e.g. 8 for 8 Lakhs/year
    citizenRequirement: string;
    specialCriteria?: string;
  };
  requiredDocuments: string[];
  applicationDeadline: string; // e.g. 'Open All Year' or specific date
  deadlineType: 'ongoing' | 'closing_soon' | 'annual_cycle';
  officialPortalUrl: string;
  beneficiariesReached: string;
  accentGradient: string;
  iconName: string;
  tagline: string;
}

export interface ViewedRecord {
  schemeId: string;
  viewedAt: number; // timestamp
}

export interface UserEligibilityProfile {
  age: number;
  occupation: string;
  annualIncomeLakhs: number;
  categoryGroup: string;
}
