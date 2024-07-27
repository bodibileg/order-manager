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
  useTheme,
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
  const theme = useTheme();

  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 2,
        padding: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <TextField
        label="Order ID"
        placeholder="Search Order ID"
        variant="outlined"
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
      <Box sx={{ minWidth: 120 }}>
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
        startIcon={<AddIcon />}
      >
        Create Order
      </Button>
      <Button
        variant="outlined"
        onClick={handleDeleteSelected}
        startIcon={<DeleteIcon />}
      >
        Delete Selected
      </Button>
    </Box>
  );
};

export default OrderControls;
