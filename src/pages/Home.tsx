import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrder,
  deleteOrders,
  getOrders,
  getOrdersByType,
  updateOrder,
} from "../services/orderService";
import Orders from "../components/Orders/Orders";

const Home = () => {
  const [orderType, setOrderType] = useState("");

  const {
    data: allOrders,
    isPending: isPendingAll,
    error: errorAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    enabled: !orderType,
  });

  const {
    data: filteredOrders,
    isPending: isPendingFiltered,
    error: errorFiltered,
    refetch: refetchFiltered,
  } = useQuery({
    queryKey: ["ordersByType", orderType],
    queryFn: () => getOrdersByType(orderType),
    enabled: !!orderType,
  });

  const { mutate: update } = useMutation({
    mutationFn: updateOrder,
    onSuccess: orderType ? refetchFiltered : refetchAll,
  });

  const { mutate: create } = useMutation({
    mutationFn: createOrder,
    onSuccess: orderType ? refetchFiltered : refetchAll,
  });

  const { mutate: deleteSelected } = useMutation({
    mutationFn: deleteOrders,
    onSuccess: orderType ? refetchFiltered : refetchAll,
  });

  const data = orderType ? filteredOrders : allOrders;
  const isPending = orderType ? isPendingFiltered : isPendingAll;
  const error = orderType ? errorFiltered : errorAll;

  return (
    <Orders
      orders={data}
      loading={isPending}
      orderType={orderType}
      error={error}
      setOrderType={setOrderType}
      update={update}
      create={create}
      deleteSelected={deleteSelected}
    />
  );
};

export default Home;
