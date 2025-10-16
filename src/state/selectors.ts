import { NewToDoItemProps, ToDoItemProps } from "../types";
import { State } from "./store";

export const selectItems = (state: State): ToDoItemProps[] => state.items;
export const selectNewItem = (state: State): NewToDoItemProps | null =>
  state.newItem;
