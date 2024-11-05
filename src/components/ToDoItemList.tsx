import { AddItemButton } from "./AddItemButton";
import { ToDoItem, ToDoItemProps } from "./ToDoItem";

type Props = {
  items: ToDoItemProps[];
};
export const ToDoItemList = ({ items }: Props) => {
  return (
    <div className="to-do-item-list">
      {items.map((item) => (
        <ToDoItem {...item} />
      ))}
      <AddItemButton />
    </div>
  );
};
