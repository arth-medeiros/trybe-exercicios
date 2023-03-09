import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
  addToLocal = () => {
    const { Product, addCart } = this.props;
    const obj = {
      title: Product.title,
      price: Product.price,
      id: Product.id,
      quantidade: 1,
    };
    localStorage.setItem(`${Product.id}`, JSON.stringify(obj));
    addCart(Product.id);
  };

  render() {
    const { Product } = this.props;
    return (
      <div data-testid="product">
        <h3>{Product.title}</h3>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ this.addToLocal }
          id={ Product.id }
          title={ Product.title }
          price={ Product.price }
        >
          Adicionar ao Carrinho
        </button>
        <Link
          to={ `/details/${Product.id}` }
          data-testid="product-detail-link"
        >
          Detalhes
        </Link>
      </div>
    );
  }
}

ProductCard.propTypes = {
  addCart: PropTypes.func.isRequired,
  Product: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.number,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
