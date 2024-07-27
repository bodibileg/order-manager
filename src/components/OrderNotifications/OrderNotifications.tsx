import { Slide, Snackbar } from "@mui/material";

interface OrderNotificationsProps {
  error: { message: string } | null;
  open: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

const OrderNotifications = ({
  error,
  open,
  handleClose,
}: OrderNotificationsProps) => {
  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        message={`Error: ${error?.message}`}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Draft order saved"
        TransitionComponent={Slide}
      />
    </>
  );
};

export default OrderNotifications;
