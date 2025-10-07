import { ChangeEvent } from "react";
import { EditItemButton } from "./EditItemButton";

export type ToDoItemProps = {
  id?: number;
  text: string;
  isEditing?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreate?: () => void;
  onCancel?: () => void;
  onStartEditing?: () => void;
  onSave?: () => void;
};
export const ToDoItem = ({
  text,
  isEditing = false,
  onChange,
  onCreate,
  onCancel,
  onStartEditing,
  onSave,
}: ToDoItemProps) => {
  return isEditing ? (
    <div className="list-item">
      <input value={text} onChange={onChange} />
      <div className="button-set">
        {onCreate && <button className="create-item-button" onClick={onCreate}>
          V
        </button>}
        {onCancel && <button className="cancel-item-button" onClick={onCancel}>X</button>}
        {onSave && <button className="save-item-button" onClick={onSave}>V</button>}
      </div>
    </div>
  ) : (
    <div className="list-item">
      <span>{text}</span>
      <div className="button-set">
        <EditItemButton onClick={onStartEditing} />
      </div>
    </div>
  );
};
