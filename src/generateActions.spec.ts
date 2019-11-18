import generateActions from "./generateActions";

describe("Generate actions", () => {
  test("Without prefix", () => {
    const modifier2Fn = jest.fn(x => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const [actionsAT, actionsAC] = generateActions(
      null,
      "action_1",
      ["action_2", modifier2Fn],
      ["action_3", modifier3Fn]
    );

    // Types
    expect(actionsAT).toEqual({
      action1: "ACTION_1",
      action2: "ACTION_2",
      action3: "ACTION_3"
    });

    // Creators
    const actionsATValues = Object.values(actionsAT);
    const actionsACValues = Object.values(actionsAC);
    expect(actionsACValues[0]("payload")).toEqual({
      type: actionsATValues[0],
      payload: "payload"
    });

    expect(actionsACValues[1](true)).toEqual({
      type: actionsATValues[1],
      payload: false
    });

    expect(
      actionsACValues[2]({ id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854", title: 'The book of RA' })
    ).toEqual({
      type: actionsATValues[2],
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" }
    });
  });

  test("With prefix", () => {
    const modifier2Fn = jest.fn(x => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const [actionsAT, actionsAC] = generateActions(
      "prefix",
      "action_1",
      ["action_2", modifier2Fn],
      ["action_3", modifier3Fn]
    );

    // Types
    expect(actionsAT).toEqual({
      action1: "PREFIX/ACTION_1",
      action2: "PREFIX/ACTION_2",
      action3: "PREFIX/ACTION_3"
    });

    // Creators
    const actionsATValues = Object.values(actionsAT);
    const actionsACValues = Object.values(actionsAC);
    expect(actionsACValues[0]("payload")).toEqual({
      type: actionsATValues[0],
      payload: "payload"
    });

    expect(actionsACValues[1](true)).toEqual({
      type: actionsATValues[1],
      payload: false
    });

    expect(
      actionsACValues[2]({ id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854", title: 'The book of RA' })
    ).toEqual({
      type: actionsATValues[2],
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" }
    });
  });

  test("With prefix and large actions", () => {
    const modifier2Fn = jest.fn(x => !x);
    const modifier3Fn = jest.fn(({ id }) => ({ id }));
    const [actionsAT, actionsAC] = generateActions(
      "prefix_large",
      "action_large_1",
      ["action_large_2", modifier2Fn],
      ["action_large_3", modifier3Fn]
    );

    // Types
    expect(actionsAT).toEqual({
      actionLarge1: "PREFIX_LARGE/ACTION_LARGE_1",
      actionLarge2: "PREFIX_LARGE/ACTION_LARGE_2",
      actionLarge3: "PREFIX_LARGE/ACTION_LARGE_3"
    });

    // Creators
    const actionsATValues = Object.values(actionsAT);
    const actionsACValues = Object.values(actionsAC);
    expect(actionsACValues[0]("payload")).toEqual({
      type: actionsATValues[0],
      payload: "payload"
    });

    expect(actionsACValues[1](true)).toEqual({
      type: actionsATValues[1],
      payload: false
    });

    expect(
      actionsACValues[2]({ id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854", title: 'The book of RA' })
    ).toEqual({
      type: actionsATValues[2],
      payload: { id: "bee4ee68-dfd8-43f1-8c86-22a2179d9854" }
    });
  });
});
