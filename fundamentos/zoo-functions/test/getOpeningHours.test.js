const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('verifica se ao não receber nenhum parâmetro a função retorna uma lista com todos horários da semana', () => {
    const testResult = getOpeningHours();
    const expected = {
      Tuesday: { open: 8, close: 6 },
      Wednesday: { open: 8, close: 6 },
      Thursday: { open: 10, close: 8 },
      Friday: { open: 10, close: 8 },
      Saturday: { open: 8, close: 10 },
      Sunday: { open: 8, close: 8 },
      Monday: { open: 0, close: 0 },
    };
    expect(testResult).toEqual(expected);
  });
  it('verifica se a receber monday e 9:00-AM como parametros retorna the zoo is closed', () => {
    const testResult = getOpeningHours('Monday', '09:00-AM');
    const expected = 'The zoo is closed';
    expect(testResult).toEqual(expected);
  });
  it('verifica se a receber tuesday e 9:00-AM como parametros retorna the zoo is open', () => {
    const testResult = getOpeningHours('Tuesday', '09:00-AM');
    const expected = 'The zoo is open';
    expect(testResult).toEqual(expected);
  });
  it('verifica se a receber wednesday e 9:00-PM como parametros retorna the zoo is closed', () => {
    const testResult = getOpeningHours('Wednesday', '09:00-PM');
    const expected = 'The zoo is closed';
    expect(testResult).toEqual(expected);
  });
  it('verifica se a receber um horário inválido exibe uma mensagem de erro', () => {
    expect(() => {
      getOpeningHours('Wednesday', '27:00-PM');
    }).toThrow();
    expect(() => {
      getOpeningHours('Wednesday', '09:90-PM');
    }).toThrow();
  });
  it('verifica se a receber um horário com abreviação inválida exibe uma mensagem de erro', () => {
    expect(() => {
      getOpeningHours('Wednesday', '07:00-XM');
    }).toThrow();
  });
  it('verifica se a receber um dia inválido exibe uma mensagem de erro', () => {
    expect(() => {
      getOpeningHours('Sexta', '07:00-AM');
    }).toThrow();
  });
});
