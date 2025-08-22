import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { OrderRequest } from "../../../apis/dto/Request";
import { CartItem } from "../../../apis/dto/Response";
import ConfirmCartCard from "../../atoms/Card/ConfirmCartCard";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";

const ConfirmCart = ({
  items,
  setPage,
}: {
  items: CartItem[];
  setPage: (page) => void;
}) => {
  const handlePayment = () => {
    const request: OrderRequest = {
      userId: localStorage.getItem("userID") || "",
      items: items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.finalPrice,
        sellerId: item.productId.sellerId,
      })),
    };
    console.log("request", request);
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const discount = items.reduce(
    (sum, item) =>
      sum + (item.productId.price - item.productId.finalPrice) * item.quantity,
    0
  );

  const finalTotal = totalPrice - discount;

  const summaryData = [
    { label: "Tổng tiền hàng", value: `${totalPrice.toLocaleString()} đ` },
    { label: "Giảm giá sản phẩm", value: `${discount.toLocaleString()} đ` },
    { label: "Tiết kiệm", value: `${discount.toLocaleString()} đ` },
    { label: "Tổng số tiền", value: `${finalTotal.toLocaleString()} đ` },
  ];

  const paymentMethods = [
    "Chuyển khoản ngân hàng",
    "VNPay",
    "Trả khi nhận hàng",
  ];

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  return (
    <Stack>
      <Box bgcolor={"#fffcb2"} m={5} p={5} borderRadius={5}>
        {items.length === 0 ? (
          <Typography>Không có sản phẩm nào được chọn.</Typography>
        ) : (
          items.map((item) => (
            <ConfirmCartCard key={item.productId._id} item={item} />
          ))
        )}
      </Box>
      {/* Thông tin giá tiền */}
      <Stack
        direction={"row"}
        sx={{
          p: 3,
          border: "1px solid black",
          bgcolor: "#F5F5F5",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Stack flex={1} padding={5}>
          <Paper sx={{ p: 5, bgcolor: "#ffeccd", borderRadius: 2, flex: 1 }}>
            <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "1.1rem" }}>
              Phương thức thanh toán
            </Typography>
            <Stack spacing={1} pt={1}>
              {paymentMethods.map((method) => (
                <Chip
                  key={method}
                  label={method}
                  onClick={() => setSelectedPayment(method)}
                  sx={{
                    bgcolor: selectedPayment === method ? "#ff9900" : "#ffd190", // cam nếu chọn
                    fontWeight: 500,
                    height: 40,
                    width: "100%",
                    fontSize: "0.9rem",
                    mb: 0.5,
                    borderRadius: 1,
                    cursor: "pointer",
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Stack>
        <Stack flex={1}>
          {summaryData.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {item.label}
              </Typography>
              <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Stack flex={1}>
          <Box sx={{ textAlign: "center", pb: 4 }}>
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              Số tiền cuối cùng thanh toán
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#f44336",
                fontWeight: "bold",
                fontSize: 40,
              }}
            >
              {summaryData[3].value}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack alignItems={"flex-end"} mt={5} mr={5}>
        <ButtonLoginCus
          name="Thanh toán"
          width={"15%"}
          onClick={handlePayment}
        />
      </Stack>
    </Stack>
  );
};

export default ConfirmCart;
