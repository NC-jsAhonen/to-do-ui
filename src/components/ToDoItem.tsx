import { ChangeEvent } from "react";
import { EditItemButton } from "./EditItemButton";

export type ToDoItemProps = {
  id?: number;
  text: string;
  isEditing?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreate?: () => void;
  onCancel?: () => void;
};
export const ToDoItem = ({
  text,
  isEditing = false,
  onChange,
  onCreate,
  onCancel,
}: ToDoItemProps) => {
  return isEditing ? (
    <div className="list-item">
      <input value={text} onChange={onChange} />
      <div className="button-set">
        <button className="create-item-button" onClick={onCreate}>
          V
        </button>
        <button className="cancel-item-button" onClick={onCancel}>X</button>
      </div>
    </div>
  ) : (
    <div className="list-item">
      <span>{text}</span>
      <div className="button-set">
        <EditItemButton onClick={() => console.log("Edit clicked")} />
      </div>
    </div>
  );
};
