import React from 'react';
import { ArrowRight, Sparkles, Zap, ShieldCheck, CheckCircle2, Award } from 'lucide-react';
import { schemeAudioService } from '../utils/audio';

interface SplashScreenProps {
  onGetStarted: () => void;
  totalSchemesCount: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted, totalSchemesCount }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between overflow-hidden bg-white text-black p-6 sm:p-12 selection:bg-yellow-400 selection:text-black">
      {/* Background ambient lighting - Yellow & Soft glows on White */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-br from-yellow-300/30 via-yellow-400/15 to-transparent rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute -bottom-40 right-10 w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200/25 to-transparent rounded-full blur-3xl opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb80_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb80_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Top micro brand kicker */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/80" />
          <span className="text-xs font-bold tracking-wider uppercase text-neutral-600">
            Civic Intelligence Engine
          </span>
        </div>
        <div className="text-xs font-mono tabular-nums text-neutral-700 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full font-medium">
          <span className="text-black font-extrabold">{totalSchemesCount}</span> Verified Schemes Live
        </div>
      </header>

      {/* Center Hero Identity Zone */}
      <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-2xl px-4 py-8">
        {/* Logo Badge Icon: Black, Yellow and White */}
        <div className="relative mb-6 group cursor-default">
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 rounded-3xl blur-xl opacity-35 group-hover:opacity-60 transition duration-500" />
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-black border-2 border-yellow-400 flex items-center justify-center shadow-xl">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <Zap className="w-12 h-12 text-yellow-400 stroke-[2.4]" />
                <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Primary App Title: SchemeShortsAI */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black mb-3">
          SchemeShorts<span className="text-yellow-500">AI</span>
        </h1>

        <p className="text-base sm:text-xl text-neutral-600 font-medium max-w-xl mx-auto mb-8 leading-relaxed">
          Skip 50-page bureaucratic guidelines. Discover welfare, grants & government subsidies in <span className="text-black font-extrabold underline decoration-yellow-400 decoration-3 underline-offset-4">60-second bite-sized video highlights</span>.
        </p>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-10 text-left">
          <div className="p-4 rounded-2xl bg-neutral-50/90 border border-neutral-200 hover:border-yellow-400 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 text-black font-bold">
              <div className="w-6 h-6 rounded-lg bg-yellow-400 text-black flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wide">60s Takeaways</span>
            </div>
            <p className="text-xs text-neutral-600 leading-normal">
              Key financial aid numbers, benefits, and critical rules at a single glance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50/90 border border-neutral-200 hover:border-yellow-400 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 text-black font-bold">
              <div className="w-6 h-6 rounded-lg bg-yellow-400 text-black flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wide">Instant Eligibility</span>
            </div>
            <p className="text-xs text-neutral-600 leading-normal">
              Live criteria match calculator for your age, income, and profession.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50/90 border border-neutral-200 hover:border-yellow-400 transition-colors shadow-sm">
            <div className="flex items-center gap-2 mb-1.5 text-black font-bold">
              <div className="w-6 h-6 rounded-lg bg-yellow-400 text-black flex items-center justify-center">
                <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wide">Direct Apply</span>
            </div>
            <p className="text-xs text-neutral-600 leading-normal">
              Official ministry portal routes and verified document checklists.
            </p>
          </div>
        </div>

        {/* Primary Call to Action: Start in Yellow & Black */}
        <button
          onClick={() => {
            schemeAudioService.playChime('play');
            onGetStarted();
          }}
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-extrabold text-black bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all duration-200 shadow-xl shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-yellow-500/30"
        >
          <span>Start</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]" />
        </button>
      </main>

      {/* Footer reassurance */}
      <footer className="relative z-10 w-full max-w-4xl flex flex-wrap items-center justify-center gap-6 py-4 text-xs text-neutral-500 border-t border-neutral-200">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" /> 100% Free Public Citizen Tool
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" /> Real Ministry Verified Data
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-yellow-500" /> No Login Required
        </span>
      </footer>
    </div>
  );
};
