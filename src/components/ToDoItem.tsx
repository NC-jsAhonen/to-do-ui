import { useState } from "react";

export type ToDoItemProps = {
  id?: number;
  text: string;
  isEditing?: boolean;
};
export const ToDoItem = ({ text, isEditing = false }: ToDoItemProps) => {
  const [editableText] = useState<string>(text);
  return isEditing ? (
    <div className="list-item">
      <input value={editableText} />
      <div className="button-set">
        <button className="create-item-button">V</button>
        <button className="cancel-item-button">X</button>
      </div>
    </div>
  ) : (
    <div className="list-item">{text}</div>
  );
};
