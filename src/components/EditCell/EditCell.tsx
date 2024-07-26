import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Row, Table } from "@tanstack/react-table";

interface TableMeta {
  setEditedRows: (
    update: (old: Record<string, boolean>) => Record<string, boolean>
  ) => void;
  revertRow: (index: number) => void;
  updateRow: (index: number) => void;
  editedRows: Record<string, boolean>;
}

interface EditCellProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
}

const EditCell = <TData,>({ row, table }: EditCellProps<TData>) => {
  const tableMeta = table.options.meta as TableMeta;

  const setEditedRows = () => {
    tableMeta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };

  const revertRow = () => {
    setEditedRows();
    tableMeta?.revertRow(row.index);
  };

  const updateRow = () => {
    tableMeta?.updateRow(row.index);
  };

  return tableMeta?.editedRows[row.id] ? (
    <div style={{ display: "flex" }}>
      <IconButton onClick={revertRow}>
        <CancelIcon color="error" />
      </IconButton>{" "}
      <IconButton onClick={updateRow}>
        <CheckCircleIcon color="success" />
      </IconButton>
    </div>
  ) : (
    <IconButton onClick={setEditedRows}>
      <EditIcon color="primary" />
    </IconButton>
  );
};

export default EditCell;
