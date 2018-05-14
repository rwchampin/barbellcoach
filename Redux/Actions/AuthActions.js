import {
  ADD_USER,
  ADD_CLIENTS
} from './types';

export const addUser = (user) => {
  return {
    type: ADD_USER,
    payload: user
  };
};

export const addClients = (clients) => {
  return {
    type: ADD_CLIENTS,
    payload: clients
  };
};
