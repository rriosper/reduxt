**This project is deprecated, you may use [hactions](https://github.com/rriosper/hactions) instead of this**

# Reduxt - Redux toolbox

_Tools to ease generate actions and reducers for redux_

![npm bundle size](https://img.shields.io/bundlephobia/min/reduxt)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/reduxt)
![npm](https://img.shields.io/npm/v/reduxt)
![NPM](https://img.shields.io/npm/l/reduxt)
![GitHub last commit](https://img.shields.io/github/last-commit/rriosper/reduxt)

## Summary

- [Installation](#installation)

- [Build](#build)

- [Use](#use)

---

## Installation

```js
// NPM
npm install reduxt

// Yarn
yarn add reduxt
```

---

## Build

```js
// NPM
npm run build

// Yarn
yarn build
```

## **Use**


### **Generate actions**

#### _Without prefix_

```js
generateActions(prefix, ...actions);
```

```js
import { generateActions } from "reduxt";

// actionsAT = Action types
// actionsAC = Actions to dispatch

const [actionsAT, actionsAC] = generateActions(null, "action 1", "action_2", [
  "action 3",
  value => !value
]);

actionsAT.action1 --> ACTION_1
actionsAT.action2 --> ACTION_2
actionsAT.action3 --> ACTION_3

actionsAC.action1() --> {
    type    : 'ACTION_1',
    payload : undefined,
}

actionsAC.action2('Hello!') --> {
    type    : 'ACTION_2',
    payload : 'Hello!',
}

actionsAC.action3(false) --> {
    type    : 'ACTION_3',
    payload : true,
}
```

#### _With prefix_

```js
import { generateActions } from "reduxt";

const [actionsAT, actionsAC] = generateActions(
  "custom prefix",
  "action 1",
  "action_2",
  ["action 3", value => !value]
);

actionsAT.action1 --> 'CUSTOM_PREFIX/ACTION_1'
actionsAT.action2 --> 'CUSTOM_PREFIX/ACTION_2'
actionsAT.action3 --> 'CUSTOM_PREFIX/ACTION_3'

actionsAC.action1() --> {
    type    : 'CUSTOM_PREFIX/ACTION_1',
    payload : undefined,
}

actionsAC.action2('Hello!') --> {
  type    : 'CUSTOM_PREFIX/ACTION_2',
  payload : 'Hello!',
}

actionsAC.action3(false) --> {
    type    : 'CUSTOM_PREFIX/ACTION_3',
    payload : true,
}
```
___

### **Generate reducer**

```js
generateReducer(initialState, ...reducers);
```

```js
import { generateReducer } from "reduxt";

const initialState = {
  test: true,
  foo: "foo"
};

// Reducers

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

// Examples

dispatch(actionsAC.changeTestValue(false));
state --> {
    test : false,
    foo  : 'foo',
};

dispatch(actionsAC.toggleTestValue());
state --> {
    test : true,
    foo  : 'foo',
}

dispatch(actionsAC.changeFooValue('Modified'));
state --> {
    test : true,
    foo  : 'Modified',
}
```
