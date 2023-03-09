// Desafio 1
function compareTrue(value1, value2) {
  if (value1 && value2) {
    return true;
  }
  return false;
}

// Desafio 2
function calcArea(base, height) {
  return (base * height) / 2;
}

// Desafio 3
function splitSentence(string) {
  return string.split(' ');
}

// Desafio 4
function concatName(stringArray) {
  let first = stringArray[0];
  let last = stringArray[stringArray.length - 1];
  let concat = last.concat(', ', first);
  return concat;
}

// Desafio 5
function footballPoints(wins, ties) {
  let points = wins * 3 + ties;
  return points;
}

// Desafio 6
function findBiggestNum(numArray) {
  let biggestNum = numArray[1];
  for (let i in numArray) {
    if (numArray[i] > biggestNum) {
      biggestNum = numArray[i];
    }
  }
  return biggestNum;
}

function highestCount(numArray) {
  let biggestNum = findBiggestNum(numArray);
  let repetCount = 0;
  for (let i = 0; i < numArray.length; i += 1) {
    if (biggestNum === numArray[i]) {
      repetCount += 1;
    }
  }
  return repetCount;
}

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let cat1Distance = Math.abs(mouse - cat1);
  let cat2Distance = Math.abs(mouse - cat2);
  if (cat1Distance < cat2Distance) {
    return 'cat1';
  }
  if (cat2Distance < cat1Distance) {
    return 'cat2';
  }
  return 'os gatos trombam e o rato foge';
}

// Desafio 8
function fizzBuzzCheck(numArray, i) {
  if (numArray[i] % 3 === 0 && numArray[i] % 5 === 0) {
    return 'fizzBuzz';
  }
  if (numArray[i] % 3 === 0) {
    return 'fizz';
  }
  if (numArray[i] % 5 === 0) {
    return 'buzz';
  }
  return 'bug!';
}

function fizzBuzz(numArray) {
  let string = [];
  for (let i = 0; i < numArray.length; i += 1) {
    string.push(fizzBuzzCheck(numArray, i));
  }
  return string;
}

// Desafio 9
function splitString(string) {
  let splittedString = string.split('');
  return splittedString;
}
function joinString(string) {
  let joinedString = string.join('');
  return joinedString;
}
function changeValuesEncode(cipher, stringArray, i, x) {
  if (stringArray[i] === cipher.decodeCipher[x]) {
    stringArray[i] = cipher.encodeCipher[x];
  }
}
function changeValuesDecode(cipher, stringArray, i, x) {
  if (stringArray[i] === cipher.encodeCipher[x]) {
    stringArray[i] = cipher.decodeCipher[x];
  }
}

function encode(string) {
  let cipher = {
    decodeCipher: ['a', 'e', 'i', 'o', 'u'],
    encodeCipher: ['1', '2', '3', '4', '5'],
  };
  let stringArray = splitString(string);
  for (let i = 0; i < stringArray.length; i += 1) {
    for (let x = 0; x < cipher.encodeCipher.length; x += 1) {
      changeValuesEncode(cipher, stringArray, i, x);
    }
  }
  return joinString(stringArray);
}

function decode(string) {
  let cipher = {
    decodeCipher: ['a', 'e', 'i', 'o', 'u'],
    encodeCipher: ['1', '2', '3', '4', '5'],
  };
  let stringArray = splitString(string);
  for (let i = 0; i < stringArray.length; i += 1) {
    for (let x = 0; x < cipher.encodeCipher.length; x += 1) {
      changeValuesDecode(cipher, stringArray, i, x);
    }
  }
  return joinString(stringArray);
}

// Desafio 10

function techsSort(stringArray) {
  return stringArray.sort();
}

function techList(techs, person) {
  if (techs[0] === undefined) {
    return 'Vazio!';
  }
  let sortedTechs = techsSort(techs);
  let obj = [];
  for (let i = 0; i < techs.length; i += 1) {
    obj.push({ tech: sortedTechs[i] });
    obj[i].name = person;
  }
  return obj;
}

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
