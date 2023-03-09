import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import ProductCard from './ProductCard';

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      termoDigitado: '',
      produtosPesquisados: {},
      PrimeiraPesquisa: true,
    };
  }

  async componentDidMount() {
    this.setState({
      categories: await getCategories(),
    });
  }

  getProducts = async () => {
    const { termoDigitado } = this.state;

    const produtosPesquisados = await
    getProductsFromCategoryAndQuery(undefined, termoDigitado);
    this.setState({ produtosPesquisados: produtosPesquisados.results }, () => {
      this.setState({ PrimeiraPesquisa: false });
    });
  };

  getProductsByCategory = async (key) => {
    const produtosPesquisados = await
    getProductsFromCategoryAndQuery(key, undefined);
    this.setState({ produtosPesquisados: produtosPesquisados.results }, () => {
      this.setState({ PrimeiraPesquisa: false });
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value });
  };

  render() {
    const { categories, produtosPesquisados, PrimeiraPesquisa } = this.state;
    const { cart, addCart } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={ this.handleChange }
            data-testid="query-input"
            name="termoDigitado"
          />
          <button
            type="submit"
            onClick={ this.getProducts }
            data-testid="query-button"
          >
            Pesquisar

          </button>
        </form>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <ul>
          {categories.map((category) => (
            <li key={ category.id }>
              <Button infos={ category } func={ this.getProductsByCategory } />
            </li>
          ))}
        </ul>
        {
          PrimeiraPesquisa
            && (
              <h2 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h2>
            )
        }
        { produtosPesquisados.length === 0
          ? (
            <h2>
              Nenhum produto foi encontrado
            </h2>
          )
          : Object.values(produtosPesquisados).map((produto) => (
            <ProductCard
              Product={ produto }
              key={ produto.id }
              cart={ cart }
              addCart={ addCart }
            />
          ))}

      </div>
    );
  }
}

ProductList.propTypes = {
  cart: PropTypes.arrayOf().isRequired,
  addCart: PropTypes.func.isRequired,
};
export default ProductList;
