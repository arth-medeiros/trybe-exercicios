import {
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  REQUEST_PRICE,
  RECEIVE_PRICE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE_START,
  RECEIVE_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  isEditing: false,
  idToEdit: 0,
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return ({
      ...state,
      isFetching: true,
    });

  case RECEIVE_CURRENCIES:
    return ({
      ...state,
      currencies: action.currencies,
      isFetching: false,
    });

  case REQUEST_PRICE:
    return state;

  case RECEIVE_PRICE:
    return ({
      ...state,
      expenses: [...state.expenses, action.price],
    });

  case REMOVE_EXPENSE:
    return ({
      ...state,
      expenses: action.newArr,
    });

  case EDIT_EXPENSE_START:
    return ({
      ...state,
      isEditing: true,
      idToEdit: action.id,
    });

  case RECEIVE_EDIT_EXPENSE:
    return ({
      ...state,
      expenses: action.newArr,
      isEditing: false,
    });

  default:
    return state;
  }
};

export default wallet;
