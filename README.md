# Reduxt - Redux toolbox

_Tools to ease generate actions and reducers for redux_

## Summary

- How to install

- How to use

---

## How to install

```
npm i reduxt --save
```

or

```
yarn add reduxt
```

---

## How to use

- ### Generate actions

#### Without prefix

```javascript
// generateActions(prefix, ...actions);
import { generateActions } from "reduxt";

// actionsAT = Action types
// actionsAC = Actions to dispatch
const [actionsAT, actionsAC] = generateActions(null, "action 1", "action_2", [
  "action 3",
  value => !value
]);

// actionsAT.action1 === ACTION_1
// actionsAT.action2 === ACTION_2
// actionsAT.action3 === ACTION_3

/*
    actionsAC.action1() === {
        type    : 'ACTION_1',
        payload : undefined,
    }

    actionsAC.action2('Hello!') === {
        type    : 'ACTION_2',
        payload : 'Hello!',
    }

    actionsAC.action3(false) === {
        type    : 'ACTION_3',
        payload : true,
    }
    */
```

#### With prefix

```javascript
import { generateActions } from "reduxt";

const [actionsAT, actionsAC] = generateActions(
  "custom prefix",
  "action 1",
  "action_2",
  ["action 3", value => !value]
);

/*
     actionsAT.action1 === CUSTOM_PREFIX/ACTION_1
     actionsAT.action2 === CUSTOM_PREFIX/ACTION_2
     actionsAT.action3 === CUSTOM_PREFIX/ACTION_3
    
        actionsAC.action1() === {
            type    : 'CUSTOM_PREFIX/ACTION_1',
            payload : undefined,
        }

        actionsAC.action2('Hello!') === {
            type    : 'CUSTOM_PREFIX/ACTION_2',
            payload : 'Hello!',
        }

        actionsAC.action3(false) === {
            type    : 'CUSTOM_PREFIX/ACTION_3',
            payload : true,
        }
    */
```

- ### Generate reducer

```javascript
// generateReducer(initialState, ...reducers);
import { generateReducer } from "reduxt";

const initialState = {
  test: true,
  foo: "foo"
};

const changeTestValueReducer = (state, { payload }) => ({
  ...state,
  test: payload
});

const toggleTestValueReducer = (state, { payload }) => ({
  ...state,
  test: !state.test
});

const changeFooValue = (state, { payload }) => ({ ...state, foo: payload });

const reducer = generateReducer(initialState, {
  CHANGE_TEST_VALUE: changeTestValueReducer,
  TOGGLE_TEST_VALUE: changeTestValueReducer,
  CHANGE_FOO_VALUE: changeFooValue
});

I; /*
    dispatch(actionsAC.changeTestValue(false));
    state = {
        test : false,
        foo  : 'foo',
    };

    dispatch(actionsAC.toggleTestValue());
    state = {
        test : true,
        foo  : 'foo',
    }

    dispatch(actionsAC.changeFooValue('Modified'));
    state = {
        test : true,
        foo  : 'Modified',
    }
*/
```
