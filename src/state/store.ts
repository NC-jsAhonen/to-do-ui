import { createStore } from "redux";
import { ToDoItemProps } from "../components/ToDoItem";

export type State = {
  items: ToDoItemProps[];
  newItem: ToDoItemProps | null;
};

type EditItemPayload = string;

type Action = {
  type: string;
  payload?: EditItemPayload;
  targetItemId?: number;
};

const defaultState: State = {
  items: [],
  newItem: null,
};

export const toDoListReducer = (
  state: State = defaultState,
  action: Action
): State => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state && !state?.newItem) {
        return { ...state, newItem: { text: "", isEditing: true } };
      }
      return state;
    case "CREATE_ITEM":
      if (state && state?.newItem) {
        const { items, newItem } = state;
        return {
          items: [...items, newItem],
          newItem: null,
        };
      }
      return state;
    case "CANCEL_ITEM":
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
          }
          return item;
        });
        return { ...state, items: newItems };
      }
      return state;
    case "SAVE_ITEM":
      if (state && action.targetItemId) {
        const { items } = state;
        const newItems = items.map((item) => {
          if (item.id == action.targetItemId) {
            item.isEditing = false;
          }
          return item;
        });
        return { ...state, items: newItems };
      }
      return state;
    case "EDIT_ITEM":
      if (state && action.payload) {
        const { payload } = action;

        // Edit existing item
        if (action.targetItemId) {
          const { items } = state;
          const newItems = items.map((item) => {
            if (item.id == action.targetItemId) {
              item.text = payload;
            }
            return item;
          });
          return { ...state, items: newItems };
        }

        // Edit new item
        const newItem: ToDoItemProps = {
          ...state.newItem,
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

export const store = createStore(toDoListReducer, defaultState);
