import { Order } from "../types";

export const validateOrder = (order: Order) => {
  if (!order.createdByUserName || order.createdByUserName === "") {
    return false;
  }
  if (!order.customerName || order.customerName === "") {
    return false;
  }
  return true;
};
