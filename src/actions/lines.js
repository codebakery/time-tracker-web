const types = {
  ADD: 'LINES/ADD',
  REMOVE: 'LINES/REMOVE',
  CLEAR: 'LINES/CLEAR',
  EDIT: 'LINES/EDIT',
  CLEAR_LINE: 'LINES/CLEAR_LINE',
};
export default types;

export const addLine = () => ({ type: types.ADD });
export const removeLine = () => ({ type: types.REMOVE });
export const clearLine = (index) => ({ type: types.CLEAR_LINE, index });
export const clearLines = () => ({ type: types.CLEAR });
export const editLine = (index, field, value) => ({ type: types.EDIT, index, field, value });
