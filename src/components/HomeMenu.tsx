import React from 'react';
import Title from './Title.tsx';

interface HomeMenuProps {
  onSelectMode: (mode: '0-n' | 'full' | 'hardcore' | 'multiple-choice') => void;
}

let buttonClass =
  'text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4 w-64 drop-shadow-md';

const HomeMenu: React.FC<HomeMenuProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-100">
      <Title />
      <div className="flex flex-col bg-zinc-100 p-6 rounded-lg shadow-lg items-center">
        <button
          onClick={() => onSelectMode('0-n')}
          className={'bg-sky-500 hover:bg-sky-600 ' + buttonClass}
        >
          0-N Run
        </button>
        <button
          className={'bg-zinc-700 hover:bg-zinc-800 ' + buttonClass}
          disabled
        >
          Daily Run (In Construction)
        </button>
        <button
          onClick={() => onSelectMode('full')}
          className={'bg-lime-500 hover:bg-green-600 ' + buttonClass}
        >
          Full Run (All 254)
        </button>
        <button
          onClick={() => onSelectMode('hardcore')}
          className={'bg-red-500 hover:bg-red-600 ' + buttonClass}
        >
          Hardcore Mode
        </button>
        <button
          onClick={() => onSelectMode('multiple-choice')}
          className={'bg-purple-500 hover:bg-purple-600 ' + buttonClass}
        >
          Multiple Choice Mode
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;
