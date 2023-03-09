import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  newUser = async () => {
    const { nameInput, history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: nameInput });
    this.setState({
      loading: false,
    });
    history.push('/search');
  };

  valBtn = () => {
    const { nameInput } = this.props;
    const minLength = 3;
    return (nameInput.length < minLength);
  };

  render() {
    const { loading } = this.state;
    const { onInputChange } = this.props;
    if (loading) {
      return (
        <Loading />
      );
    }
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <input
            name="name"
            type="text"
            data-testid="login-name-input"
            onChange={ onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ this.valBtn() }
            onClick={ this.newUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  nameInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(Login);
