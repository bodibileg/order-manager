import { Row } from "@tanstack/react-table";

const RowCheckbox = <TData,>({ row }: { row: Row<TData> }) => {
  return (
    <input
      type="checkbox"
      checked={row.getIsSelected()}
      onChange={row.getToggleSelectedHandler()}
    />
  );
};

export default RowCheckbox;
