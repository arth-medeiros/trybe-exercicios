const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('verifica se a função retorna undefined ao não receber nenhum parametro', () => {
    const result = handlerElephants();
    const expected = undefined;
    expect(result).toEqual(expected);
  });

  it('verifica se ao receber um parâmetro que não é uma string a função retorna uma mensagem de erro', () => {
    const result = handlerElephants(123);
    const expected = 'Parâmetro inválido, é necessário uma string';
    expect(result).toEqual(expected);
  });

  it('verifica se ao receber count como parâmetro, a função retorna o valor correto', () => {
    const result = handlerElephants('count');
    const expected = 4;
    expect(result).toEqual(expected);
  });

  it('verifica se ao receber names como parâmetro, a função retorna um array que inclui o nome Jefferson', () => {
    const result = handlerElephants('names');
    expect(result).toContain('Jefferson');
  });

  it('verifica se ao receber averageAge como parâmetro, a função retorna um número próximo a 10.5', () => {
    const result = handlerElephants('averageAge');
    expect(result).toBeCloseTo(10.5);
  });

  it('verifica se ao receber location como parâmetro, a função retorna uma string contendo NW', () => {
    const result = handlerElephants('location');
    const expected = 'NW';
    expect(result).toEqual(expected);
  });
});
