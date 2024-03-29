import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense, removeExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => (
      expense.id !== Number(target.id)
    ));
    dispatch(removeExpense(newExpenses));
  };

  editingModeStart = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(editExpense(Number(target.id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>
                { expense.description }
              </td>
              <td>
                { expense.tag }
              </td>
              <td>
                { expense.method }
              </td>
              <td>
                { Number(expense.value).toFixed(2) }
              </td>
              <td>
                { expense.exchangeRates[expense.currency].name }
              </td>
              <td>
                { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
              </td>
              <td>
                {
                  (
                    expense.exchangeRates[expense.currency].ask * expense.value
                  ).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  id={ expense.id }
                  onClick={ this.editingModeStart }
                  data-testid="edit-btn"
                >
                  Editar
                </button>
                <button
                  type="button"
                  id={ expense.id }
                  onClick={ this.deleteExpense }
                  data-testid="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
