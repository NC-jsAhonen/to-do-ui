import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";

type Props = {
  items: ToDoItemProps[];
  newItem: ToDoItemProps | null;
};
export const ToDoItemList = ({ items, newItem }: Props) => {
  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem {...item} />
      ))}
      {newItem && <ToDoItem {...newItem} />}
      <AddItemButton />
    </div>
  );
};
