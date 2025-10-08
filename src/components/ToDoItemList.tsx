import { useDispatch, useSelector } from "react-redux";
import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";
import { selectItems, selectNewItem } from "../state/selectors";
import { ChangeEvent, useEffect } from "react";
import { cancelItem, fetchItems, updateItem } from "../state/actions";
import { createItem } from "../state/actions";

export const ToDoItemList = () => {
  const items: ToDoItemProps[] = useSelector(selectItems);
  const newItem: ToDoItemProps | null = useSelector(selectNewItem);
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: "ADD_ITEM" });
  };

  const editItem = (text: string, id?: number) => {
    dispatch({ type: "EDIT_ITEM", payload: text, targetItemId: id });
  };

  const handleCreateItem = () => {
    //@ts-expect-error: Argument of type '(dispatch: Dispatch) => Promise<void>' is not assignable to parameter of type 'UnknownAction'.
    dispatch(createItem());
  };

  const handleCancelItem = () => {
    dispatch(cancelItem());
  };

  const handleStartEditingItem = (id: number) => {
    dispatch({ type: "START_EDITING_ITEM", targetItemId: id });
  };

  const handleUpdateItem = (id: number) => {
    //@ts-expect-error: Argument of type '(dispatch: Dispatch) => Promise<void>' is not assignable to parameter of type 'UnknownAction'.
    dispatch(updateItem(id));
  };

  useEffect(() => {
    //@ts-expect-error: Argument of type '(dispatch: Dispatch) => Promise<void>' is not assignable to parameter of type 'UnknownAction'.
    dispatch(fetchItems());
  }, []);

  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem
          key={`to-do-item-${item.id}`}
          {...item}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            editItem(e.target.value, item.id);
          }}
          onStartEditing={() => handleStartEditingItem(item.id)}
          onSave={() => handleUpdateItem(item.id)}
        />
      ))}
      {newItem && (
        <ToDoItem
          {...newItem}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            editItem(e.target.value);
          }}
          onCreate={handleCreateItem}
          onCancel={handleCancelItem}
        />
      )}
      <AddItemButton onClick={addItem} />
    </div>
  );
};
