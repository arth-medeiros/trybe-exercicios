import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      price: '',
      thumbnail: '',
      id: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const { title, price, thumbnail } = await getProductById(id);
    this.setState({
      title,
      price,
      thumbnail,
      id,
    });
  };

  addToLocal = () => {
    const { match } = this.props;
    const { id } = match.params;
    const { addCart } = this.props;
    const { price, title } = this.state;
    const obj = {
      title,
      price,
      id,
      quantidade: 1,
    };
    localStorage.setItem(`${id}`, JSON.stringify(obj));
    addCart(id);
  };

  render() {
    const { title, price, thumbnail, id } = this.state;
    return (
      <div id="details-container">
        <h2 data-testid="product-detail-name">{title}</h2>
        <h2 data-testid="product-detail-price">{price}</h2>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <img
          data-testid="product-detail-image"
          alt={ title }
          src={ thumbnail }
        />
        <div id="specs-container">
          <h3>Especificações do Produto</h3>
          <ul>
            <li>Especificação 1</li>
            <li>Especificação 2</li>
            <li>Especificação 3</li>
          </ul>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.addToLocal }
          id={ id }
          title={ title }
          price={ price }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addCart: PropTypes.func.isRequired,
};

export default ProductDetails;
