import React from 'react';
import { AppLanguage } from '../utils/i18n';
import { schemeAudioService } from '../utils/audio';

interface LanguageSelectionPageProps {
  onSelectLanguage: (language: AppLanguage) => void;
}

export const LanguageSelectionPage: React.FC<LanguageSelectionPageProps> = ({ onSelectLanguage }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-6">
      <div className="flex flex-col gap-5 w-full max-w-sm sm:max-w-md items-center justify-center">
        <button
          onClick={() => {
            schemeAudioService.playChime('switch');
            onSelectLanguage('english');
          }}
          className="w-full py-5 px-8 rounded-2xl bg-black hover:bg-yellow-400 text-white hover:text-black font-black text-xl sm:text-2xl transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-2 border-black flex items-center justify-center"
        >
          <span>English</span>
        </button>

        <button
          onClick={() => {
            schemeAudioService.playChime('switch');
            onSelectLanguage('hindi');
          }}
          className="w-full py-5 px-8 rounded-2xl bg-black hover:bg-yellow-400 text-white hover:text-black font-black text-xl sm:text-2xl transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-2 border-black flex items-center justify-center"
        >
          <span>Hindi</span>
        </button>

        <button
          onClick={() => {
            schemeAudioService.playChime('switch');
            onSelectLanguage('konkani');
          }}
          className="w-full py-5 px-8 rounded-2xl bg-black hover:bg-yellow-400 text-white hover:text-black font-black text-xl sm:text-2xl transition-all duration-200 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer border-2 border-black flex items-center justify-center"
        >
          <span>Konkani</span>
        </button>
      </div>
    </div>
  );
};
