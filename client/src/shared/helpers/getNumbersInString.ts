export const getNumbersInString = (word: string) => {
  const regex = /\d+/g;
  const numbers = word.match(regex);
  return numbers;
};
