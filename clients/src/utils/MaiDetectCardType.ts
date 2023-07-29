/**
 * Check type of debit card and check is correct.
 * VisaCard begin <-4 following 0 to 9 until sixth number and more
 * MasterCard begin <-5 following 1 to 5,0 to 9 until fifth number and more
 * AmericanCard begin <-3 following 4,7 and 0 to 9 until fifth number and more
 * @param {string} cardNumber number VisaCard,MasterCard and AmericanCard
 * @returns {string}
 */
const MaiDetectCardType = (cardNumber: string):string => {
  const regExpVisa = new RegExp(/^4[0-9]{6,}$/g);
  const regExpMaster = new RegExp(/^5[1-5][0-9]{5,}$/g);
  const regExpExpress = new RegExp(/^3[47][0-9]{5,}$/g);
  if (regExpVisa.test(cardNumber)) {
    return "visa";
  }
  if (regExpMaster.test(cardNumber)) {
    return "master";
  }
  if (regExpExpress.test(cardNumber)) {
    return "express";
  }

  return "not correct";
};

export default MaiDetectCardType;