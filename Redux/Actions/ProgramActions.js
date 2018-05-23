import {
  BUILD_PROGRAM
} from './types';

export const buildProgram = (programData) => {
  return (dispatch, getState) => {
    let { program } = getState().ProgramReducer;
    if (programData.type === 'week') {
      program = [programData, ...getState().ProgramReducer.program];
    }
    if (programData.type === 'day') {
      for (const week of program) {
        if (week.id === programData.weekId) {
          week.days.push(programData);
        }
      }
    }
    if (programData.type === 'lift') {
      for (const weekR of program) {
        console.log(weekR);
        if (weekR.id === programData.weekId) {
          for (const day in weekR.days) {
            console.log(day)
            if (day.id === programData.dayId) {
              day.lifts.push(programData);
            }
          }
        }
      }
    }
    return dispatch({
      type: BUILD_PROGRAM,
      payload: program
    });
  };
};
