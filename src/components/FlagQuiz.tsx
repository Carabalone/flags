import React, { useState, useEffect, useCallback } from 'react';
import countriesData from '../assets/countries_corrected.json';

interface FlagQuizProps {
  n: number;
  onFinish: (score: number) => void;
}

const FlagQuiz: React.FC<FlagQuizProps> = ({ n, onFinish }) => {
  const [answer, setAnswer] = useState('');
  // const [message, setMessage] = useState('');
  const [message, setMessage] = useState<JSX.Element | null>(null); // Changed to JSX.Element or null
  const [currentFlag, setCurrentFlag] = useState<{ code: string; name: string } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [remainingFlags, setRemainingFlags] = useState(n);
  const [isFinished, setIsFinished] = useState(false);


  useEffect(() => {
    randomizeCountry();
  }, []);

  const randomizeCountry = () => {
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
    setCurrentFlag(randomCountry);
    setMessage(null);
    setAnswer('');
    setSuggestions([]);
    setActiveSuggestionIndex(0);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (answer == "") {
      setMessage(<p className="text-red-500">Input Something</p>);
        return;
    }
    if (currentFlag && answer.toLowerCase() === currentFlag.name.toLowerCase()) {
      setScore(score + 1);
      setMessage(<p className="text-green-500">Correct!</p>);
    } else {
      setMessage(
        <p className="text-red-500">
          Incorrect! The correct answer was <span className="font-semibold text-lime-500">{currentFlag?.name}.</span>
        </p>
      );
    }

    // setMessage(`your answ: ${answer}`)

    setTimeout(() => {
      setRemainingFlags(remainingFlags - 1);
      if (remainingFlags > 1) {
        randomizeCountry();
      } else {
        setIsFinished(true);
      }
    }, 950);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnswer(value);

    if (value.length > 0) {

    const filteredSuggestions = countriesData
      .filter(country => 
        country.name.toLowerCase().includes(value) || 
        country.name.toLowerCase().startsWith(value)
      )
      .sort((a, b) => {
        // Prioritize startsWith matches
        const aStartsWith = a.name.toLowerCase().startsWith(value);
        const bStartsWith = b.name.toLowerCase().startsWith(value);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;
        return 0;
      })
      .map(country => country.name);
      setSuggestions(filteredSuggestions);
      setActiveSuggestionIndex(0);
    } else {
      setSuggestions([]);
    }
  };


    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (suggestions.length > 0) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestionIndex((prevIndex) =>
              prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
            );
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestionIndex((prevIndex) =>
              prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
            );
          } else if (e.key === 'Tab' || e.key === 'Enter') {
            e.preventDefault();
            const selectedSuggestion = suggestions[activeSuggestionIndex];

            // Update the answer state and clear the suggestions
            setSuggestions([]);
            setAnswer(selectedSuggestion);
          }
        }
      },
      [suggestions, activeSuggestionIndex, handleSubmit]
    );

  const handleSuggestionClick = (suggestion: string) => {
    setAnswer(suggestion);
    setSuggestions([]);
  };

  const handleFinishEarly = () => {
    setIsFinished(true);
  };

  const handleRetry = () => {
    setScore(0);
    setRemainingFlags(n);
    setIsFinished(false);
    randomizeCountry();
  };

  const handleBackToMenu = () => {
    onFinish(score);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 overflow-hidden">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-between w-full mb-4 text-black">
          <span className="text-lg font-bold">Score: {score}</span>
          <span className="text-lg font-bold">Remaining: {remainingFlags}</span>
        </div>
        {currentFlag && (
          <img
            src={`https://flagcdn.com/80x60/${currentFlag.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/160x120/${currentFlag.code.toLowerCase()}.png 2x,
              https://flagcdn.com/240x180/${currentFlag.code.toLowerCase()}.png 3x`}
            width="80"
            height="60"
            alt={currentFlag.name}
            className="mb-6"
          />
        )}
        <form onSubmit={handleSubmit} className="w-full relative">
          <input
            type="text"
            placeholder="Enter country name"
            value={answer}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2 mb-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-2 cursor-pointer text-black ${
                    index === activeSuggestionIndex ? 'bg-gray-300' : 'hover:bg-gray-200'
                  }`}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-lg font-semibold`}>
            {message}
          </p>
        )}

        <button
          onClick={handleFinishEarly}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Finish Early
        </button>
      </div>

      {/* Popup for end of game */}
      {isFinished && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-20">
          <div className="bg-white text-slate-800 p-6 space-x-4 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">Game Over</h2>
            <p className="mb-4">Your final score is <span className="font-bold text-slate-700">{score}/{n}</span>.</p>
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToMenu}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagQuiz;
