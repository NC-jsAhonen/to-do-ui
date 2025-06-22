import { ChangeEvent } from "react";

export type ToDoItemProps = {
  id?: number;
  text: string;
  isEditing?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const ToDoItem = ({
  text,
  isEditing = false,
  onChange,
}: ToDoItemProps) => {
  return isEditing ? (
    <div className="list-item">
      <input value={text} onChange={onChange} />
      <div className="button-set">
        <button className="create-item-button">V</button>
        <button className="cancel-item-button">X</button>
      </div>
    </div>
  ) : (
    <div className="list-item">{text}</div>
  );
};
