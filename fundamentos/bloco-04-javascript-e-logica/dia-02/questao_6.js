let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let oddCount = 0;

for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] % 2 != 0) {
    oddCount += 1;
  }
}

if (oddCount != 0) {
  console.log("O array possui " + oddCount + " números ímpares.");
}
else {
  console.log("O array não possui números ímpares.");
}