import React, { useState } from 'react';

interface ZeroNRunMenuProps {
  onStart: (n: number) => void;
}

const ZeroNRunMenu: React.FC<ZeroNRunMenuProps> = ({ onStart }) => {
  const [n, setN] = useState(10);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setN(parseInt(e.target.value, 10));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 254) {
      setN(value);
    }
  };

  const handleStartClick = () => {
    onStart(n);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Select Number of Flags (N): {n}
        </h2>
        <input
          type="range"
          min="1"
          max="254"
          step="5"
          value={n}
          onChange={handleSliderChange}
          className="w-full mb-4"
        />
        <input
          type="number"
          min="1"
          max="254"
          value={n}
          onChange={handleInputChange}
          className="text-lg mb-4 border-2 border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          onClick={handleStartClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default ZeroNRunMenu;
