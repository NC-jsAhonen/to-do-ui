import { store } from "../state/store";

// type Props = {};
export const AddItemButton = () => {
  const addItem = () => {
    store.dispatch({ type: "ADD_ITEM" });
  };

  return <button onClick={addItem}>+</button>;
};
