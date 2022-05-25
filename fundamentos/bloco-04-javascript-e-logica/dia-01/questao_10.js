const custo = 60;
const valorVenda = 160;
let custoTotal;
let lucro;

if (custo <= 0 || valorVenda <= 0) {
  console.log("Erro: valores inválidos.")
}
else {
  console.log("O lucro de mil vendas deste produto é de: " + (valorVenda - (custo + (custo * 0.2))) * 1000)
  // custoTotal = custo + (custo * 0.2);
  // lucro = valorVenda - custoTotal;
  // console.log("O lucro de mil vendas deste produto é de: " + lucro * 1000);
}