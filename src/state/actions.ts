// actions.ts
import { Dispatch } from "redux";
import api from "../api/api-instance";
import { ToDoItemProps } from "../components/ToDoItem";

// Action types
export const ADD_ITEM = "ADD_ITEM";
export const CREATE_ITEM = "CREATE_ITEM";
export const EMPTY_NEW_ITEM = "EMPTY_NEW_ITEM";
export const START_EDITING_ITEM = "START_EDITING_ITEM";
export const SAVE_ITEM = "SAVE_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const SET_ITEMS = "SET_ITEMS";

// Synchronous Action Creators
export const addItem = () => ({ type: ADD_ITEM });

export const createItem = () => ({ type: CREATE_ITEM });

export const cancelItem = () => ({ type: EMPTY_NEW_ITEM });

export const startEditingItem = (targetItemId: number) => ({
  type: START_EDITING_ITEM,
  targetItemId,
});

export const saveItem = (targetItemId: number) => ({
  type: SAVE_ITEM,
  targetItemId,
});

export const editItem = (payload: string, targetItemId?: number) => ({
  type: EDIT_ITEM,
  payload,
  targetItemId,
});

export const fetchItems = () => {
  return async (
    dispatch: Dispatch
  ) => {
    try {
      const response = await api({
        method: "GET",
        url: "/lists/1/",
      });
      const items: ToDoItemProps[] = response?.data?.items || [];
      dispatch({ type: SET_ITEMS, payload: items });
    } catch (error: any) {
      if (error?.response?.data?.detail === "No List matches the given query.") {
        await api({
          method: "POST",
          url: "/lists/",
        }).then((response) => {
          const items: ToDoItemProps[] = response?.data?.items || [];
          dispatch({ type: SET_ITEMS, payload: items });
        }).catch((error) => {
          console.error("Automatic list creation failed: ", error);
        });
      } else {
        console.error("Failed to fetch items: ", error);
      }
    }
  };
};
