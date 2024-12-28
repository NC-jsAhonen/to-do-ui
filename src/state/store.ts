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

export const toDoListReducer = (
  state: State | undefined,
  action: Action
): State | undefined => {
  switch (action.type) {
    case "ADD_ITEM":
      if (state && !state?.newItem) {
        return { ...state, newItem: { text: "", isEditing: true } };
      }
      return state;
    case "EDIT_NEW_ITEM":
      if (state && action.payload) {
        const newItem: ToDoItemProps = {
          ...state.newItem,
          text: action.payload,
        };
        return {
          ...state,
          newItem,
        };
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
    case "TOGGLE_IS_EDITING":
      if (state && action.targetItemId) {
        const { items } = state;
        const newItems = items.map((item) => {
          if (item.id == action.targetItemId) {
            item.isEditing = !item.isEditing;
          }
          return item;
        });
        return { ...state, items: newItems };
      }
      return state;
    case "EDIT_ITEM":
      if (state && action.targetItemId) {
        const { items } = state;
        const newItems = items.map((item) => {
          if (action.payload && item.id == action.targetItemId) {
            item.text = action.payload;
          }
          return item;
        });
        return { ...state, items: newItems };
      }
      return state;
    default:
      return state;
  }
};

export const store = createStore(toDoListReducer);
