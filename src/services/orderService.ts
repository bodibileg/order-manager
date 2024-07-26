import axios from "axios";
import { Order } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    ApiKey: import.meta.env.VITE_API_KEY,
  },
});

export const getOrders = async () => {
  try {
    const response = await api.get("/Orders");
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getOrdersByType = async (orderType: string) => {
  try {
    const response = await api.get(`/Orders/ByType`, { params: { orderType } });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const createOrder = async (order: Order) => {
  try {
    const response = await api.post("/Orders", order);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const response = await api.put("/Orders", order);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const deleteOrders = async (orderIds: string[]) =>
{
  try {
    const response = await api.post("/Orders/Delete", orderIds);
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
}
