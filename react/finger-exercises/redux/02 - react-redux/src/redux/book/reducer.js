import { actions } from './actions';
import { DATA } from '@constants/data';

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
        books: state.books.concat(DATA),
        originalData: state.originalData.concat(DATA)
      };
    case actions.ADD_TO_CART:
      return {
        ...state,
        bookSelected: state.bookSelected.concat(action.item)
      };
    case actions.ADD_ITEM:
      const indexItem = state.bookSelected.findIndex(({ id }) => id == action.itemId);
      const newItem = state.bookSelected[indexItem];
      newItem.quantity++; 
      return {
        ...state,
        bookSelected: Object.assign([...state.bookSelected], {[indexItem]: newItem})

      };
    case actions.REMOVE_ITEM:
      return {
        ...state,
        bookSelected: state.bookSelected.filter(item => item.id !== action.itemId)
      };
    case actions.SEARCH_ITEM:
      return {
        ...state,
        books: filterByName(state.originalData, action.value)
      };
    default:
      return state;
  }
}

function filterByName(arr, value) {
  return arr.filter(function (a) {
    return a.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  })
}

export default reducer;
