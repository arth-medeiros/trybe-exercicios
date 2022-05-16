let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let smallestValue = 0;

for (let index = 0; index < numbers.length; index += 1) {
  if (index === 0) {
    smallestValue = numbers[index];
  }
  else if (smallestValue > numbers[index]) {
    smallestValue = numbers[index];
  }
}

console.log("O menor valor do array é: " + smallestValue);