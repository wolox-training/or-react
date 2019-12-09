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
      return {
        ...state,
        bookSelected: addItem(state.bookSelected, action.itemId)
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

function addItem(selected, id) {
  var index = selected.findIndex(i => i.id === id);
  selected[index].quantity++;
  return selected;
}

export default reducer;
