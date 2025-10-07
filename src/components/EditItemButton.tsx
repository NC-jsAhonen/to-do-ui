import PencilIcon from "/pencil-line.svg";

type Props = {
  onClick?: () => void;
};
export const EditItemButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick}>
      <img src={PencilIcon} alt="Edit" />
    </button>
  );
};
