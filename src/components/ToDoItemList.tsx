import { useDispatch, useSelector } from "react-redux";
import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";
import { selectItems, selectNewItem } from "../state/selectors";
import { ChangeEvent, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { cancelItem, fetchItems } from "../state/actions";

export const ToDoItemList = () => {
  const items: ToDoItemProps[] = useSelector(selectItems);
  const newItem: ToDoItemProps | null = useSelector(selectNewItem);
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch({ type: "ADD_ITEM" });
  };

  const editItem = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "EDIT_ITEM", payload: e.target.value });
  };

  const createItem = () => {
    dispatch({ type: "CREATE_ITEM" });
  };
  
  const handleCancelItem = () => {
    dispatch(cancelItem());
  };

  useEffect(() => {
    //@ts-expect-error: Argument of type '(dispatch: Dispatch) => Promise<void>' is not assignable to parameter of type 'UnknownAction'.
    dispatch(fetchItems());
  }, []);

  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem key={`to-do-item-${uuid()}`} {...item} onChange={editItem} />
      ))}
      {newItem && (
        <ToDoItem {...newItem} onChange={editItem} onCreate={createItem} onCancel={handleCancelItem} />
      )}
      <AddItemButton onClick={addItem} />
    </div>
  );
};
