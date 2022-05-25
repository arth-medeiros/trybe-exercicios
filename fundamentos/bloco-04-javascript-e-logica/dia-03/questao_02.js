let word = 'arthur';
let invertedArray = [];

for (let index = word.length - 1; index >= 0; index -= 1) {
  invertedArray.push(word[index]);
}

let invertedWord = invertedArray.join('');

console.log(invertedWord);
