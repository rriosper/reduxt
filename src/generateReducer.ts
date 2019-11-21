import { Action, InitialState, Reducer, Reducers, State } from "./types";

const generateReducer = (initialState: InitialState, ...reducers: Reducers): State => {
  return (state: State, action: Action) => {
    const currentReducer: Reducer | undefined = reducers.find(
      (reducer: Reducer) => reducer[0] === action.type,
    );
    return currentReducer
      ? currentReducer[1]({ state, payload: action.payload })
      : initialState;
  };
};

export default generateReducer;
