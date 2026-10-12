import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Scheme, UserEligibilityProfile } from '../types/scheme';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetScheme?: Scheme | null;
  allSchemes: Scheme[];
  onSelectScheme: (scheme: Scheme) => void;
}

const OCCUPATION_OPTIONS = [
  'Student',
  'Farmer',
  'Business Owner',
  'Entrepreneur',
  'Artisan',
  'Informal Laborer',
  'Self-Employed',
  'Private Employee',
  'Shopkeeper',
  'Domestic Worker',
  'Unemployed'
];

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  targetScheme,
  allSchemes,
  onSelectScheme,
}) => {
  const [profile, setProfile] = useState<UserEligibilityProfile>({
    age: 26,
    occupation: 'Self-Employed',
    annualIncomeLakhs: 2.5,
    categoryGroup: 'general',
  });

  const [selectedSchemeId, setSelectedSchemeId] = useState<string>(
    targetScheme ? targetScheme.id : allSchemes[0]?.id || ''
  );

  if (!isOpen) return null;

  const currentScheme = allSchemes.find((s) => s.id === selectedSchemeId) || allSchemes[0];

  const calculateEligibility = (scheme: Scheme, p: UserEligibilityProfile) => {
    const checks: { label: string; passed: boolean; reason: string }[] = [];
    let score = 100;

    // Age Check
    const agePassed = p.age >= scheme.eligibility.minAge && p.age <= scheme.eligibility.maxAge;
    if (agePassed) {
      checks.push({
        label: 'Age Eligibility',
        passed: true,
        reason: `Your age (${p.age}) meets the required range (${scheme.eligibility.minAge} - ${scheme.eligibility.maxAge} yrs).`
      });
    } else {
      score -= 40;
      checks.push({
        label: 'Age Eligibility',
        passed: false,
        reason: `Your age (${p.age}) falls outside the allowable limit of ${scheme.eligibility.minAge} to ${scheme.eligibility.maxAge} yrs.`
      });
    }

    // Occupation Check
    const occupationPassed =
      scheme.eligibility.allowedOccupations.length === 0 ||
      scheme.eligibility.allowedOccupations.includes(p.occupation) ||
      scheme.eligibility.allowedOccupations.includes('Self-Employed');

    if (occupationPassed) {
      checks.push({
        label: 'Occupation Match',
        passed: true,
        reason: `Your profession (${p.occupation}) qualifies under eligible categories.`
      });
    } else {
      score -= 30;
      checks.push({
        label: 'Occupation Match',
        passed: false,
        reason: `Targeted towards: ${scheme.eligibility.allowedOccupations.join(', ')}.`
      });
    }

    // Income Check
    if (scheme.eligibility.maxAnnualIncomeInLakhs !== undefined) {
      const incomePassed = p.annualIncomeLakhs <= scheme.eligibility.maxAnnualIncomeInLakhs;
      if (incomePassed) {
        checks.push({
          label: 'Income Cap Criteria',
          passed: true,
          reason: `Annual income (₹${p.annualIncomeLakhs}L) is within the maximum limit (₹${scheme.eligibility.maxAnnualIncomeInLakhs}L/yr).`
        });
      } else {
        score -= 35;
        checks.push({
          label: 'Income Cap Criteria',
          passed: false,
          reason: `Household income exceeds the ceiling cap of ₹${scheme.eligibility.maxAnnualIncomeInLakhs} Lakhs/yr.`
        });
      }
    } else {
      checks.push({
        label: 'Income Cap Criteria',
        passed: true,
        reason: 'No restrictive annual income cap enforced for this national scheme.'
      });
    }

    const finalScore = Math.max(10, Math.min(100, score));
    return { score: finalScore, checks };
  };

  const evaluation = currentScheme ? calculateEligibility(currentScheme, profile) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-2 border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1 text-black font-black">
          <div className="w-6 h-6 rounded-lg bg-yellow-400 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-yellow-700">AI Eligibility Simulator</span>
        </div>
        <h2 className="text-2xl font-black text-black mb-2">Check Your Scheme Qualifications</h2>
        <p className="text-xs sm:text-sm text-neutral-600 mb-6">
          Adjust your personal profile below to see if you fulfill the official eligibility rules.
        </p>

        {/* Input Profile Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 mb-6">
          {/* Age Input */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Your Age: <span className="text-black font-mono font-black">{profile.age} yrs</span>
            </label>
            <input
              type="range"
              min={10}
              max={85}
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
              <span>10</span>
              <span>85</span>
            </div>
          </div>

          {/* Occupation Select */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Primary Occupation
            </label>
            <select
              value={profile.occupation}
              onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
              className="w-full bg-white border border-neutral-300 text-xs text-black rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-yellow-400 cursor-pointer font-medium"
            >
              {OCCUPATION_OPTIONS.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Income Slider */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1.5">
              Annual Income: <span className="text-black font-mono font-black">₹{profile.annualIncomeLakhs}L</span>
            </label>
            <input
              type="range"
              min={0.5}
              max={25}
              step={0.5}
              value={profile.annualIncomeLakhs}
              onChange={(e) => setProfile({ ...profile, annualIncomeLakhs: Number(e.target.value) })}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 font-mono mt-1">
              <span>₹0.5L</span>
              <span>₹25L+</span>
            </div>
          </div>
        </div>

        {/* Scheme Selector */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-neutral-700 mb-1.5">
            Evaluate Against Scheme:
          </label>
          <select
            value={selectedSchemeId}
            onChange={(e) => setSelectedSchemeId(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-black rounded-xl px-3 py-2.5 focus:outline-none focus:border-yellow-400 cursor-pointer font-bold"
          >
            {allSchemes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.title} ({s.headlineBenefit})
              </option>
            ))}
          </select>
        </div>

        {/* Evaluation Output Result */}
        {currentScheme && evaluation && (
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-yellow-700 block mb-0.5">
                  Calculated Qualification Score
                </span>
                <h4 className="text-base font-black text-black">{currentScheme.title}</h4>
              </div>

              <div className="text-right">
                <div
                  className={`text-2xl font-black font-mono tabular-nums ${
                    evaluation.score >= 80
                      ? 'text-black'
                      : evaluation.score >= 60
                      ? 'text-neutral-700'
                      : 'text-neutral-500'
                  }`}
                >
                  {evaluation.score}%
                </div>
                <span className="text-[10px] text-neutral-600 font-bold">
                  {evaluation.score >= 80 ? 'Highly Eligible' : evaluation.score >= 60 ? 'Conditional Match' : 'Unlikely Match'}
                </span>
              </div>
            </div>

            {/* Criteria breakdown */}
            <div className="space-y-2.5 mb-5">
              {evaluation.checks.map((check, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-black">{check.label}: </span>
                    <span className="text-neutral-600 font-medium">{check.reason}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action to view scheme details or apply */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectScheme(currentScheme);
                  onClose();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>View Full Scheme Guidelines</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <a
                href={currentScheme.officialPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-xs transition-colors cursor-pointer shadow-sm"
              >
                Apply on Portal
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
