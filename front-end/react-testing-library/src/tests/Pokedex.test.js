import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../pages';
import pokemons from '../data';

const favPokes = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const proxPokeBtn = 'Próximo pokémon';

test('Testa se a página contém um heading h2 com o texto Encountered pokémons;', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokes } />);
  const homeTitle = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
  expect(homeTitle).toBeInTheDocument();
});

// 9 pokemao, index vai de 0 ate 8
test('Testa se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado:', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokes } />);
  const nameElement = screen.getByTestId('pokemon-name');
  const nextBtn = screen.getByRole('button', { name: proxPokeBtn });
  const firstPoke = nameElement.textContent;
  for (let index = 0; index < pokemons.length; index += 1) {
    const prevPoke = nameElement.textContent;
    userEvent.click(nextBtn);
    const nextPoke = nameElement.textContent;
    expect(prevPoke).not.toMatch(nextPoke);
    if (index === 8) {
      expect(nextPoke).toMatch(firstPoke);
    }
  }
});

test('Testa se é mostrado apenas um pokémon por vez;', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokes } />);
  const pokeList = screen.getAllByRole('link', { name: 'More details' });
  expect(pokeList.length).toBe(1);
});

test('Testa se a Pokédex tem os botões de filtro;', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokes } />);
  const typeBtnList = screen.getAllByTestId('pokemon-type-button');
  const nextBtn = screen.getByRole('button', { name: proxPokeBtn });
  const allBtn = screen.getByRole('button', { name: 'All' });
  expect(typeBtnList.length).toBe(7);
  typeBtnList.forEach((typeBtn) => {
    userEvent.click(typeBtn);
    const prevPokeType = screen.getByTestId('pokemon-type').textContent;
    userEvent.click(nextBtn);
    const nextPokeType = screen.getByTestId('pokemon-type').textContent;
    expect(prevPokeType).toMatch(nextPokeType);
    expect(typeBtn.textContent).toMatch(prevPokeType);
    expect(allBtn).toBeInTheDocument();
  });
});

test('Testa se a Pokédex contém um botão para resetar o filtro;', () => {
  const spy = jest.spyOn(Pokedex.prototype, 'filterPokemons');
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favPokes } />);
  const allBtn = screen.getByRole('button', { name: 'All' });
  userEvent.click(allBtn);
  expect(spy).toHaveBeenCalledWith('all');
  const nextBtn = screen.getByRole('button', { name: proxPokeBtn });
  expect(allBtn.textContent).toMatch('All');
  for (let index = 0; index < pokemons.length; index += 1) {
    const pokeName = screen.getByTestId('pokemon-name').textContent;
    expect(pokeName).toMatch(pokemons[index].name);
    userEvent.click(nextBtn);
  }
});
