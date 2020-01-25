export type Payload = any;
export type ActionType = string;
export interface Action {
  type: ActionType;
  payload?: Payload;
}
export type ActionCreator = (props?: any) => Action;
export interface ActionsCreator {
  [key: string]: ActionCreator;
}
export interface ActionsTypes {
  [key: string]: ActionType;
}
export type ActionPrefix = string | null;
export type ActionsOutput = [ActionsTypes, ActionsCreator];
export type Modifier = (props?: any) => any;
export type ActionData = [ActionType, Modifier] | string;
export type InitialState = any;
export type State = any;

export type Reducer = [ActionType, ReducerFunction];
export type ReducerFunction = (
  state: State,
  props: {
    payload: Payload;
  }
) => State;

export interface Reducers {
  [type: string]: ReducerFunction;
}
