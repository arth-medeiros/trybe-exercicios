import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

const invalidEmail = 'teste.com';
const validEmail = 'teste@teste.com';
const invalidPassword = '123';
const validPassword = '123456';
const emailId = 'email-input';
const passwordId = 'password-input';

describe('Página de login', () => {
  it('Verifica se ao carregar a página, ela contém os inputs corretos.', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });
  it('Verifica se ao carregar a página, o botão de login está inicialmente desabilitado e é habilitado após o preenchimento.', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin).toBeDisabled();

    // Invalid EM and PW
    userEvent.type(inputEmail, invalidEmail);
    userEvent.type(inputPassword, invalidPassword);
    expect(buttonLogin).toBeDisabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);

    // Invalid EM and valid PW
    userEvent.type(inputEmail, invalidEmail);
    userEvent.type(inputPassword, validPassword);
    expect(buttonLogin).toBeDisabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);

    // Valid EM and invalid PW
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, invalidPassword);
    expect(buttonLogin).toBeDisabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);

    // Valid EM and PW
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    expect(buttonLogin).toBeEnabled();
    userEvent.clear(inputEmail);
    userEvent.clear(inputPassword);
  });
  it('Verifica se ao preencher os inputs corretos e clicar em entrar, é feito o redirecionamento.', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(emailId);
    const inputPassword = screen.getByTestId(passwordId);
    const buttonLogin = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, validEmail);
    userEvent.type(inputPassword, validPassword);
    userEvent.click(buttonLogin);
    const headerEmail = screen.getByTestId('email-field');
    expect(headerEmail).toBeInTheDocument();
    expect(headerEmail).toHaveTextContent(validEmail);
    expect(store.getState().user.email).toBe(validEmail);
  });
});
