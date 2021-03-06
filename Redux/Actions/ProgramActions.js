import _ from 'lodash';
import firebase from 'react-native-firebase';
import {
  ADD_WEEK,
  ADD_DAY,
  ADD_LIFT,
  REMOVE_DAY,
  REMOVE_WEEK,
  SAVE_PROGRAM,
  UPDATE_PROGRAM,
  CREATE_NEW_PROGRAM,
  UPDATE_REPS_AND_SETS,
  ADD_PROGRAMS_TO_REDUX,
  SEND_PROGRAM_TO_CLIENT
} from './types';

export const createNewProgram = (newProgram) => {
  return {
    type: CREATE_NEW_PROGRAM,
    payload: newProgram
  };
};

export const addProgramsToRedux = (programs) => {
  return {
    type: ADD_PROGRAMS_TO_REDUX,
    payload: programs
  };
};

export const updateProgram = (program) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: program.id });
    if (programIndex === -1) {
      programs.push(program);
    }
    return dispatch({
      type: UPDATE_PROGRAM,
      payload: programs
    });
  };
};

export const updateRepsAndSets = (programId, weekId, dayId, liftId, setId, reps) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    const week = _.find(programs[programIndex].program, { id: weekId });
    const dayIndex = _.findIndex(week.days, { id: dayId });
    const liftIndex = _.findIndex(week.days[dayIndex].lifts, { id: liftId });
    const setIndex = _.findIndex(week.days[dayIndex].lifts[liftIndex].repsAndSets, { id: setId });
    // Mark the `Set` as completed because even if one rep was done, the set has been done
    programs[programIndex].program[weekIndex].days[dayIndex]
      .lifts[liftIndex].repsAndSets[setIndex].completed = true;

    programs[programIndex].program[weekIndex].days[dayIndex]
      .lifts[liftIndex].repsAndSets[setIndex].reps = reps;

    const ref = firebase.firestore().collection('programs').doc(programs[programIndex].client.email);
    const update = {};
    update[programs[programIndex].id] = programs[programIndex];
    ref.update(update);

    return dispatch({
      type: UPDATE_REPS_AND_SETS,
      payload: programs
    });
  };
};

export const addWeek = (week, programId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    programs[programIndex].program.push(week);
    return dispatch({
      type: ADD_WEEK,
      payload: programs
    });
  };
};

export const removeWeek = (weekId, programId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weeks = programs[programIndex].program.filter((week) => {
      return week.id !== weekId;
    });
    programs[programIndex].program = weeks;
    return dispatch({
      type: REMOVE_WEEK,
      payload: programs
    });
  };
};

export const addDay = (day, weekId, programId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    programs[programIndex].program[weekIndex].days.push(day);
    return dispatch({
      type: ADD_DAY,
      payload: programs
    });
  };
};

export const removeDay = (programId, dayId, weekId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    const days = programs[programIndex].program[weekIndex].days.filter(day => day.id !== dayId);
    programs[programIndex].program[weekIndex].days = days;
    return dispatch({
      type: REMOVE_DAY,
      payload: programs
    });
  };
};

export const addLift = (weekId, dayId, lift, programId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    const week = _.find(programs[programIndex].program, { id: weekId });
    const dayIndex = _.findIndex(week.days, { id: dayId });
    programs[programIndex].program[weekIndex].days[dayIndex].lifts.push(lift);
    return dispatch({
      type: ADD_LIFT,
      payload: programs
    });
  };
};

export const addDetailToLift = (programId, weekId, dayId, lift) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    const week = _.find(programs[programIndex].program, { id: weekId });
    const dayIndex = _.findIndex(week.days, { id: dayId });
    const liftIndex = _.findIndex(week.days[dayIndex].lifts, { id: lift.id });
    programs[programIndex].program[weekIndex].days[dayIndex]
      .lifts[liftIndex].liftType = lift.liftType;
    programs[programIndex].program[weekIndex].days[dayIndex]
      .lifts[liftIndex].repsAndSets = lift.repsAndSets;
    return dispatch({
      type: ADD_LIFT,
      payload: programs
    });
  };
};

export const removeLift = (programId, weekId, dayId, liftId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const weekIndex = _.findIndex(programs[programIndex].program, { id: weekId });
    const week = _.find(programs[programIndex].program, { id: weekId });
    const dayIndex = _.findIndex(week.days, { id: dayId });
    const lifts = programs[programIndex].program[weekIndex].days[dayIndex].lifts
      .filter(lift => lift.id !== liftId);
    programs[programIndex].program[weekIndex].days[dayIndex].lifts = lifts;
    return dispatch({
      type: ADD_DAY,
      payload: programs
    });
  };
};

export const saveProgram = (programId) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: programId });
    const ref = firebase.firestore().collection('clientPrograms');
    const program = getState().ProgramReducer.programs[programIndex];
    ref.add(program);
    return dispatch({
      type: SAVE_PROGRAM,
      payload: ''
    });
  };
};

export const sendProgramToClient = (program) => {
  return (dispatch, getState) => {
    const { programs } = getState().ProgramReducer;
    const programIndex = _.findIndex(programs, { id: program });
    const savedProgram = programs[programIndex];
    const newProgram = {};
    newProgram[program] = savedProgram;
    firebase.firestore().collection('programs')
      .doc(savedProgram.client.email).set(newProgram, { merge: true });
    return dispatch({
      type: SEND_PROGRAM_TO_CLIENT,
      payload: ''
    });
  };
};
