import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "food processing", label: "Food Processing" },
  { value: "out of delivery", label: "Out of Delivery" },
  { value: "delivered", label: "Delivered" },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "warning";
    case "food processing":
      return "info";
    case "out of delivery":
      return "primary";
    case "delivered":
      return "success";
    default:
      return "default";
  }
};

const OrderList = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const displayAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        Status: newStatus,
      });
      if (response.data.success) {
        await displayAllOrders();
      } else {
        alert(response.data.message || "Failed to update status");
      }
    } catch (error) {
      alert("Server error while updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    displayAllOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        All Orders
      </Typography>

      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={4}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Order ID</b></TableCell>
                <TableCell><b>User</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Address</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o._id}>
                  <TableCell>{o._id}</TableCell>
                  <TableCell>{o.userId && o.userId !== "undefined" ? o.userId : "N/A"}</TableCell>
                  <TableCell>
                    <select
                      onChange={(event) => statusHandler(event, o._id)}
                      value={o.Status}
                      style={{ marginRight: 8, padding: "4px 8px", borderRadius: 6 }}
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <Chip
                      label={o.Status}
                      color={getStatusColor(o.Status)}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>₹{o.amount}</TableCell>
                  <TableCell>
                    {new Date(o.date).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {o.address
                      ? `${o.address.firstName} ${o.address.lastName}, ${o.address.city}`
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setSelectedOrder(o)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Order Details
          <IconButton
            onClick={() => setSelectedOrder(null)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedOrder && (
            <>
              <Typography variant="h6" gutterBottom>
                Order #{selectedOrder._id}
              </Typography>

              {/* Items */}
              <Typography variant="subtitle1" gutterBottom>
                Items:
              </Typography>
              <Stack spacing={2}>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item) => (
                    <Card key={item._id} sx={{ display: "flex", p: 1 }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100, borderRadius: 2 }}
                        image={item.image}
                        alt={item.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                        <Typography>
                          ₹{item.price} × {item.quantity}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Typography color="text.secondary">No items in this order.</Typography>
                )}
              </Stack>

              {/* Address */}
              <Box mt={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Address:
                </Typography>
                <Typography>
                  {selectedOrder.address
                    ? `${selectedOrder.address.firstName} ${selectedOrder.address.lastName}, ${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.state} - ${selectedOrder.address.zipcode}`
                    : "N/A"}
                </Typography>
                {selectedOrder.address && (
                  <>
                    <Typography>Email: {selectedOrder.address.email}</Typography>
                    <Typography>Phone: {selectedOrder.address.phone}</Typography>
                  </>
                )}
              </Box>

              {/* Payment */}
              <Box mt={3}>
                <Typography variant="subtitle1" gutterBottom>
                  Payment & Status:
                </Typography>
                <Typography>Status: {selectedOrder.Status}</Typography>
                <Typography>
                  Payment:{" "}
                  {selectedOrder.payment ? "✅ Paid" : "❌ Pending"}
                </Typography>
                <Typography>Total Amount: ₹{selectedOrder.amount}</Typography>
                <Typography>
                  Date: {new Date(selectedOrder.date).toLocaleString()}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrderList;