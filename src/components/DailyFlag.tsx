import React, { useEffect, useState } from 'react';
import countriesData from '../assets/countries_corrected.json';

const getRandomFlag = () => {
  const randomIndex = Math.floor(Math.random() * countriesData.length);
  return countriesData[randomIndex];
};

const getCurrentDay = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // YYYY-MM-DD format
};

const DailyFlag: React.FC = () => {
  const [dailyFlag, setDailyFlag] = useState<{
    name: string;
    code: string;
  } | null>(null);

  useEffect(() => {
    const savedFlag = localStorage.getItem('dailyFlag');
    const savedDate = localStorage.getItem('dailyFlagDate');
    const currentDate = getCurrentDay();

    if (savedFlag && savedDate === currentDate) {
      setDailyFlag(JSON.parse(savedFlag));
    } else {
      const newFlag = getRandomFlag();
      setDailyFlag(newFlag);
      localStorage.setItem('dailyFlag', JSON.stringify(newFlag));
      localStorage.setItem('dailyFlagDate', currentDate);
    }
  }, []);

  return (
    <>
      {dailyFlag && (
        <img
          src={`https://flagcdn.com/64x48/${dailyFlag.code.toLowerCase()}.png`}
          alt={dailyFlag.name}
          className="inline-block h-8"
        />
      )}
    </>
  );
};

export default DailyFlag;
