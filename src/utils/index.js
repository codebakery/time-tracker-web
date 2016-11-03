export const ref = (name, parent) => element => {
  parent[name] = element;
};

const parser = document.createElement('a');
export const getRelativeURL = (url) => {
  parser.href = url;
  return parser.pathname.slice(4);
};
