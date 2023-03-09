import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

const validEmail = 'teste@teste.com';
const addExp = 'Adicionar Despesa';
const elementIds = {
  value: 'value-input',
  description: 'description-input',
  currency: 'currency-input',
  method: 'method-input',
  tag: 'tag-input',
};
const expenseObjMock = {
  id: 0,
  value: '100',
  description: 'iFood',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: mockData,
};
const initialState = {
  user: {
    email: validEmail,
  },
};
const expenseObjMock2 = [
  {
    id: 0,
    value: '5',
    description: 'iFood',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: mockData,
  },
  {
    id: 1,
    value: '80',
    description: 'Passagem',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Trabalho',
    exchangeRates: mockData,
  },
  {
    id: 2,
    value: '7',
    description: 'Netflix',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
    exchangeRates: mockData,
  },
];

describe('Página da carteira', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Verifica se ao carregar a página, ela contém os elementos corretos.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await act(async () => {
      renderWithRouterAndRedux(<Wallet />, { initialState });
    });
    expect(global.fetch).toHaveBeenCalled();
    const headerEmail = screen.getByTestId('email-field');
    const valueInput = screen.getByTestId(elementIds.value);
    const descriptionInput = screen.getByTestId(elementIds.description);
    const currencyInput = screen.getByTestId(elementIds.currency);
    const methodInput = screen.getByTestId(elementIds.method);
    const tagInput = screen.getByTestId(elementIds.tag);
    const addExpButton = screen.getByRole('button', { name: addExp });
    const expTable = screen.getByRole('table');

    expect(headerEmail).toBeInTheDocument();
    expect(headerEmail).toHaveTextContent(validEmail);
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpButton).toBeInTheDocument();
    expect(expTable).toBeInTheDocument();
  });

  it('Testa se ao adicionar um gasto novo, é feito um fetch e o estado global é alterado corretamente.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    let recoverStore;
    await act(async () => {
      const { store } = renderWithRouterAndRedux(<Wallet />, { initialState });
      recoverStore = store;
    });

    const valueInput = screen.getByTestId(elementIds.value);
    const descriptionInput = screen.getByTestId(elementIds.description);
    const currencyInput = screen.getByTestId(elementIds.currency);
    const methodInput = screen.getByTestId(elementIds.method);
    const tagInput = screen.getByTestId(elementIds.tag);
    const addExpButton = screen.getByRole('button', { name: addExp });

    userEvent.clear(valueInput);
    userEvent.type(valueInput, expenseObjMock.value);
    userEvent.type(descriptionInput, expenseObjMock.description);
    userEvent.selectOptions(currencyInput, expenseObjMock.currency);
    userEvent.selectOptions(methodInput, expenseObjMock.method);
    userEvent.selectOptions(tagInput, expenseObjMock.tag);
    await act(async () => {
      userEvent.click(addExpButton);
    });

    const newExp = [...recoverStore.getState().wallet.expenses];
    expect(newExp[0]).toEqual(expenseObjMock);
  });

  it('Testa se os botões de adicionar, excluir e editar despesas funcionam corretamente.', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    await act(async () => {
      renderWithRouterAndRedux(<Wallet />, { initialState });
    });

    const valueInput = screen.getByTestId(elementIds.value);
    const descriptionInput = screen.getByTestId(elementIds.description);
    const currencyInput = screen.getByTestId(elementIds.currency);
    const methodInput = screen.getByTestId(elementIds.method);
    const tagInput = screen.getByTestId(elementIds.tag);
    const addExpButton = screen.getByRole('button', { name: addExp });

    userEvent.clear(valueInput);
    userEvent.type(valueInput, expenseObjMock2[0].value);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, expenseObjMock2[0].description);
    userEvent.selectOptions(currencyInput, expenseObjMock2[0].currency);
    userEvent.selectOptions(methodInput, expenseObjMock2[0].method);
    userEvent.selectOptions(tagInput, expenseObjMock2[0].tag);
    await act(async () => {
      userEvent.click(addExpButton);
    });

    userEvent.clear(valueInput);
    userEvent.type(valueInput, expenseObjMock2[1].value);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, expenseObjMock2[1].description);
    userEvent.selectOptions(currencyInput, expenseObjMock2[1].currency);
    userEvent.selectOptions(methodInput, expenseObjMock2[1].method);
    userEvent.selectOptions(tagInput, expenseObjMock2[1].tag);
    await act(async () => {
      userEvent.click(addExpButton);
    });

    userEvent.clear(valueInput);
    userEvent.type(valueInput, expenseObjMock2[2].value);
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, expenseObjMock2[2].description);
    userEvent.selectOptions(currencyInput, expenseObjMock2[2].currency);
    userEvent.selectOptions(methodInput, expenseObjMock2[2].method);
    userEvent.selectOptions(tagInput, expenseObjMock2[2].tag);
    await act(async () => {
      userEvent.click(addExpButton);
    });

    let tableRows = screen.getAllByTestId('delete-btn');
    expect(tableRows).toHaveLength(3);

    await act(async () => {
      userEvent.click(tableRows[2]);
    });
    tableRows = screen.getAllByTestId('delete-btn');
    expect(tableRows).toHaveLength(2);

    const descElement = screen.getByText('Passagem');
    expect(descElement).toBeInTheDocument();

    const editBtns = screen.getAllByTestId('edit-btn');
    expect(editBtns).toHaveLength(2);
    await act(async () => {
      userEvent.click(editBtns[1]);
    });
    expect(addExpButton.innerHTML).toBe('Editar despesa');
    userEvent.clear(valueInput);
    userEvent.clear(descriptionInput);
    userEvent.type(valueInput, expenseObjMock2[1].value);
    userEvent.type(descriptionInput, 'Hotel');
    await act(async () => {
      userEvent.click(addExpButton);
    });
    expect(descElement.innerHTML).toBe('Hotel');
  });
});
