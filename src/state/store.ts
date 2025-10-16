import { applyMiddleware, createStore } from "redux";
import { NewToDoItemProps, ToDoItemProps } from "../types";
import { thunk } from "redux-thunk";

export type State = {
  items: ToDoItemProps[];
  newItem: NewToDoItemProps | null;
};

// Action type constants
export const ADD_ITEM = "ADD_ITEM" as const;
export const EMPTY_NEW_ITEM = "EMPTY_NEW_ITEM" as const;
export const START_EDITING_ITEM = "START_EDITING_ITEM" as const;
export const EDIT_ITEM = "EDIT_ITEM" as const;
export const SET_ITEMS = "SET_ITEMS" as const;

// Action interfaces
export interface AddItemAction {
  type: typeof ADD_ITEM;
}

export interface EmptyNewItemAction {
  type: typeof EMPTY_NEW_ITEM;
}

export interface StartEditingItemAction {
  type: typeof START_EDITING_ITEM;
  targetItemId: number;
}

export interface EditItemAction {
  type: typeof EDIT_ITEM;
  payload: string;
  targetItemId?: number; // Optional because it can edit new item or existing item
}

export interface SetItemsAction {
  type: typeof SET_ITEMS;
  payload: ToDoItemProps[];
}

// Union type for all actions
export type ToDoListAction =
  | AddItemAction
  | EmptyNewItemAction
  | StartEditingItemAction
  | EditItemAction
  | SetItemsAction;

const defaultState: State = {
  items: [],
  newItem: null,
};

export const toDoListReducer = (
  state: State = defaultState,
  action: ToDoListAction
): State => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state && !state?.newItem) {
        return { ...state, newItem: { done: false, text: "", isEditing: true } };
      }
      return state;
    case "EMPTY_NEW_ITEM":
      if (state) {
        const { items } = state;
        return { items, newItem: null };
      }
      return state;
    case "START_EDITING_ITEM":
      if (state && action.targetItemId) {
        const { items } = state;
        const newItems = items.map((item) => {
          if (item.id == action.targetItemId) {
            item.isEditing = true;
          } else {
            item.isEditing = false;
          }
          return item;
        });
        return { ...state, items: newItems };
      }
      return state;
    case "SET_ITEMS":
      if (state && action.payload && Array.isArray(action.payload)) {
        const newItems = action.payload.map((item: ToDoItemProps) => ({
          ...item,
          isEditing: false,
        }));
        return { ...state, items: newItems };
      }
      return state;
    case "EDIT_ITEM":
      if (state && action) {
        const { payload } = action;

        // Edit existing item
        if (action.targetItemId) {
          const { items } = state;
          const newItems = items.map((item) => {
            if (item.id == action.targetItemId) {
              item.text = payload || "";
            }
            return item;
          });
          return { ...state, items: newItems };
        }

        // Edit new item
        const newItem: NewToDoItemProps = {
          done: state.newItem?.done ?? false,
          isEditing: state.newItem?.isEditing ?? true,
          text: payload,
        };
        return {
          ...state,
          newItem,
        };
      }
      return state;
    default:
      return state;
  }
};

export const store = createStore(
  toDoListReducer,
  defaultState,
  applyMiddleware(thunk)
);
