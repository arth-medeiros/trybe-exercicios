import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('Testa se a página contém um heading h2 com o texto About Pokédex;', () => {
  render(<About />);

  const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
  expect(aboutTitle).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
  render(<About />);
  const p1 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
  const p2 = 'One can filter Pokémons by type, and see more details for each one of them';
  const firstParagraph = screen.getByText(p1);
  expect(firstParagraph).toBeInTheDocument();
  const secondParagraph = screen.getByText(p2);
  expect(secondParagraph).toBeInTheDocument();
});

test('Testa se a página contém a imagem de uma Pokédex;', () => {
  render(<About />);
  const image = screen.getByRole('img', { name: /pokédex/i });
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
