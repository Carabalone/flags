import React, { useEffect, useState } from 'react';
import countriesData from '../assets/countries_corrected.json';

interface HomeMenuProps {
  onSelectMode: (mode: '0-n' | 'full' | 'hardcore') => void;
}

let buttonClass = "text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mb-4 w-64 drop-shadow-md"

const getRandomFlag = () => {
  const randomIndex = Math.floor(Math.random() * countriesData.length);
  return countriesData[randomIndex];
};

const HomeMenu: React.FC<HomeMenuProps> = ({ onSelectMode }) => {
  const [dailyFlag, setDailyFlag] = useState<{ name: string; code: string } | null>(null);

  const getCurrentDay = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
  };

  // Fetch or generate the daily flag
  useEffect(() => {
    const savedFlag = localStorage.getItem('dailyFlag');
    const savedDate = localStorage.getItem('dailyFlagDate');
    const currentDate = getCurrentDay();

    if (savedFlag && savedDate === currentDate) {
      // Use the saved flag if it's from the same day
      setDailyFlag(JSON.parse(savedFlag));
    } else {
      // Generate a new random flag for today
      const newFlag = getRandomFlag();
      setDailyFlag(newFlag);
      localStorage.setItem('dailyFlag', JSON.stringify(newFlag));
      localStorage.setItem('dailyFlagDate', currentDate);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-100">
      <h1 className="text-3xl text-black font-bold mb-8">Flags 
        {dailyFlag && (
          <img
            src={`https://flagcdn.com/64x48/${dailyFlag.code.toLowerCase()}.png`}
            alt={dailyFlag.name}
            className="inline-block ml-4 h-8"
          />
        )}
      </h1>
      <div className="flex flex-col bg-zinc-100 p-6 rounded-lg shadow-lg items-center">
        <button
          onClick={() => onSelectMode('0-n')}
          className={"bg-sky-500 hover:bg-sky-600 " + buttonClass}
        >
          0-N Run
        </button>
        <button
          className={"bg-zinc-700 hover:bg-zinc-800 " + buttonClass}
          disabled
        >
          Daily Run (In Construction)
        </button>
        <button
          onClick={() => onSelectMode('full')}
          className={"bg-lime-500 hover:bg-green-600 " + buttonClass}
        >
          Full Run (All 254)
        </button>
        <button
          onClick={() => onSelectMode('hardcore')}
          className={"bg-red-500 hover:bg-red-600 " + buttonClass}
        >
          Hardcore Mode
        </button>
      </div>
    </div>
  );
};

export default HomeMenu;
