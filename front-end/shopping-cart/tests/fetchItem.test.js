require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');
const argument = 'MLB1615760527';

describe('2 - Teste a função fetchItem', () => {
  it('Verifica se fetchItem é uma função,', () => {
    const testResult = typeof fetchItem;
    expect(testResult).toBe('function');
  });

  it('Verifica se ao executar fetchItem com o argumento MLB1615760527 se a função \
fetch é chamada,', async () => {
    await fetchItem(argument);
    expect(fetch).toBeCalled();
  });

  it('Verifica se ao executar fetchItem com o argumento MLB1615760527 se a função \
fetch utiliza a url correta,', async () => {
      const testResult = await fetchItem(argument);
      expect(fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/items/${argument}`);
    });

  it(`Verifica se o retorno de fetchItem com o argumento MLB1615760527 é o esperado,`, 
async () => {
    const testResult = await fetchItem(argument);
    expect(testResult).toEqual(item);
  });

  it('Verifica se ao chamar a função fetchItem sem argumento, retorna um erro com a \
mensagem: - You must provide an url -.', async () => {
    const testResult = await fetchItem();
    expect(testResult).toEqual(new Error('You must provide an url'));
  });
});
