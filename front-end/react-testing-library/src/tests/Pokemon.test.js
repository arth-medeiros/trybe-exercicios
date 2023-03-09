import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

test('Testa se é renderizado um card com as informações de determinado pokémon;', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
  const pokeName = screen.getByTestId('pokemon-name').textContent;
  const pokeType = screen.getByTestId('pokemon-type').textContent;
  const pokeWeight = screen.getByTestId('pokemon-weight').textContent;
  expect(pokeName).toMatch(pokemons[0].name);
  expect(pokeType).toMatch(pokemons[0].type);
  const expectedValue = pokemons[0].averageWeight.value;
  const expectedMeasurement = pokemons[0].averageWeight.measurementUnit;
  expect(pokeWeight).toMatch(`Average weight: ${expectedValue} ${expectedMeasurement}`);
  const pokeImg = screen.getByRole('img', { name: `${pokeName} sprite` });
  expect(pokeImg.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Testa se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon.', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  expect(detailsLink.href).toMatch(`/pokemons/${pokemons[0].id}`);
});

test('Testa se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon;', () => {
  const { history } = renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ false }
    />,
  );
  const detailsLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailsLink);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
  const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(favIcon.src).toMatch('/star-icon.svg');
  expect(favIcon.alt).toMatch(`${pokemons[0].name} is marked as favorite`);
});
