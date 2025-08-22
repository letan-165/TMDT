import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Chip,
  ChipProps,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Order } from "../../../apis/dto/Response";
import OrderService from "../../../apis/services/OrderService";
import { formatTime, formatVND } from "../../util/FunctionCus";

const CardOrder = ({
  i,
  order,
  gridTemplateColumns,
  isAdmin,
}: {
  i: number;
  order: Order;
  gridTemplateColumns: string;
  isAdmin: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const listState = ["PENDING", "CONFIRMED", "SHIPPING", "COMPLETED"] as const;

  const handleStatus = async (order, index) => {
    const status = order.status;
    const currentIndex = listState.indexOf(status);
    const newStatus = listState[currentIndex + index];

    try {
      await OrderService.updateStatus(order._id, newStatus);
      window.location.reload();
    } catch (error) {
      alert("Lỗi hệ thống");
      throw error;
    }
  };

  const itemUn = {
    icon: <ArrowBackIcon sx={{ color: "white" }} />,
    label: "",
    color: "white",
    onClick: () => setOpen((prev) => !prev),
  };

  const items = [
    isAdmin
      ? {
          icon: <ArrowBackIcon />,
          label: "Quay lại",
          color: "black",
          onClick: (order) => {
            handleStatus(order, -1);
          },
        }
      : itemUn,
    {
      icon: <ShoppingBagIcon />,
      label: "Xem",
      color: "blue",
      onClick: () => setOpen((prev) => !prev),
    },
    isAdmin
      ? {
          icon: <ArrowForwardIcon />,
          label: "Tiếp tục",
          color: "red",
          onClick: (order) => {
            handleStatus(order, 1);
          },
        }
      : itemUn,
  ];

  return (
    <Paper
      key={order._id}
      sx={{
        px: 2,
        py: 2.2,
        bgcolor: i % 2 ? "transparent" : "background.paper",
      }}
    >
      {/* Thông tin chính */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: 2,
        }}
      >
        <Col text={order._id} bold={undefined} />
        <Col text={formatVND(order.totalAmount)} bold />
        <Col text={order.userId} bold={undefined} />
        <Col text={"Đã thanh toán"} bold={undefined} />
        <Col text={formatTime(order.createdAt)} bold={undefined} />
        <Chip
          label={order.status}
          color={color(order.status)}
          size="small"
          sx={{ mx: 1 }}
        />
        <Stack direction="row" justifyContent="center">
          {items.map((item, i) =>
            (i === 0 && order.status === "PENDING") ||
            (i === listState.length - 2 && order.status === "COMPLETED") ? (
              <Stack flex={1} />
            ) : (
              <Stack
                flex={1}
                onClick={() => item.onClick(order)}
                key={i}
                alignItems="center"
              >
                <IconButton sx={{ color: item.color, p: 0 }}>
                  {item.icon}
                </IconButton>
                <Typography sx={{ px: 1, fontSize: 10 }}>
                  {item.label}
                </Typography>
              </Stack>
            )
          )}
        </Stack>
      </Box>

      {/* Danh sách sản phẩm (collapse) */}
      <Collapse in={open}>
        <Divider sx={{ my: 1 }} />
        <Stack direction={"row"}>
          {/* Ảnh shop */}
          <Box
            component="img"
            src="/public/images/image.png"
            alt="Shop"
            sx={{
              width: "50%",
              height: "50%",
              objectFit: "cover",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          />

          {/* Danh sách sản phẩm */}
          <Stack
            spacing={1}
            sx={{ px: 2, pb: 1, flex: 1 }}
            alignItems={"center"}
          >
            {/* Header */}
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 3fr 1fr 2fr",
                alignItems: "center",
                pb: 0.5,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Col text={"Mã"} bold />
              <Col text={"Tên SP"} bold />
              <Col text={"Số lượng"} bold />
              <Col text={"Giá"} bold />
            </Box>

            {/* Data */}
            {order.items?.map((it, i) => (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "1fr 3fr 1fr 2fr",
                  alignItems: "center",
                  py: 0.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Col text={it.productId?._id} bold={undefined} />
                <Col text={it.productId?.name} bold={undefined} />
                <Col text={it.quantity} bold />
                <Col text={formatVND(it.price)} bold />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Collapse>
    </Paper>
  );
};

const stateColorMap: Record<string, ChipProps["color"]> = {
  PENDING: "default",
  CONFIRMED: "info",
  SHIPPING: "warning",
  COMPLETED: "success",
};

const color = (status: string): ChipProps["color"] =>
  stateColorMap[status] || "default";

const Col = ({ text, bold }) => (
  <Typography
    noWrap
    sx={{
      fontWeight: bold && "bold",
      fontSize: 14,
      textAlign: "center",
      color: bold ? "inherit" : "text.secondary",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </Typography>
);

export default CardOrder;
