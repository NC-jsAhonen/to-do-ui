import { createStore } from "redux";
import { ToDoItemProps } from "../components/ToDoItem";

type State = {
  items: ToDoItemProps[];
  newItem: ToDoItemProps | null;
};

type Action = {
  type: string;
};

const toDoListReducer = (
  state: State | undefined,
  action: Action
): State | undefined => {
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
        return { ...state, items, newItem: null };
      }
      return state;
    default:
      return state;
  }
};

export const store = createStore(toDoListReducer);
