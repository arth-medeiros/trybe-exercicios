let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let biggestValue = 0;

// Opção 1:

// for (let index = 0; index < numbers.length; index += 1) {
//   if (biggestValue < numbers[index]) {
//     biggestValue = numbers[index];
//   }
// }

// Opção 2:

for (let index of numbers) {
  if (biggestValue < index) {
    biggestValue = index;
  }
}

console.log("O maior valor do array é: " + biggestValue);