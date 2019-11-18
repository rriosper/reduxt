import { Action, InitialState, Reducer, Reducers, State } from "./types";

const generateReducer = (
  initialState: InitialState,
  ...reducers: Reducers
) => {
  return (state: State, action: Action) => {
    const currentReducer: Reducer | undefined = reducers.find(
      (reducer: Reducer) => reducer[0] === action.type,
    );
    return currentReducer
      ? currentReducer[1](state, action.payload)
      : initialState;
  };
};

export default generateReducer;
