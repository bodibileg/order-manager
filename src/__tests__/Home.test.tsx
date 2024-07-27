import { fireEvent, render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { useQuery } from "@tanstack/react-query";
import Home from "../pages/Home";
import { OrdersProps } from "../components/Orders/Orders";

// Mock the Orders component
vi.mock("../components/Orders/Orders", () => ({
  __esModule: true,
  default: (props: OrdersProps) => {
    return (
      <div>
        <button
          data-testid="filter"
          onClick={() => props.setOrderType("Standard")}
        />
        <div data-testid="loading">
          {props.loading ? "Loading..." : "Loaded"}
        </div>
        <div data-testid="error">{props.error ? "Error" : "No Error"}</div>
        <div data-testid="orders">
          {props.orders && props.orders.length > 0
            ? props.orders.map((order) => (
                <span key={order.orderId}>
                  {order.orderId} {order.orderType} {order.customerName}\n
                </span>
              ))
            : "No Orders"}
        </div>
      </div>
    );
  },
}));

// Mock the useQuery and useMutation hooks
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn().mockReturnValue({
    mutate: vi.fn(),
  }),
}));

vi.mock("../services/orderService", () => ({
  getOrders: vi.fn(),
  getOrdersByType: vi.fn(),
  updateOrder: vi.fn(),
  createOrder: vi.fn(),
  deleteOrders: vi.fn(),
}));

const mockOrders = [
  { orderId: "1", orderType: "Standard", customerName: "Customer1" },
  { orderId: "2", orderType: "SaleOrder", customerName: "Customer2" },
  { orderId: "3", orderType: "PurchaseOrder", customerName: "Customer3" },
  { orderId: "4", orderType: "TransferOrder", customerName: "Customer4" },
  { orderId: "5", orderType: "ReturnOrder", customerName: "Customer5" },
  { orderId: "6", orderType: "Standard", customerName: "Customer6" },
];

describe("Home Component", () => {
  it("should fetch all orders when there is no orderType", async () => {
    (useQuery as Mock).mockImplementation(
      ({ queryKey }: { queryKey: string[] }) => {
        if (queryKey[0] === "orders") {
          return {
            data: mockOrders,
            isPending: false,
            error: null,
            refetch: vi.fn(),
          };
        }
        return { data: [], isPending: false, error: null, refetch: vi.fn() };
      }
    );

    render(<Home />);

    expect(screen.getByTestId("loading")).toHaveTextContent("Loaded");
    expect(screen.getByTestId("orders")).toHaveTextContent(
      "1 Standard Customer1"
    );
    expect(screen.getByTestId("orders")).toHaveTextContent(
      "2 SaleOrder Customer2"
    );
    expect(screen.getByTestId("orders")).toHaveTextContent(
      "3 PurchaseOrder Customer3"
    );
    expect(screen.getByTestId("orders")).toHaveTextContent(
      "4 TransferOrder Customer4"
    );
    expect(screen.getByTestId("error")).toHaveTextContent("No Error");
  });

  it("should fetch filtered orders when there is an orderType", async () => {
    (useQuery as Mock).mockImplementation(
      ({ queryKey }: { queryKey: string[] }) => {
        if (queryKey[0] === "ordersByType") {
          return {
            data: mockOrders.filter((order) => order.orderType === queryKey[1]),
            isPending: false,
            error: null,
            refetch: vi.fn(),
          };
        }
        return { data: [], isPending: false, error: null, refetch: vi.fn() };
      }
    );

    render(<Home />);
    fireEvent.click(screen.getByTestId("filter"));

    expect(screen.getByTestId("loading")).toHaveTextContent("Loaded");
    expect(screen.getByTestId("orders")).toHaveTextContent(
      "1 Standard Customer1"
    );
    expect(screen.getByTestId("orders")).toHaveTextContent(
      `6 Standard Customer6`
    );
    expect(screen.getByTestId("orders")).not.toHaveTextContent(
      "2 SaleOrder Customer2"
    );
    expect(screen.getByTestId("error")).toHaveTextContent("No Error");
  });
});
``;
