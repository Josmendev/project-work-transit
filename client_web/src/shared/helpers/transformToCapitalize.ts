export const transformToCapitalize = (words: string) => {
  const convertToCapitalize = words.split(" ").map((word) => {
    const firstChar = word.charAt(0).toUpperCase();
    const lastWord = word.slice(1).toLowerCase();
    return firstChar + lastWord;
  });

  return convertToCapitalize.join(" ");
};
