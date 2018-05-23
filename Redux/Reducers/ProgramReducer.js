import {
  BUILD_PROGRAM
} from '../Actions/types';

const INITIAL_STATE = {
  program: []
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BUILD_PROGRAM:
      return { ...state, program: action.payload };
    default:
      return state;
  }
};
