import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../pages';
import pokemons from '../data';
import { updateFavoritePokemons } from '../services/pokedexService';
import App from '../App';

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

const pokeIdObj = { params: { id: pokemons[0].id.toString() } };

test('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela;', async () => {
  renderWithRouter(
    <PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ favPokes }
      match={ pokeIdObj }
      onUpdateFavoritePokemons={ updateFavoritePokemons }
    />,
  );
  const detailsTitle1 = screen.getByRole('heading', { name: `${pokemons[0].name} Details`, level: 2 }).textContent;
  expect(detailsTitle1).toMatch('Pikachu Details');
  const linkQuery = () => screen.queryByRole('link', { name: 'More details' });
  expect(linkQuery()).toBeFalsy();
  const detailsTitle2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
  expect(detailsTitle2).toBeInTheDocument();
  const regex = /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i;
  const detailsContent = screen.getByText(regex);
  expect(detailsContent).toBeInTheDocument();
});

test('Testa se existe na página uma seção com os mapas contendo as localizações do pokémon;', () => {
  renderWithRouter(
    <PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ favPokes }
      match={ pokeIdObj }
      onUpdateFavoritePokemons={ updateFavoritePokemons }
    />,
  );
  const locationTitle = screen.getByRole('heading', { name: `Game Locations of ${pokemons[0].name}`, level: 2 });
  expect(locationTitle).toBeInTheDocument();
  const locationList = screen.getAllByRole('img', { name: /pikachu location/i });
  pokemons[0].foundAt.forEach((location, i) => {
    expect(locationList[i].src).toMatch(location.map);
    expect(locationList[i].alt).toMatch(`${pokemons[0].name} location`);
  });
  expect(screen.getByText(/kanto viridian forest/i).textContent).toMatch(pokemons[0].foundAt[0].location);
  expect(screen.getByText(/kanto power plant/i).textContent).toMatch(pokemons[0].foundAt[1].location);
});

test('Testa se o usuário pode favoritar um pokémon através da página de detalhes;', () => {
  renderWithRouter(
    <App />,
  );
  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  const favChckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(favChckBox).toBeInTheDocument();
  const favLabel = screen.getByText(/pokémon favoritado\?/i);
  expect(favLabel.textContent).toMatch('Pokémon favoritado?');
  expect(favChckBox).not.toBeChecked();
  userEvent.click(favChckBox);
  expect(favChckBox).toBeChecked();
  const isFavorite = screen.queryByRole('img', { name: `${pokemons[0].name} is marked as favorite` });
  expect(isFavorite).toBeInTheDocument();
  userEvent.click(favChckBox);
  expect(favChckBox).not.toBeChecked();
  expect(isFavorite).not.toBeInTheDocument();
});
