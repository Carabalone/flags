import React, { useState } from 'react';
import HomeMenu from './components/HomeMenu';
import ZeroNRunMenuAlt from './components/ZeroNRunMenuAlt';
import FlagQuiz from './components/FlagQuiz';

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<'home' | '0-n-menu' | 'quiz'>(
    'home'
  );
  const [n, setN] = useState(10);
  const [quizMode, setQuizMode] = useState<'normal' | 'hardcore'>('normal');

  const handleSelectMode = (mode: '0-n' | 'full' | 'hardcore') => {
    if (mode === '0-n') {
      setGameMode('0-n-menu');
    } else if (mode === 'full') {
      setN(254);
      setQuizMode('normal');
      setGameMode('quiz');
    } else if (mode === 'hardcore') {
      setN(254);
      setQuizMode('hardcore');
      setGameMode('quiz');
    }
  };

  const startGame = (selectedN: number) => {
    setN(selectedN);
    setQuizMode('normal');
    setGameMode('quiz');
  };

  const finishGame = () => {
    setGameMode('home');
  };

  return (
    <div className="w-screen h-screen overflow-hidden">
      {gameMode === 'home' && <HomeMenu onSelectMode={handleSelectMode} />}
      {gameMode === '0-n-menu' && (
        <ZeroNRunMenuAlt
          onStart={startGame}
          onHome={() => setGameMode('home')}
        />
      )}
      {gameMode === 'quiz' && (
        <FlagQuiz n={n} onFinish={finishGame} mode={quizMode} />
      )}
    </div>
  );
};

export default App;
