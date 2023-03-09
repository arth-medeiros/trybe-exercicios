import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

test('Testa se a página contém um heading h2 com o texto Page requested not found;', () => {
  render(<NotFound />);
  const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
  expect(notFoundTitle).toBeInTheDocument();
});

test('Teste se a página mostra a imagem correta;', () => {
  render(<NotFound />);
  const image = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
