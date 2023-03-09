export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const response = await fetch(url);
  const categorias = await response.json();
  return categorias;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url;
  if (categoryId === undefined && query !== undefined) {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  } if (categoryId !== undefined && query === undefined) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } if (categoryId !== undefined && query !== undefined) {
    url = ` https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  }
  const response = await fetch(url);
  const categorias = await response.json();
  return categorias;
}

export async function getProductById(PRODUCT_ID) {
  const url = ` https://api.mercadolibre.com/items/${PRODUCT_ID}`;
  const response = await fetch(url);
  const produto = await response.json();
  return produto;
}
