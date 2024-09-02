import React from 'react';

interface HomeMenuProps {
  onSelectMode: (mode: '0-n' | 'full') => void;
}

const HomeMenu: React.FC<HomeMenuProps> = ({ onSelectMode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
      <h1 className="text-3xl text-black font-bold mb-8">Flag Quiz Game</h1>
      <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg items-center">
        <button
          onClick={() => onSelectMode('0-n')}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
        >
          0-N Run
        </button>
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-4"
          disabled
        >
          Daily Run (In Construction)
        </button>
        <button
          onClick={() => onSelectMode('full')}
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Full Run (All 254)
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;
