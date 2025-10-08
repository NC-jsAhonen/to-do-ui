import { ChangeEvent } from "react";
import { EditItemButton } from "./EditItemButton";
import DeleteIcon from "/delete-bin-line.svg";

export type ToDoItemProps = {
  id?: number;
  done?: boolean;
  text: string;
  isEditing?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onCreate?: () => void;
  onCancel?: () => void;
  onStartEditing?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
};
export const ToDoItem = ({
  done = false,
  text,
  isEditing = false,
  onChange,
  onCreate,
  onCancel,
  onStartEditing,
  onSave,
  onDelete,
  onToggle,
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
        {onDelete && <button onClick={onDelete}>
          <img src={DeleteIcon} alt="Delete" />
        </button>}
      </div>
    </div>
  ) : (
    <div className="list-item">
      <input type="checkbox" onChange={onToggle} checked={done} />
      <span>{text}</span>
      <div className="button-set">
        <EditItemButton onClick={onStartEditing} />
      </div>
    </div>
  );
};
