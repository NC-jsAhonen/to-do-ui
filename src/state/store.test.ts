import { createStore } from "redux";
import { test, expect } from "vitest";
import { State, toDoListReducer } from "./store";
import {
  ADD_ITEM,
  EDIT_ITEM,
  EMPTY_NEW_ITEM,
  SET_ITEMS,
  START_EDITING_ITEM,
} from "./store";

test("should set items", () => {
  const initialState: State = {
    items: [],
    newItem: null,
  };
  const store = createStore(toDoListReducer, initialState);
  store.dispatch({
    type: SET_ITEMS,
    payload: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: false,
      },
    ],
  });

  const expectedState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: false,
      },
    ],
    newItem: null,
  };

  const state = store.getState();

  expect(state).toEqual(expectedState);
});

test("should define empty item when adding item", () => {
  const initialState: State = {
    items: [],
    newItem: null,
  };
  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: ADD_ITEM });

  const state = store.getState();

  const expectedState: State = {
    items: [],
    newItem: { done: false, text: "", isEditing: true },
  };

  expect(state).toEqual(expectedState);
});

test("should empty new item when EMPTY_NEW_ITEM is run", () => {
  const initialState: State = {
    items: [],
    newItem: {
      done: false,
      text: "Clean up your room",
      isEditing: true,
    },
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: EMPTY_NEW_ITEM });

  const state = store.getState();

  const expectedState: State = {
    items: [],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});

test("should set an existing item's isEditing as true when START_EDITING_ITEM is run", () => {
  const initialState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: false,
      },
    ],
    newItem: null,
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: START_EDITING_ITEM, targetItemId: 2 });

  const state = store.getState();

  const expectedState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: true,
      },
    ],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});

test("should set an existing item's isEditing as false if it's true when START_EDITING_ITEM is run for another item", () => {
  const initialState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: true,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: false,
      },
    ],
    newItem: null,
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: START_EDITING_ITEM, targetItemId: 2 });

  const state = store.getState();

  const expectedState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: true,
      },
    ],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});

test("should set an existing item's text as the given payload when EDIT_ITEM is run", () => {
  const initialState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon",
        isEditing: true,
      },
    ],
    newItem: null,
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({
    type: EDIT_ITEM,
    payload: "Slay the Dragon now!",
    targetItemId: 2,
  });

  const state = store.getState();

  const expectedState: State = {
    items: [
      {
        id: 1,
        done: false,
        text: "Clean up your room",
        isEditing: false,
      },
      {
        id: 2,
        done: false,
        text: "Slay the Dragon now!",
        isEditing: true,
      },
    ],
    newItem: null,
  };

  expect(state).toEqual(expectedState);
});

test("should change the new item's text when EDIT_ITEM is run without targetItemId", () => {
  const initialState: State = {
    items: [],
    newItem: { done: false, text: "", isEditing: true },
  };

  const store = createStore(toDoListReducer, initialState);
  store.dispatch({ type: EDIT_ITEM, payload: "Clean up your room" });

  const state = store.getState();

  const expectedState: State = {
    items: [],
    newItem: {
      done: false,
      text: "Clean up your room",
      isEditing: true,
    },
  };

  expect(state).toEqual(expectedState);
});
