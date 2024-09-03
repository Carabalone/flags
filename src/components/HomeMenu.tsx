import React from 'react';

interface HomeMenuProps {
  onSelectMode: (mode: '0-n' | 'full') => void;
}

let buttonClass = "text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4 w-64 drop-shadow-md"

const HomeMenu: React.FC<HomeMenuProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-100">
      <h1 className="text-3xl text-black font-bold mb-8">Flags</h1>
      <div className="flex flex-col bg-zinc-100 p-6 rounded-lg shadow-lg items-center">
        <button
          onClick={() => onSelectMode('0-n')}
          className={"bg-sky-500 " + buttonClass}
        >
          0-N Run
        </button>
        <button
          className={"bg-zinc-700 " + buttonClass}
          disabled
        >
          Daily Run (In Construction)
        </button>
        <button
          onClick={() => onSelectMode('full')}
          className={"bg-lime-500 " + buttonClass}
        >
          Full Run (All 254)
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;
