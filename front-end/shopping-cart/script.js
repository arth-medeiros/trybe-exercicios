// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!!

// const getSavedCartItems = require("./helpers/getSavedCartItems");

// const saveCartItems = require("./helpers/saveCartItems");

// const { fetchItem } = require("./helpers/fetchItem");

// const { fetchProducts } = require("./helpers/fetchProducts");

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

const cartParent = document.querySelector('.cart__items');
const priceElement = document.querySelector('.total-price');

const saveItems = () => {
  saveCartItems('cartItems', cartParent.innerHTML);
};

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

const add = (product, currPrice) =>
parseFloat(product.getAttribute('price')) + parseFloat(currPrice);

const subtract = (product, currPrice) =>
parseFloat(product.getAttribute('price')) - parseFloat(currPrice);

const checkIfValid = () => {
  if (localStorage.getItem('totalPrice')) {
    return localStorage.getItem('totalPrice');
  }
  return 0;
};

const updateTotalPrice = (product, operation) => {
  const currPrice = checkIfValid();
  const totalPrice = Math.abs(operation(product, currPrice));
  const finalPrice = totalPrice.toString();
  if (finalPrice.includes('.')) {
    const splitPrice = finalPrice.split('.');
    if (splitPrice[1].length === 1) {
      priceElement.innerText = `Total Price: R$${splitPrice[0]}.${splitPrice[1]}0`;
      localStorage.setItem('totalPrice', `${splitPrice[0]}.${splitPrice[1]}0`);
    } else if (splitPrice[1].length >= 2) {
      const newArr = splitPrice[1].slice(0, 2);
      priceElement.innerText = `Total Price: R$${splitPrice[0]}.${newArr}`;
      localStorage.setItem('totalPrice', `${splitPrice[0]}.${newArr}`);
    }
  } else {
    priceElement.innerText = `Total Price: R$${finalPrice}.00`;
    localStorage.setItem('totalPrice', `${finalPrice}.00`);
  }
};

const cartItemClickListener = (e) => {
  updateTotalPrice(e, subtract);
  e.remove();
  saveItems();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.setAttribute('price', price);
  li.addEventListener('click', (e) => {
    cartItemClickListener(e.target);
  });
  return li;
};

const addToCart = async (targetProduct) => {
  const itemObj = await fetchItem(targetProduct);
  const item = createCartItemElement(itemObj);
  cartParent.appendChild(item);
  updateTotalPrice(item, add);
};

const retrieveCart = () => {
  const savedItems = getSavedCartItems();
  cartParent.innerHTML = savedItems;
  const retrieved = cartParent.children;
  for (let i = 0; i < retrieved.length; i += 1) {
    retrieved[i].addEventListener('click', (e) => {
      cartItemClickListener(e.target);
    });
  }
};

const retrieveTotalPrice = () => {
  if (!localStorage.getItem('totalPrice')) {
    localStorage.setItem('totalPrice', 0);
  } else {
    priceElement.innerText = `Total Price: R$${localStorage.getItem('totalPrice')}`;
  }
};

const emptyCart = () => {
  const retrieved = cartParent.children;
  const lenght = retrieved.length;
  for (let i = 0; i < lenght; i += 1) {
    retrieved[0].remove();
  }
  localStorage.setItem('totalPrice', '0.00');
  priceElement.innerText = `Total Price: R$${localStorage.getItem('totalPrice')}`;
  saveItems();
};

window.onload = async () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  const { results } = await fetchProducts(url);
  results.forEach((product) => {
    document.querySelector('.items').appendChild(createProductItemElement(product));
  });
  const buttonList = document.querySelectorAll('.item__add');
  buttonList.forEach((button) => {
    button.addEventListener('click', async (e) => {
      await addToCart(getIdFromProductItem(e.target.parentElement));
      saveItems();
    });
  });
  document.querySelector('.empty-cart').addEventListener('click', () => {
    emptyCart();
  });
  retrieveCart();
  retrieveTotalPrice();
};
