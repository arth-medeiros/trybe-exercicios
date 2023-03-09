const fetchProducts = async (url) => {
  try {
    const request = await fetch(url);
    const json = await request.json();
    return json;
  } catch (err) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
