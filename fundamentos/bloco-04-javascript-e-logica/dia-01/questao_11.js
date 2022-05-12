const salarioBruto = 3000;
let salarioBase;
let salarioLiquido;

// inss
if (salarioBruto <= 1556.94) {
  salarioBase = salarioBruto - salarioBruto * 0.08;
  //console.log("Salario base: " + salarioBase + "R$");
}
else if (salarioBruto >= 1556.95 && salarioBruto < 2594.92) {
  salarioBase = salarioBruto - salarioBruto * 0.09;
  //console.log("Salario base: " + salarioBase + "R$");
}
else if (salarioBruto >= 2594.93 && salarioBruto < 5189.82) {
  salarioBase = salarioBruto - salarioBruto * 0.11;
  //console.log("Salario base: " + salarioBase + "R$");
}
else {
  if (salarioBruto - salarioBruto * 0.11 > 570.88) {
    salarioBase = salarioBruto - 570.88;
    //console.log("Salario base: " + salarioBase + "R$");
  }
  else {
  salarioBase = salarioBruto - salarioBruto * 0.11;
  //console.log("Salario base: " + salarioBase + "R$");
  }
}

// ir
if (salarioBase <= 1903.98) {
  salarioLiquido = salarioBase;
  console.log("Salário líquido: " + salarioLiquido + "R$")
}
else if (salarioBase >= 1903.99 && salarioBase < 2826.65) {
  salarioLiquido = salarioBase - ((salarioBase * 0.075) - 142.8);
  console.log("Salário líquido: " + salarioLiquido + "R$")
}
else if (salarioBase >= 2826.66 && salarioBase < 3751.05) {
  salarioLiquido = salarioBase - ((salarioBase * 0.15) - 354.8);
  console.log("Salário líquido: " + salarioLiquido + "R$")
}
else if (salarioBase >= 3751.06 && salarioBase < 4664.68) {
  salarioLiquido = salarioBase - ((salarioBase * 0.225) - 636.13);
  console.log("Salário líquido: " + salarioLiquido + "R$")
}
else {
  salarioLiquido = salarioBase - ((salarioBase * 0.275) - 869.36);
  console.log("Salário líquido: " + salarioLiquido + "R$")
}