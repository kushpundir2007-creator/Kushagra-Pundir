
import React from 'react';
import { RobotArmIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
         <div className="flex items-center gap-3">
             <RobotArmIcon className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                5-DOF Robotic Arm Code Generator
            </h1>
         </div>
      </div>
    </header>
  );
};
