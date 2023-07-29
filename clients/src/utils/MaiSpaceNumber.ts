/**
 * 
 * @param {string|number}text is a number or string to format 
 * @param {number}numberCharacter spaced number character 
 * @param {string}betweenCharacter separate character example: space,dash and so one
 * @returns {string} format string
 */
const MaiSpaceNumber = (
  text: string|number,
  numberCharacter = 4,
  betweenCharacter = " "
): string => {
  let newText = "";
  const textTransform=typeof text==="number"?`${text}`:text;
  for (let i = 0; i < textTransform.length; i++) {
    if (i !== 0 && i % numberCharacter === 0) {
      newText += `${betweenCharacter}${textTransform[i]}`;
    } else {
      newText += textTransform[i];
    }
  }
  return newText;
};

export default MaiSpaceNumber;
