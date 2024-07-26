import { useEffect, useMemo, useState } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Order } from "../../types";
import { columns } from "../OrderTable/columns";
import { validateOrder } from "../../utils/validate";
import OrderTable from "../OrderTable/OrderTable";
import "./styles.css";

interface OrdersProps {
  orders: Order[];
  loading: boolean;
  orderType: string;
  error: { message: string } | null;
  setOrderType: (orderType: string) => void;
  create: (order: Order) => void;
  update: (order: Order) => void;
  deleteSelected: (orderIds: string[]) => void;
}

const Orders = ({
  orders,
  loading,
  orderType,
  error,
  setOrderType,
  create,
  update,
  deleteSelected,
}: OrdersProps) => {
  const [editedRows, setEditedRows] = useState({});
  const [data, setData] = useState<Order[]>([]);
  const [originalData, setOriginalData] = useState<Order[]>([]);
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    if (orders) {
      setData(orders);
      setOriginalData(orders);
      setDelayed(false);
      const timer = setTimeout(() => {
        setDelayed(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [orders]);

  const tableData = useMemo(
    () => (!delayed || loading ? Array(10).fill({}) : data),
    [delayed, loading, data]
  );

  const tableColumns = useMemo(
    () =>
      !delayed || loading
        ? columns.map((column) => ({
            ...column,
            cell: () => (
              <Skeleton variant="text" animation="wave" width={200} />
            ),
          }))
        : columns,
    [loading, delayed]
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    meta: {
      editedRows,
      setEditedRows,
      updateCell: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      revertRow: (rowIndex: number) => {
        setData((old) => {
          if (originalData[rowIndex]) {
            return old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            );
          } else {
            return old.filter((_, index) => index !== rowIndex);
          }
        });
      },
      updateRow: (rowIndex: number) => {
        const order = data[rowIndex];
        if (!validateOrder(order)) {
          return;
        }
        order.orderId ? update(order) : create(order);
        setEditedRows((old) => ({
          ...old,
          [rowIndex]: false,
        }));
      },
    },
  });

  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as string);
  };

  const handleCreateOrder = () => {
    const emptyOrder: Order = {
      orderType: orderType || "Standard",
      customerName: "",
      createdByUserName: "",
    };
    setData((old) => [...old, emptyOrder]);
    setEditedRows((old) => ({
      ...old,
      [data.length]: true,
    }));
  };

  const handleDeleteSelected = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const orderIds = selectedRows
      .map((row) => row.original.orderId)
      .filter((orderId): orderId is string => orderId !== undefined);
    deleteSelected(orderIds);
  };

  return (
    <>
      {error && (
        <div className="error">
          <span className="error-message">{error.message}</span>
        </div>
      )}
      <div className="controls">
        <Button
          variant="contained"
          onClick={handleCreateOrder}
          sx={{ minWidth: 100 }}
        >
          <AddIcon /> Create Order
        </Button>
        <Button
          variant="outlined"
          onClick={handleDeleteSelected}
          sx={{ minWidth: 100 }}
        >
          <DeleteIcon /> Delete Selected
        </Button>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="order-type-select">Order Type</InputLabel>
            <Select
              labelId="order-type-select"
              value={orderType}
              label="Order Type"
              onChange={handleOrderTypeChange}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="SaleOrder">SaleOrder</MenuItem>
              <MenuItem value="PurchaseOrder">PurchaseOrder</MenuItem>
              <MenuItem value="TransferOrder">TransferOrder</MenuItem>
              <MenuItem value="ReturnOrder">ReturnOrder</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Customer Search"
          variant="outlined"
          sx={{ minWidth: 150 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <OrderTable table={table} />
    </>
  );
};

export default Orders;
