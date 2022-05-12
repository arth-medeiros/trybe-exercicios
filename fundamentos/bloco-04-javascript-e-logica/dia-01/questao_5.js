// constante
const angulo1 = 40;
const angulo2 = 105;
const angulo3 = 35;

if (angulo1 < 0 || angulo2 < 0 || angulo3 < 0) {
  console.log("Erro: valores inválidos")
}
else {
  console.log(angulo1 + angulo2 + angulo3 === 180)
}