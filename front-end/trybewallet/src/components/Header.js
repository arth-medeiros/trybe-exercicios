import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  sumAllExpenses = () => {
    const { expenses } = this.props;
    const excValues = expenses.map((e) => (
      (Number(e.value) * e.exchangeRates[e.currency].ask)
    ));
    let sum = 0;
    for (let i = 0; i < excValues.length; i += 1) {
      sum += excValues[i];
    }
    return sum.toFixed(2);
  };

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h2 data-testid="email-field">
          {`Email: ${email}`}
        </h2>
        <h2>Despesas Totais:</h2>
        <h2 data-testid="total-field">
          { expenses.length > 0 ? this.sumAllExpenses() : 0.00.toFixed(2) }
        </h2>
        <h2 data-testid="header-currency-field">
          BRL
        </h2>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
