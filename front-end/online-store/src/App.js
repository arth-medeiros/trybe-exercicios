import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      keys: Object.keys(localStorage),
    };
  }

  getCartFromLocal = () => {
    const { keys } = this.state;
    keys.forEach((key) => {
      const recoveredObject = JSON.parse(localStorage.getItem(key));
      this.setState((prev) => ({
        cart: [...prev.cart, recoveredObject],
      }));
    });
  };

  removeItem = (event) => {
    const { cart } = this.state;
    const Duplicart = cart;
    const removeId = event.target.id;
    Duplicart.forEach((element, index, arr) => {
      if (removeId
         === element.id) {
        arr.splice(index, 1);
      }
    });
    this.setState({ cart: Duplicart });
    localStorage.removeItem(removeId);
  };

  diminuiQuantidade = (event) => {
    const { cart } = this.state;
    const Duplicart = cart;
    Duplicart.forEach((element) => {
      if (event.target.id === element.id && element.quantidade !== 1) {
        element.quantidade -= 1;
      }
    });
    this.setState({ cart: Duplicart });
  };

  aumentaQuantidade = (event) => {
    const { cart } = this.state;
    const Duplicart = cart;
    Duplicart.forEach((element) => {
      if (event.target.id === element.id) {
        element.quantidade += 1;
      }
    });
    this.setState({ cart: Duplicart });
  };

  addCart = (id) => {
    const recoveredObject = JSON.parse(localStorage.getItem(id));
    this.setState((prev) => ({
      cart: [...prev.cart, recoveredObject],
    }));
  };

  render() {
    const { cart, keys } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          {keys.length !== 0 && cart.length === 0 ? this.getCartFromLocal()
            : (
              <Route
                path="/cart"
                render={ () => (<ShoppingCart
                  Items={ cart }
                  removeItem={ this.removeItem }
                  diminuiQuantidade={ this.diminuiQuantidade }
                  aumentaQuantidade={ this.aumentaQuantidade }
                />) }
              />
            )}
          <Route
            exact
            path="/"
            render={ () => (
              <ProductList
                cart={ cart }
                addCart={ this.addCart }
              />
            ) }
          />
          <Route
            path="/details/:id"
            render={ (props) => (
              <ProductDetails
                addCart={ this.addCart }
                { ...props }
              />) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
