import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import currenciesFetch from '../services/currencyAPI';
import { fetchPrice, receiveCurrencies, receiveEditedExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expCount: 0,
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const currenciesArr = Object.keys(await currenciesFetch());
    const filteredCurrencies = currenciesArr.filter((e) => e !== 'USDT');
    dispatch(receiveCurrencies(filteredCurrencies));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  addExpense = () => {
    const {
      value,
      description,
      currency,
      method,
      tag,
      expCount,
    } = this.state;
    const argsObj = {
      value,
      description,
      currency,
      method,
      tag,
      expCount,
    };
    const { dispatch } = this.props;
    dispatch(fetchPrice(argsObj));
    this.setState({
      value: '',
      description: '',
      expCount: expCount + 1,
    });
  };

  submitEditedChanges = () => {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const { idToEdit, dispatch, expenses } = this.props;
    const newExpenses = [...expenses];
    let selectedIndex = 0;
    for (let index = 0; index < expenses.length; index += 1) {
      if (expenses[index].id === idToEdit) {
        selectedIndex = index;
      }
    }
    newExpenses[selectedIndex] = {
      ...newExpenses[selectedIndex],
      value,
      description,
      currency,
      method,
      tag,
    };
    dispatch(receiveEditedExpense(newExpenses));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { currencies, isFetching, isEditing } = this.props;

    if (isFetching) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              id="value"
              name="value"
              value={ value }
              type="text"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              name="description"
              value={ description }
              type="text"
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Câmbio:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              {
                currencies.map((e, i) => (
                  <option key={ i } value={ e }>{ e }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Pagamento:
            <select
              name="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          { isEditing
            ? (
              <button
                type="button"
                onClick={ this.submitEditedChanges }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ this.addExpense }
              >
                Adicionar Despesa
              </button>
            )}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  editor: globalState.wallet.editor,
  isEditing: globalState.wallet.isEditing,
  idToEdit: globalState.wallet.idToEdit,
  isFetching: globalState.wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
