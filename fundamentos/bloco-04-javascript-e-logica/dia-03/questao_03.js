let array = ['java', 'javascript', 'python', 'html', 'css'];
let biggestWord;
let biggestWordCharCount = 0;
let smallestWord;
let smallestWordCharCount = 99;

for (let index = 0; index < array.length; index += 1) {
  let charCount = 1;
  for (let secondIndex = 0; secondIndex < array[index].length; secondIndex += 1) {
    charCount += secondIndex;
  }
  if (charCount > biggestWordCharCount) {
    biggestWordCharCount = charCount;
    biggestWord = array[index];
  }
}

for (let index = 0; index < array.length; index += 1) {
  let charCount = 1;
  for (let secondIndex = 0; secondIndex < array[index].length; secondIndex += 1) {
    charCount += secondIndex;
  }
  if (charCount < smallestWordCharCount) {
    smallestWordCharCount = charCount;
    smallestWord = array[index];
  }
}

console.log("A maior palavra é: " + biggestWord);
console.log("A menor palavra é: " + smallestWord);