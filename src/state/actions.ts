// actions.ts
import { Dispatch } from "redux";
import api from "../api/api-instance";
import { ToDoItemProps } from "../types";
import { 
  store, 
  AddItemAction,
  EmptyNewItemAction,
  StartEditingItemAction,
  EditItemAction,
  SetItemsAction,
  ADD_ITEM,
  EMPTY_NEW_ITEM,
  START_EDITING_ITEM,
  EDIT_ITEM,
  SET_ITEMS
} from "./store";

// Synchronous Action Creators
export const addItem = (): AddItemAction => ({ type: ADD_ITEM });

export const cancelItem = (): EmptyNewItemAction => ({ type: EMPTY_NEW_ITEM });

export const startEditingItem = (targetItemId: number): StartEditingItemAction => ({
  type: START_EDITING_ITEM,
  targetItemId,
});

export const editItem = (payload: string, targetItemId?: number): EditItemAction => ({
  type: EDIT_ITEM,
  payload,
  targetItemId,
});

// Asynchronous Action Creators
export const fetchItems = () => {
  return async (dispatch: Dispatch<SetItemsAction>) => {
    try {
      const response = await api({
        method: "GET",
        url: "/lists/1/",
      });
      const items: ToDoItemProps[] = response?.data?.items || [];
      dispatch({ type: SET_ITEMS, payload: items });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const responseError = error as { response?: { data?: { detail?: string } } };
        if (responseError?.response?.data?.detail === "No List matches the given query.") {
          try {
            const response = await api({
              method: "POST",
              url: "/lists/",
            });
            const items: ToDoItemProps[] = response?.data?.items || [];
            dispatch({ type: SET_ITEMS, payload: items });
          } catch (createError) {
            console.error("Automatic list creation failed: ", createError);
          }
        } else {
          console.error("Failed to fetch items: ", error);
        }
      } else {
        console.error("Failed to fetch items: ", error);
      }
    }
  };
};

// Create item from state.newItem with a POST request to the backend
export const createItem = () => {
  return async (dispatch: Dispatch<SetItemsAction | EmptyNewItemAction>) => {
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
  return async (dispatch: Dispatch<SetItemsAction>) => {
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

export const deleteItem = (id: number) => {
  return async (dispatch: Dispatch<SetItemsAction>) => {
    try {
      await api({
        method: "DELETE",
        url: `/items/${id}/`,
      });
      const state = store.getState();
      const items = state.items.filter((item) => item.id !== id);
      dispatch({ type: SET_ITEMS, payload: items });
    } catch (error) {
      console.error("Failed to delete item: ", error);
    }
  };
};

export const toggleItemDone = (id: number) => {
  return async (dispatch: Dispatch<SetItemsAction>) => {
    try {
      const response = await api({
        method: "PATCH",
        url: `/items/${id}/check/`,
      });
      const updatedItem: ToDoItemProps = response?.data;
      const state = store.getState();
      const items = state.items.map((item) =>
        item.id === id ? updatedItem : item
      );
      dispatch({ type: SET_ITEMS, payload: items });
    } catch (error) {
      console.error("Failed to toggle item done status: ", error);
    }
  };
};