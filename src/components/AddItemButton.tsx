import { store } from "../state/store";

type Props = {
  onClick: () => void;
};
export const AddItemButton = ({ onClick }: Props) => {
  return <button onClick={onClick}>+</button>;
};
