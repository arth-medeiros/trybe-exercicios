const saveCartItems = (key, val) => {
  localStorage.setItem(key, val);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
