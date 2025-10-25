
import React from 'react';
import { LanguageOption, languageOptions } from '../types';
import { GenerateIcon } from './Icons';

interface CodeGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CodeGeneratorForm: React.FC<CodeGeneratorFormProps> = ({
  prompt,
  setPrompt,
  language,
  setLanguage,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Pick up the object at position X, Y and place it at Z, W"
        className="w-full h-40 p-4 bg-gray-900/50 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none transition-colors"
        disabled={isLoading}
      />
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-auto flex-grow">
          <label htmlFor="language-select" className="sr-only">Select Language</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageOption)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-colors appearance-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            disabled={isLoading}
          >
            {languageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform active:scale-95"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <GenerateIcon className="w-5 h-5" />
              Generate Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};
