import {
  ADD_WEEK,
  REMOVE_WEEK,
  ADD_DAY,
  REMOVE_DAY,
  ADD_LIFT,
  REMOVE_LIFT,
  CREATE_NEW_PROGRAM
} from '../Actions/types';

const INITIAL_STATE = {
  programs: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW_PROGRAM:
      return { ...state, programs: [...state.programs, action.payload] };
    case ADD_WEEK:
      return { ...state, programs: action.payload };
    case REMOVE_WEEK:
      return { ...state, programs: action.payload };
    case ADD_DAY:
      return { ...state, programs: action.payload };
    case REMOVE_DAY:
      return { ...state, programs: action.payload };
    case ADD_LIFT:
      return { ...state, programs: action.payload };
    case REMOVE_LIFT:
      return { ...state, programs: action.payload };
    default:
      return state;
  }
};
