/**
 * The function checks email if it's correct or no with a regular expression.
 * Return true if correct and false otherwise
 * @param {String}email 
 * @returns {String}
 */
const isValidateEmail = (email: string): boolean => {
  const regExp = new RegExp(/^(\w)+([.-\w*])*@(\w)+(\.){1}(\w){2,3}$/g);
  return regExp.test(email);
};

export default isValidateEmail;
