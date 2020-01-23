import { createStore } from "redux";

import generateActions from "./generateActions";
import generateReducer from "./generateReducer";

describe("Generate reducers", () => {
  const [actionsAT, actionsAC] = generateActions(
    "actions",
    "inverse_test_value",
    "change_foo_text"
  );
  const initialState = {
    test: true,
    foo: "foo"
  };
  const reducer = generateReducer(
    initialState,
    [actionsAT.inverseTestValue, state => ({ ...state, test: !state.test })],
    [
      actionsAT.changeFooText,
      (state, { payload }) => ({ ...state, foo: payload })
    ]
  );

  const store = createStore(reducer);

  test("Inverse value", () => {
    store.dispatch(actionsAC.inverseTestValue());
    const currentState = store.getState();
    expect(currentState).toEqual({
      test: false,
      foo: "foo"
    });
  });

  test("Modify value", () => {
    store.dispatch(actionsAC.changeFooText("Modified text"));
    const currentState = store.getState();
    expect(currentState).toEqual({
      test: false,
      foo: "Modified text"
    });
  });
});
