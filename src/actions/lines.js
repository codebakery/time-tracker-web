const types = {
  ADD: 'LINES/ADD',
  REMOVE: 'LINES/REMOVE',
  CLEAR: 'LINES/CLEAR',
  EDIT: 'LINES/EDIT',
};
export default types;

export const addLine = () => ({ type: types.ADD });
export const removeLine = () => ({ type: types.REMOVE });
export const editLine = (index, field, value) => ({ type: types.EDIT, index, field, value });
