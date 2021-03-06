import { createFetch, base, accept, parseJSON, header } from 'http-client';
import { getRelativeURL } from './utils';

const setHeader = (options, name, value) => {
  (options.headers || (options.headers = {}))[name] = value;
};

const authHeader = () => (fetch, input, options = {}) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (token !== null) {
    setHeader(options, 'Authorization', 'Token ' + localStorage.getItem('AUTH_TOKEN'));
  }
  return fetch(input, options);
};

const createClient = (...middlewares) => {
  const fetch = createFetch(...middlewares);
  const deleteFetch = createFetch(...middlewares.slice(0, -1));
  return {
    get: fetch,
    post: (url, data) => fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
    }),
    put: (url, data) => fetch(url, {
      method: 'put',
      body: JSON.stringify(data),
    }),
    delete: (url) => {
      return deleteFetch(url, {
        method: 'delete',
      });
    },
  };
};

const client = createClient(
  base('/api'),
  header('Content-Type', 'application/json'),
  accept('application/json'),
  authHeader(),
  parseJSON()
);

export const login = (username, password) => {
  return client.post('/token-auth/', {
    username, password,
  }).then(response => {
    if (response.ok) {
      const userURL = getRelativeURL(response.jsonData.url);
      localStorage.setItem('AUTH_TOKEN', response.jsonData.token);
      localStorage.setItem('USER_URL', userURL);
      return client.get(userURL);
    } else {
      return response;
    }
  });
};

export const logout = () => {
  localStorage.removeItem('AUTH_TOKEN');
  localStorage.removeItem('USER_URL');
  return Promise.resolve({response: {ok: true}});
};

export const getCurrentUser = () => {
  const userURL = localStorage.getItem('USER_URL');
  if (userURL === null) {
    return Promise.resolve({response: {ok: false}});
  } else {
    return client.get(localStorage.getItem('USER_URL'));
  }
};

export const getProjects = () => {
  return client.get('/projects/?limit=999999');
};

export const getRecords = (dateFrom = '', dateTo = '', userId = '', projectName = '') => {
  return client.get(`/records/?limit=999999&date_0=${dateFrom}&date_1=${dateTo}&user=${userId}&project${projectName}`);
};

export const addOrEditRecord = (date, payload) => {
  const { id, ...rest } = payload;
  if (id) {
    return client.put(`/records/${id}/`, {date, ...rest});
  } else {
    return client.post('/records/', {date, ...rest});
  }
};

export const removeRecord = (id) => {
  return client.delete(`/records/${id}/`);
};

