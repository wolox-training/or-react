export const actions = {
  TOGGLE_CONTENT: '@@CART/TOGGLE_CONTENT'
};

const actionsCreators = {
  toggleContent: () => ({
    type: actions.TOGGLE_CONTENT,
    payload: open
  })
};

export default actionsCreators;
