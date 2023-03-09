function isFormValid(stateObj) {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
  } = stateObj;

  const maxVal = 90;
  const maxSum = 210;

  const attr1Positive = parseInt(cardAttr1, 10) >= 0;
  const attr2Positive = parseInt(cardAttr2, 10) >= 0;
  const attr3Positive = parseInt(cardAttr3, 10) >= 0;
  const attrSum = parseInt(cardAttr1, 10)
  + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10);
  const isLowerThanMax = attrSum <= maxSum;

  return (
    cardName
    && cardDescription.length > 0
    && cardAttr1.length > 0
    && cardAttr2.length > 0
    && cardAttr3.length > 0
    && cardImage.length > 0
    && cardRare.length > 0
    && attr1Positive
    && parseInt(cardAttr1, 10) <= maxVal
    && attr2Positive
    && parseInt(cardAttr2, 10) <= maxVal
    && attr3Positive
    && parseInt(cardAttr3, 10) <= maxVal
    && isLowerThanMax
  );
}

export default isFormValid;
