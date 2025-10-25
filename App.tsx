
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeGeneratorForm } from './components/CodeGeneratorForm';
import { CodeDisplay } from './components/CodeDisplay';
import { generateRoboticArmCode } from './services/geminiService';
import { LanguageOption } from './types';
import { RobotArmIcon } from './components/Icons';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<LanguageOption>('Python');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a task for the robotic arm.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateRoboticArmCode(prompt, language);
      setGeneratedCode(code);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 flex flex-col space-y-8">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
             <div className="flex items-center gap-4 mb-4">
                <RobotArmIcon className="w-8 h-8 text-cyan-400"/>
                <h2 className="text-2xl font-bold text-white">Describe the Task</h2>
            </div>
            <p className="text-gray-400 mb-6">
                Enter a natural language command for the 5-DOF robotic arm. Be as descriptive as you like.
            </p>
            <CodeGeneratorForm
              prompt={prompt}
              setPrompt={setPrompt}
              language={language}
              setLanguage={setLanguage}
              onSubmit={handleGenerateCode}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="lg:w-1/2 flex flex-col">
           <CodeDisplay
              code={generatedCode}
              isLoading={isLoading}
              error={error}
            />
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        <p>Powered by Gemini API. Generated code may require review and adaptation.</p>
      </footer>
    </div>
  );
};

export default App;
