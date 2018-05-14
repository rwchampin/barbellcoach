import {
  ADD_USER,
  ADD_CLIENTS
} from '../Actions/types';

const INITIAL_STATE = {
  user: {},
  clients: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, user: action.payload };
    case ADD_CLIENTS:
      return { ...state, clients: action.payload };
    default:
      return state;
  }
};
