import React, { useState, useEffect } from 'react';
import countriesData from '../assets/countries_corrected.json';
import { showFlag, shuffleArray } from './utils/utils.tsx';
import Title from './Title.tsx';

interface MultipleChoiceQuizProps {
  onFinish: (score: number) => void;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ onFinish }) => {
  const [currentCountry, setCurrentCountry] = useState(countriesData[0]);
  const [options, setOptions] = useState<typeof countriesData>([]);
  const [score, setScore] = useState(0);
  const [remaining, setRemaining] = useState(countriesData.length);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState<{
    correct: boolean;
    selected: string;
  } | null>(null);

  const generateOptions = () => {
    const shuffledCountries = shuffleArray([...countriesData]);
    const newOptions = shuffledCountries.slice(0, 4);
    setOptions(shuffleArray(newOptions));
    setCurrentCountry(newOptions[0]);
    setIsAnswered(false);
    setAnswerFeedback(null);
    setRemaining((prev) => prev - 1);
  };

  const handleAnswer = (answer: string) => {
    setIsAnswered(true);
    if (answer === currentCountry.name) {
      setScore((prevScore) => prevScore + 1);
      setAnswerFeedback({ correct: true, selected: answer });
      setTimeout(() => {
        if (remaining > 1) {
          generateOptions();
        } else {
          setGameOver(true);
        }
      }, 750);
    } else {
      setAnswerFeedback({ correct: false, selected: answer });
      setTimeout(() => {
        setGameOver(true);
      }, 1500);
    }
  };

  const handleFinish = () => {
    setTimeout(() => {
      setGameOver(true);
    }, 150);
  }

  const handleRetry = () => {
    setScore(0);
    setRemaining(countriesData.length);
    setGameOver(false);
    generateOptions();
  };

  useEffect(() => {
    generateOptions();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full bg-zinc-100">
      <Title/>

      <div className="bg-white rounded-lg shadow-xl p-8 flex flex-col items-center w-[80%] md:w-[50%] lg:w-[40%]">
        <div className="relative flex flex-row w-full justify-between m-4 text-black text-lg font-bold">
          <div>
            Score: {score}
          </div>
          <div>
            Remaining: {remaining}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-black mb-6">
          Which country does this flag belong to?
        </h1>
        {currentCountry && showFlag(currentCountry, 80)}

        <div className="grid grid-cols-2 gap-2 w-full mt-6">
          {options.map((option) => (
            <button
              key={option.name}
              onClick={() => handleAnswer(option.name)}
              className={`text-white py-4 text-lg font-semibold rounded-lg transition duration-300 w-full h-16
                ${isAnswered
                  ? option.name === currentCountry.name
                    ? 'bg-green-500'
                    : option.name === answerFeedback?.selected
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
              disabled={isAnswered}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

        <div className="flex flex-col items-center justify-center w-full mt-4 text-black">
          <button
            onClick={handleFinish}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Finish Early
          </button>
        </div>

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[80%] md:w-[50%] lg:w-[30%] text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Game Over</h1>
            <p className="text-2xl font-semibold text-black mb-6">Your Final Score: {score}/{countriesData.length}</p>
            <button
              onClick={() => onFinish(score)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mb-4"
            >
              Finish
            </button>
            <button
              onClick={() => handleRetry()}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 mx-2"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MultipleChoiceQuiz;
