import { ActionData, ActionPrefix, ActionsOutput, ActionType } from "./types";

const identity = (x: any) => x;
const merge = (obj1: {}, obj2: {}) => ({ ...obj1, ...obj2 });

const getActionKey = (type: ActionType) =>
  type
    .toLocaleLowerCase()
    .replace(/[_|\s]([a-z|0-9])/g, (x) => x.toUpperCase())
    .replace(/[_|\s]/g, "");

const reduceActions = (prefix: ActionPrefix) => (
  acc: [{}, {}],
  actionData: ActionData,
) => {
  const [type, modifier] = Array.isArray(actionData)
    ? actionData
    : [actionData, identity];
  const [accTypes, accCreators] = acc;
  const formatedPrefix = prefix
    ? `${prefix.toUpperCase().replace(/\s/g, "_")}/`
    : "";
  const formatedType = type.toUpperCase().replace(/\s/g, "_");
  const formatedActionType = `${formatedPrefix}${formatedType}`;
  const actionKey = getActionKey(type);

  acc[0] = merge(accTypes, {
    [actionKey]: formatedActionType,
  });

  acc[1] = merge(accCreators, {
    [actionKey]: (props: any) => ({
      payload: modifier(props),
      type: formatedActionType,
    }),
  });

  return acc;
};

const generateActions = (
  prefix: ActionPrefix,
  ...actionsData: ActionData[]
): ActionsOutput => actionsData.reduce(reduceActions(prefix), [{}, {}]);

export default generateActions;
