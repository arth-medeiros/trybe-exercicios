let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let multipliedNumbers = [];


// Ordem Crescente

// for (let index = 1; index < numbers.length; index += 1) {
//   for (let secondIndex = 0; secondIndex < index; secondIndex += 1) {
//     console.log("Index: " + index + " Second Index: " + secondIndex);
//     if (numbers[secondIndex] > numbers[index]) {
//       let valueContainer = numbers[secondIndex];
//       numbers[secondIndex] = numbers[index];
//       numbers[index] = valueContainer;
//     }
//   }
// }

// Ordem Decrescente

// for (let index = 1; index < numbers.length; index += 1) {
//   for (let secondIndex = 0; secondIndex < index; secondIndex += 1) {
//     if (numbers[secondIndex] < numbers[index]) {
//       let valueContainer = numbers[secondIndex];
//       numbers[secondIndex] = numbers[index];
//       numbers[index] = valueContainer;
//     }
//   }
// }


// Novo array com os valores multiplicados, sem alterar o antigo.

for (let index = 0; index < numbers.length; index += 1) {
  let nextNumber = index + 1;
  if (numbers[nextNumber] === undefined) {
    let num = 0;
    num = numbers[index] * 2;
    multipliedNumbers.push(num);
  }
  else {
    let num = 0;
    num = numbers[index] * numbers[nextNumber];
    multipliedNumbers.push(num);
  }
}

for (let index of multipliedNumbers) {
  console.log(index);
}