// actions.ts
import { Dispatch } from "redux";
import api from "../api/api-instance";
import { ToDoItemProps } from "../components/ToDoItem";
import { store } from "./store";

// Action types
export const ADD_ITEM = "ADD_ITEM";
export const EMPTY_NEW_ITEM = "EMPTY_NEW_ITEM";
export const START_EDITING_ITEM = "START_EDITING_ITEM";
export const EDIT_ITEM = "EDIT_ITEM";
export const SET_ITEMS = "SET_ITEMS";

// Synchronous Action Creators
export const addItem = () => ({ type: ADD_ITEM });

export const cancelItem = () => ({ type: EMPTY_NEW_ITEM });

export const startEditingItem = (targetItemId: number) => ({
  type: START_EDITING_ITEM,
  targetItemId,
});

export const editItem = (payload: string, targetItemId?: number) => ({
  type: EDIT_ITEM,
  payload,
  targetItemId,
});

// Asynchronous Action Creators

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

// Create item from state.newItem with a POST request to the backend

export const createItem = () => {
  return async (
    dispatch: Dispatch,
  ) => {
    const state = store.getState();
    if (!state.newItem) return;

    try {
      const response = await api({
        method: "POST",
        url: "/items/",
        data: {
          text: state.newItem.text,
          list: 1,
        },
      });
      const newItem: ToDoItemProps = response?.data;
      const items = [...state.items, newItem];
      dispatch({ type: SET_ITEMS, payload: items });
      dispatch({ type: EMPTY_NEW_ITEM });
    } catch (error) {
      console.error("Failed to create item: ", error);
    }
  };
};

export const updateItem = (id: number) => {
  return async (
    dispatch: Dispatch,
  ) => {
    const state = store.getState();
    const itemToUpdate = state.items.find((item) => item.id === id);
    if (!itemToUpdate) return;

    try {
      const response = await api({
        method: "PATCH",
        url: `/items/${id}/`,
        data: {
          text: itemToUpdate.text,
          list: 1,
        },
      });
      const updatedItem: ToDoItemProps = response?.data;
      const items = state.items.map((item) =>
        item.id === id ? updatedItem : item
      );
      dispatch({ type: SET_ITEMS, payload: items });
    } catch (error) {
      console.error("Failed to update item: ", error);
    }
  };
};
