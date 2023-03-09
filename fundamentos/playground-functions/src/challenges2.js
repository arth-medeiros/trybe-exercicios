// Desafio 11
function numArraySplitter(numArray) {
  let telNumber = {
    ddd: 0,
    firstP: 0,
    secondP: 0,
  };
  let temp = numArray.toString();
  let stringArray = temp.split(',');
  telNumber.ddd = stringArray.slice(0, 2).join('');
  telNumber.firstP = stringArray.slice(2, 7).join('');
  telNumber.secondP = stringArray.slice(7, 11).join('');
  return telNumber;
}
function isLowerThanZero(numArray, i) {
  if (numArray[i] < 0) {
    return true;
  }
}

function isBiggerThanNine(numArray, i) {
  if (numArray[i] > 9) {
    return true;
  }
}
function moreThanThree(i, numArray) {
  let repetCount = 0;
  for (let x = 0; x < numArray.length; x += 1) {
    if (numArray[i] === numArray[x]) {
      repetCount += 1;
    }
  }
  if (repetCount >= 3) {
    return true;
  }
}
function isValid(numArray) {
  for (let i = 0; i < numArray.length; i += 1) {
    if (isLowerThanZero(numArray, i) || isBiggerThanNine(numArray, i)
    || moreThanThree(i, numArray)) {
      return false;
    }
  }
  return true;
}

function generatePhoneNumber(numArray) {
  if (numArray.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  let valid = isValid(numArray);
  if (valid) {
    let telNum = numArraySplitter(numArray);
    let joinedNumber = `(${telNum.ddd}) ${telNum.firstP}-${telNum.secondP}`;
    return joinedNumber;
  }
  return 'não é possível gerar um número de telefone com esses valores';
}

// Desafio 12
function triangleCheck() {
  // seu código aqui
}

// Desafio 13
function hydrate() {
  // seu código aqui
}

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
