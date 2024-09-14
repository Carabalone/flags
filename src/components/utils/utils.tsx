export const showFlag = (country: any, height = 80) => {
  const baseURL = `https://flagcdn.com/h${height}/${country.code.toLowerCase()}.png`;
  return (
    <img
      src={baseURL}
      srcSet={`${baseURL} 1x, https://flagcdn.com/h${height * 2}/${country.code.toLowerCase()}.png 2x,
        https://flagcdn.com/h${height * 3}/${country.code.toLowerCase()}.png 3x`}
      height={height}
      alt={country.name}
      className="mb-6 shadow-lg"
    />
  );
};

export const shuffleArray = (array: any[]) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};
export default { showFlag, shuffleArray };

