// constantes
const a = 33;
const b = 29;
const c = 43;

// retorno
if (a > b && a > c) {
  console.log("O maior número é: " + a);
}
else if (b > a && b > c) {
  console.log("O maior número é: " + b);
}
else if (c > a && c > b) {
  console.log("O maior número é: " + c);
}
else {
  console.log("Os três números são iguais")
}