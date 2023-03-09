import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação;', async () => {
  // Acessa o App
  renderWithRouter(<App />);

  // Retorna uma lista com todos elementos do tipo link
  const links = await screen.findAllByRole('link');

  // Testa a ordem dos links
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite');
});

test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;', () => {
  // Acessa o App
  const { history } = renderWithRouter(<App />);

  // Retorna o link home e testa se o retorno foi feito com sucesso
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();

  // Clica no link home
  userEvent.click(homeLink);

  // Verifica se o redirecionamento foi feito com sucesso
  const { pathname } = history.location;
  expect(pathname).toBe('/');
  const homeTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });
  expect(homeTitle).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;', () => {
  // Acessa o App
  const { history } = renderWithRouter(<App />);

  // Retorna o link about e testa se o retorno foi feito com sucesso
  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();

  // Clica no link about
  userEvent.click(aboutLink);

  // Verifica se o redirecionamento foi feito com sucesso
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
  const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(aboutTitle).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação;', () => {
  // Acessa o App
  const { history } = renderWithRouter(<App />);

  // Retorna o link favorites e testa se o retorno foi feito com sucesso
  const favLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(favLink).toBeInTheDocument();

  // Clica no link favorites
  userEvent.click(favLink);

  // Verifica se o redirecionamento foi feito com sucesso
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
  const favTitle = screen.getByRole('heading', { name: 'Favorite pokémons' });
  expect(favTitle).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
  // Acessa o App
  const { history } = renderWithRouter(<App />);

  // Vai até o link que não existe
  act(() => {
    history.push('/404');
  });

  // Verifica se o redirecionamento foi feito com sucesso
  const { pathname } = history.location;
  expect(pathname).toBe('/404');
  const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
  expect(notFoundTitle).toBeInTheDocument();
});
