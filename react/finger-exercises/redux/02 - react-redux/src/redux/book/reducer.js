import { actions } from './actions';
import filterByName from '/utils/utils.js';

const initialState = {
  books: [],
  bookSelected: [],
  originalData: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        originalData: action.payload
      };
    case actions.ADD_TO_CART:
      return {
        ...state,
        bookSelected: state.bookSelected.concat(action.payload)
      };
    case actions.ADD_ITEM:
      const indexItem = state.bookSelected.findIndex(({ id }) => id == action.payload);
      const bookSelected = [ ...state.bookSelected ];
      bookSelected[indexItem].quantity++;
      return {
        ...state,
        bookSelected
      };
    case actions.REMOVE_ITEM:
      return {
        ...state,
        bookSelected: state.bookSelected.filter(item => item.id !== action.payload)
      };
    case actions.SEARCH_ITEM:
      return {
        ...state,
        books: filterByName(state.originalData, action.payload)
      };
    default:
      return state;
  }
}

export default reducer;
