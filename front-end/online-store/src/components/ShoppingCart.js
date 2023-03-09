import React from 'react';
import PropTypes from 'prop-types';
import CartItems from './CartItem';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      carrinhovazio: true,
    };
  }

  componentDidMount() {
    const { Items } = this.props;
    let NumeroDeProdutos = 0;
    Items.forEach((item) => {
      NumeroDeProdutos += item.quantidade;
    });
    if (NumeroDeProdutos === 0) {
      this.setState({ carrinhovazio: true });
    } else {
      this.setState({ carrinhovazio: false });
    }
  }

  render() {
    const { Items,
      removeItem,
      diminuiQuantidade,
      aumentaQuantidade } = this.props;
    const { carrinhovazio } = this.state;
    return (
      <div>
        { carrinhovazio
          ? (
            <h3 data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </h3>
          )
          : Items.map((item) => (
            <CartItems
              key={ item.id }
              item={ item }
              removeItem={ removeItem }
              diminuiQuantidade={ diminuiQuantidade }
              aumentaQuantidade={ aumentaQuantidade }
            />
          ))}
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  Items: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
  }).isRequired,
  removeItem: PropTypes.func.isRequired,
  aumentaQuantidade: PropTypes.func.isRequired,
  diminuiQuantidade: PropTypes.func.isRequired,
};
export default ShoppingCart;
