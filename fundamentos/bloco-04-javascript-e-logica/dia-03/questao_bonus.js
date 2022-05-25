let n = 10;

if (n > 1) {
// Quadrado
// for (let i = 0; i < n; i += 1) {
//   let line = [];
//   for (let x = 0; x < n; x += 1){
//     line.push("*");
//   }
//   console.log(line.join(""));
// }

//Triângulo
let counter = 1;
for (let i = 0; i < n; i += 1) {
  let line = [];
  for (let x = 0; x < counter; x += 1) {
    line.push("*");
  }
  console.log(line.join(""));
  counter += 1;
}

}

else {
  console.log("Número inválido!")
}