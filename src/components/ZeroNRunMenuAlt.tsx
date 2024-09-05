import React, { useState } from 'react';
import Title from './Title.tsx'

interface ZeroNRunMenuAltProps {
  onStart: (n: number) => void;
  onHome: () => void;
}

const ZeroNRunMenu: React.FC<ZeroNRunMenuAltProps> = ({ onStart, onHome }) => {
  const [n, setN] = useState(10);
  const [customValue, setCustomValue] = useState('');

  const buttonClass = "bg-blue-500 font-semibold text-white py-2 px-2 rounded-lg hover:bg-blue-600 transition duration-300 w-24 items-center";

  const handleButtonClick = (value: number) => {
    setN(value);
    onStart(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 254) {
      setCustomValue(e.target.value);
      setN(value);
    }
  };

  const handleCustomStart = () => {
    if (n >= 1 && n <= 254) {
      onStart(n);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      <div> <Title/> </div>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-lg place-items-center">
          {/* Row 1 */}
          <button
            onClick={() => handleButtonClick(10)}
            className={buttonClass}
          >
            10
          </button>
          <button
            onClick={() => handleButtonClick(15)}
            className={buttonClass}
          >
            15
          </button>
          <button
            onClick={() => handleButtonClick(20)}
            className={buttonClass}
          >
            20
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleButtonClick(25)}
            className={buttonClass}
          >
            25
          </button>
          <button
            onClick={() => handleButtonClick(30)}
            className={buttonClass}
          >
            30
          </button>
          <button
            onClick={() => handleButtonClick(50)}
            className={buttonClass}
          >
            50
          </button>

          {/* Row 3 - Custom Input */}
          <div></div> {/* Empty space */}
          <input
            type="number"
            min="1"
            max="254"
            value={customValue}
            onChange={handleInputChange}
            className="text-lg border-2 border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Custom"
          />
          <div></div> {/* Empty space */}
        </div>

        <div className="w-full flex justify-between px-6 mt-2">
          <button onClick={onHome} className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
              Home
          </button>

          <button
            onClick={handleCustomStart}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Start Game
          </button>

        </div>
      </div>
    </div>
  );
};

export default ZeroNRunMenu;
