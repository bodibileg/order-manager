import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "@tanstack/react-table";

interface OrderControlsProps<TData> {
  orderType: string;
  setOrderType: (orderType: string) => void;
  handleCreateOrder: () => void;
  handleDeleteSelected: () => void;
  table: Table<TData>;
}

const OrderControls = <TData,>({
  orderType,
  setOrderType,
  handleCreateOrder,
  handleDeleteSelected,
  table,
}: OrderControlsProps<TData>) => {
  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as string);
  };

  return (
    <div className="controls">
      <TextField
        label="Order ID"
        placeholder="Search Order ID ..."
        variant="outlined"
        sx={{ minWidth: 150 }}
        value={table.getColumn("orderId")?.getFilterValue() || ""}
        onChange={(event) => {
          table.getColumn("orderId")?.setFilterValue(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
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
    </div>
  );
};

export default OrderControls;
