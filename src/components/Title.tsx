import DailyFlag from './DailyFlag.tsx';

const Title: React.FC = () => {
  return (
    <h1 className="text-3xl text-black font-bold mb-8">
      Flags <DailyFlag />
    </h1>
  );
};

export default Title;
