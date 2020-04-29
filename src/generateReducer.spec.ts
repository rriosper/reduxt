import { createStore, combineReducers } from "redux";

import generateActions from "./generateActions";
import generateReducer from "./generateReducer";

describe("Generate reducers", () => {
  const [actions1AT, actions1AC] = generateActions(
    "actions1",
    "inverse_test_value",
    "change_foo_text"
  );

  const [actions2AT, actions2AC] = generateActions(
    "actions2",
    "inverse_test_value",
    "change_foo_text"
  );
  const initialState = {
    test: true,
    foo: "foo"
  };
  const reducer1 = generateReducer(initialState, {
    [actions1AT.inverseTestValue]: state => ({ ...state, test: !state.test }),
    [actions1AT.changeFooText]: (state, { payload }) => ({
      ...state,
      foo: payload
    })
  });

  const reducer2 = generateReducer(initialState, {
    [actions2AT.inverseTestValue]: state => ({ ...state, test: !state.test }),
    [actions2AT.changeFooText]: (state, { payload }) => ({
      ...state,
      foo: payload
    })
  });

  const reducers = combineReducers({
    reducer1,
    reducer2
  });

  const store = createStore(reducers);

  test("Inverse value", () => {
    store.dispatch(actions1AC.inverseTestValue());
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "foo"
      },
      reducer2: {
        test: true,
        foo: "foo"
      }
    });

    store.dispatch(actions2AC.inverseTestValue());
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "foo"
      },
      reducer2: {
        test: false,
        foo: "foo"
      }
    });
  });

  test("Modify value", () => {
    store.dispatch(actions1AC.changeFooText("Modified text"));
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "Modified text"
      },
      reducer2: {
        test: false,
        foo: "foo"
      }
    });

    store.dispatch(actions2AC.changeFooText("Modified text 2"));
    expect(store.getState()).toEqual({
      reducer1: {
        test: false,
        foo: "Modified text"
      },
      reducer2: {
        test: false,
        foo: "Modified text 2"
      }
    });
  });
});
