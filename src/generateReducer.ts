import {
  Action,
  ActionType,
  InitialState,
  ReducerFunction,
  Reducers,
  State,
} from "./types";

const generateReducer = (
  initialState: InitialState,
  reducers: Reducers,
): State => {
  return (state: State, action: Action) => {
    const currentKeyReducer: ActionType | undefined = Object.keys(
      reducers,
    ).find((type) => type === action.type);
    if (currentKeyReducer) {
      const currentReducer: ReducerFunction = reducers[currentKeyReducer];
      return currentReducer(state, { payload: action.payload });
    }

    return state || initialState;
  };
};

export default generateReducer;
