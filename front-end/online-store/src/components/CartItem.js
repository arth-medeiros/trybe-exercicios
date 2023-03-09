import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  render() {
    const { item: { quantidade, title, id },
      removeItem,
      diminuiQuantidade,
      aumentaQuantidade } = this.props;
    return (
      <>
        <h1 data-testid="shopping-cart-product-name">{title}</h1>
        <form>
          <button
            type="button"
            onClick={ removeItem }
            data-testid="remove-product"
            id={ id }
          >
            Remover Produto

          </button>
          <button
            type="button"
            onClick={ diminuiQuantidade }
            data-testid="product-decrease-quantity"
            id={ id }
          >
            -

          </button>
          <h2 data-testid="shopping-cart-product-quantity">{quantidade}</h2>
          <button
            type="button"
            onClick={ aumentaQuantidade }
            data-testid="product-increase-quantity"
            id={ id }
          >
            +

          </button>

        </form>
      </>
    );
  }
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  aumentaQuantidade: PropTypes.func.isRequired,
  diminuiQuantidade: PropTypes.func.isRequired,
};

export default CartItem;
