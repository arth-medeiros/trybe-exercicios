require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  const argument = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  it('Verifica se fetchProducts é uma função,', () => {
    const testResult = typeof fetchProducts;
    expect(testResult).toBe('function');
  });

  it('Verifica se ao executar fetchProducts com o argumento computador se a função fetch é chamada,', 
    async () => {
      await fetchProducts(argument);
      expect(fetch).toBeCalled();
  });

  it('Verifica se ao executar fetchProducts com o argumento computador se a função fetch utiliza a \
url correta,', async () => {
    const testResult = await fetchProducts(argument);
    expect(fetch).toHaveBeenCalledWith(argument);
  });

  it(`Verifica se o retorno de fetchProducts com o argumento computador é o esperado,`, async () => {
    const testResult = await fetchProducts(argument);
    expect(testResult).toEqual(computadorSearch);
  });

  it('Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: \
  - You must provide an url -.', async () => {
    const testResult = await fetchProducts();
    expect(testResult).toEqual(new Error('You must provide an url'));
  });
});
