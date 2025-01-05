import { ToDoItemProps } from "../components/ToDoItem";
import { State } from "./store";

export const selectItems = (state: State): ToDoItemProps[] => state.items;
export const selectNewItem = (state: State): ToDoItemProps | null =>
  state.newItem;
