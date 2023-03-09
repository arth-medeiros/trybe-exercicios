export const LOGIN = 'LOGIN';
export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const REQUEST_PRICE = 'REQUEST_PRICE';
const requestPrice = () => ({
  type: REQUEST_PRICE,
});

export const RECEIVE_PRICE = 'RECEIVE_PRICE';
const receivePrice = (price) => ({
  type: RECEIVE_PRICE,
  price,
});

export const FAILED_REQUEST = 'FAILED_REQUEST';
const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const removeExpense = (newArr) => ({
  type: REMOVE_EXPENSE,
  newArr,
});

export const EDIT_EXPENSE_START = 'EDIT_EXPENSE_START';
export const editExpense = (id) => ({
  type: EDIT_EXPENSE_START,
  id,
});

export const RECEIVE_EDIT_EXPENSE = 'RECEIVE_EDIT_EXPENSE';
export const receiveEditedExpense = (newArr) => ({
  type: RECEIVE_EDIT_EXPENSE,
  newArr,
});

export function fetchPrice(argsObj) {
  return async (dispatch) => {
    dispatch(requestPrice());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response.json();
      const expenseObj = {
        id: argsObj.expCount,
        value: argsObj.value,
        description: argsObj.description,
        currency: argsObj.currency,
        method: argsObj.method,
        tag: argsObj.tag,
        exchangeRates: json,
      };
      return dispatch(receivePrice(expenseObj));
    } catch (error) {
      return dispatch(failedRequest(error));
    }
  };
}
