import { createColumnHelper } from "@tanstack/react-table";
import EditCell from "../EditCell/EditCell";
import TableCell from "../TableCell/TableCell";
import { Order } from "../../types";
import RowCheckbox from "../RowCheckbox/RowCheckbox";

const columnHelper = createColumnHelper<Order>();

export const columns = [
  columnHelper.display({
    id: "checkbox",
    cell: RowCheckbox,
  }),
  columnHelper.accessor("orderId", {
    header: "Order ID",
  }),
  columnHelper.accessor("createdDate", {
    header: "Creation Date",
  }),
  columnHelper.accessor("createdByUserName", {
    header: "Created By",
    cell: TableCell,
    meta: {
      label: "Created By",
    }
  }),
  columnHelper.accessor("orderType", {
    header: "Order Type",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Standard", label: "Standard" },
        { value: "SaleOrder", label: "SaleOrder" },
        { value: "PurchaseOrder", label: "PurchaseOrder" },
        { value: "TransferOrder", label: "TransferOrder" },
        { value: "ReturnOrder", label: "ReturnOrder" },
      ],
    },
  }),
  columnHelper.accessor("customerName", {
    header: "Customer",
    cell: TableCell,
    meta: {
      label: "Customer Name",
    }
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];
