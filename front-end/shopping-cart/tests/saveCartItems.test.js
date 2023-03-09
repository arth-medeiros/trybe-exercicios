const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('ao executar saveCartItems com um cartItem como argumento, o método \
localStorage.setItem é chamado', () => {
  const key = 'cartItems';
  const val = 'somehtml';
  saveCartItems(key, val);
  expect(localStorage.setItem).toBeCalled();
})
it('ao executar saveCartItems com um cartItem como argumento, o método \
localStorage.setItem é chamado', () => {
  const key = 'cartItems';
  const val = 'somehtml';
  saveCartItems(key, val);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    'cartItems',
    'somehtml'
  );
})
});
