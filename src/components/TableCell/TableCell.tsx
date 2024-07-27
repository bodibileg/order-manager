import { useEffect, useState } from "react";
import { Option } from "../../types";
import { Column, Row, Table } from "@tanstack/react-table";
import TextField from "@mui/material/TextField";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface TableMeta {
  updateCell: (rowIndex: number, columnId: string, value: string) => void;
  editedRows: Record<string, boolean>;
}

interface ColumnMeta {
  type: string;
  options: Option[];
  label: string;
}

interface TableCellProps<TData> {
  getValue: () => string;
  row: Row<TData>;
  column: Column<TData, unknown>;
  table: Table<TData>;
}

const TableCell = <TData,>({
  getValue,
  row,
  column,
  table,
}: TableCellProps<TData>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const tableMeta = table.options.meta as TableMeta;
  const columnMeta = column.columnDef.meta as ColumnMeta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    setTouched(true);
    tableMeta?.updateCell(row.index, column.id, value);
  };

  const onSelectChange = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value);
    tableMeta?.updateCell(row.index, column.id, e.target.value);
  };

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <Select
        labelId="order-type-select"
        value={value}
        label="Order Type"
        onChange={onSelectChange}
        variant="standard"
        size="small"
      >
        {columnMeta?.options?.map((option: Option) => (
          <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
    ) : (
      <TextField
        placeholder={columnMeta?.label}
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        error={touched && value === ""}
        helperText={touched && value === "" && "Please fill out this field"}
        size="small"
      />
    );
  }

  return <span>{value}</span>;
};

export default TableCell;
