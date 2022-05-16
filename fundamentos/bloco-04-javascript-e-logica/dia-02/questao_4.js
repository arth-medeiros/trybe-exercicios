let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let sum = 0;
let result = 0;

for (index = 0; index < numbers.length; index += 1) {
  sum += numbers[index];
}

result = sum / numbers.length;

if (result > 20) {
  console.log("Valor maior que 20.");
}
else {
  console.log("Valor menor ou igual a 20.");
}