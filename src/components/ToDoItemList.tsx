import { useDispatch, useSelector } from "react-redux";
import { store } from "../state/store";
import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";
import { selectItems, selectNewItem } from "../state/selectors";
import { ChangeEvent } from "react";

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

  const logging = () => {
    console.log(store.getState());
  };
  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem {...item} />
      ))}
      {newItem && <ToDoItem {...newItem} onChange={editItem} />}
      <AddItemButton onClick={addItem} />
    </div>
  );
};
