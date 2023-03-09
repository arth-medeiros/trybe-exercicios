import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction, requestCurrencies } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      em: '',
      pw: '',
      isDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validator());
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { em } = this.state;
    dispatch(loginAction(em));
    dispatch(requestCurrencies());
    history.push('/carteira');
  };

  validator = () => {
    const { em, pw } = this.state;
    let isEmailValid = false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (em.match(regex)) {
      isEmailValid = true;
    } else {
      isEmailValid = false;
    }

    const minLength = 6;
    const isPasswordValid = pw.length >= minLength;

    if (isEmailValid && isPasswordValid) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  render() {
    const { em, pw, isDisabled } = this.state;
    return (
      <div>
        <h3>Login: </h3>
        <form>
          <label htmlFor="em">
            Email:
            <input
              type="email"
              name="em"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ em }
              placeholder="Digite seu email"
            />
          </label>
          <label htmlFor="pw">
            Senha:
            <input
              type="password"
              name="pw"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ pw }
              placeholder="Digite sua senha"
            />
          </label>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
