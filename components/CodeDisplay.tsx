
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, CodeIcon } from './Icons';

interface CodeDisplayProps {
  code: string;
  isLoading: boolean;
  error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="animate-pulse space-y-2 p-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
         <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
);


export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, isLoading, error }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setIsCopied(true);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  useEffect(() => {
    // Reset copied state when new code is generated
    setIsCopied(false);
  }, [code]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return <div className="p-6 text-red-400">{error}</div>;
    }
    if (code) {
      return (
        <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
          <CodeIcon className="w-16 h-16 mb-4" />
          <p className="text-lg text-center">Your generated code will appear here.</p>
      </div>
    );
  };
  
  return (
    <div className="flex-grow flex flex-col bg-gray-800 rounded-lg shadow-lg border border-gray-700 min-h-[300px] lg:min-h-0">
      <div className="flex justify-between items-center p-3 bg-gray-900/50 rounded-t-lg border-b border-gray-700">
        <h3 className="font-mono text-lg text-gray-300">Generated Code</h3>
        {code && !error && (
            <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50"
            disabled={isCopied}
            >
            {isCopied ? (
                <>
                    <CheckIcon className="w-4 h-4 text-green-400" />
                    <span>Copied!</span>
                </>
            ) : (
                <>
                    <CopyIcon className="w-4 h-4" />
                    <span>Copy</span>
                </>
            )}
            </button>
        )}
      </div>
      <div className="flex-grow overflow-auto">
         {renderContent()}
      </div>
    </div>
  );
};
