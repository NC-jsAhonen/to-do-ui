import { useDispatch, useSelector } from "react-redux";
import { store } from "../state/store";
import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";
import { selectItems, selectNewItem } from "../state/selectors";
import { ChangeEvent } from "react";
import { v4 as uuid } from "uuid";

export const ToDoItemList = () => {
  const items: ToDoItemProps[] = useSelector(selectItems);
  const newItem: ToDoItemProps | null = useSelector(selectNewItem);
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: "ADD_ITEM" });
    logging();
  };

  const editItem = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EDIT_ITEM", payload: e.target.value });
    logging();
  };

  const createItem = () => {
    dispatch({ type: "CREATE_ITEM" });
    logging();
  };

  const logging = () => {
    console.log(store.getState());
  };
  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem key={`to-do-item-${uuid()}`} {...item} onChange={editItem} />
      ))}
      {newItem && (
        <ToDoItem {...newItem} onChange={editItem} onCreate={createItem} />
      )}
      <AddItemButton onClick={addItem} />
    </div>
  );
};
