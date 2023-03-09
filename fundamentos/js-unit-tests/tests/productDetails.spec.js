const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails 
  está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  // Teste se productDetails é uma função.
  it('ProductDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function');
  });
  // Teste se o retorno da função é um array.
  it('Retorno da função é um array.', () => {
    expect(Array.isArray(productDetails('Alcool gel', 'Máscara'))).toBe(true);
  });
  // Teste se o array retornado pela função contém dois itens dentro.
  it('Array retornado contém dois itens.', () => {
    expect(productDetails('Alcool gel', 'Máscara')).toHaveLength(2);
  });
  // Teste se os dois itens dentro do array retornado pela função são objetos.
  it('Os dois itens retornados são objetos.', () => {
    const functResult = productDetails('Alcool gel', 'Máscara');
    expect(typeof functResult[0]).toBe('object');
    expect(typeof functResult[1]).toBe('object');
  });
  // Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes 
  //entre si.
  it('Quando parâmetros diferentes entre si são passados, os dois objetos também são diferentes.', () => {
    const functResult = productDetails('Alcool gel', 'Máscara');
    expect(functResult[0]).not.toMatchObject(functResult[1]);
  });
  // Teste se os dois productIds terminam com 123.
  it('Os dois productIds terminam com 123.', () => {
    const functResult = productDetails('Alcool gel', 'Máscara');
    const firstObj = functResult[0].details;
    const firstValue = firstObj.productId;
    const secondObj = functResult[1].details;
    const secondValue = secondObj.productId;
    expect(firstValue).toBe('Alcool gel123');
    expect(secondValue).toBe('Máscara123');
  });
});
