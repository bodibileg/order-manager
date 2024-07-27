import { useEffect, useMemo, useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import { Order } from "../../types";
import { columns } from "../OrderTable/columns";
import { validateOrder } from "../../utils/validate";
import OrderTable from "../OrderTable/OrderTable";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { setDraftOrder } from "../../store/orderSlice";
import OrderControls from "../OrderControls/OrderControls";
import OrderNotifications from "../OrderNotifications/OrderNotifications";

export interface OrdersProps {
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
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const draftOrder = useSelector((state: RootState) => state.order.draftOrder);
  const dispatch: AppDispatch = useDispatch();

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
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
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
        const revertedOrder = data[rowIndex];
        if (revertedOrder && !revertedOrder.orderId) {
          dispatch(setDraftOrder(revertedOrder));
          setNotificationOpen(true);
        }
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
        if (order.orderId) {
          update(order);
        } else {
          create(order);
          dispatch(setDraftOrder(null));
        }
        setEditedRows((old) => ({
          ...old,
          [rowIndex]: false,
        }));
      },
    },
  });

  const handleCreateOrder = () => {
    const newOrder: Order = draftOrder || {
      orderType: orderType || "Standard",
      customerName: "",
      createdByUserName: "",
    };
    setData((old) => [...old, newOrder]);
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
    table.resetRowSelection();
    deleteSelected(orderIds);
  };

  const handleCloseNotification = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setNotificationOpen(false);
  };

  return (
    <>
      <OrderControls
        orderType={orderType}
        setOrderType={setOrderType}
        handleCreateOrder={handleCreateOrder}
        handleDeleteSelected={handleDeleteSelected}
        table={table}
      />
      <OrderTable table={table} />
      <OrderNotifications
        error={error}
        open={notificationOpen}
        handleClose={handleCloseNotification}
      />
    </>
  );
};

export default Orders;
