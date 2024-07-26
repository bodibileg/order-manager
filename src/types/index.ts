export type Order = {
  orderId?: string;
  orderType: string;
  customerName: string;
  createdDate?: string;
  createdByUserName: string;
};

export type Option = {
  value: string;
  label: string;
};
