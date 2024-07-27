import { Row } from "@tanstack/react-table";
import Checkbox from "@mui/material/Checkbox";

const RowCheckbox = <TData,>({ row }: { row: Row<TData> }) => {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onChange={row.getToggleSelectedHandler()}
      color="primary"
    />
  );
};

export default RowCheckbox;
