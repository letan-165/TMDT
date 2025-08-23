import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ButtonLoginCus } from "../../components/atoms/Form/ButtonLoginCus";
import { Paths } from "../../Paths";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lấy dữ liệu từ URL
  const order = {
    txnRef: searchParams.get("vnp_TxnRef"),
    amount: searchParams.get("vnp_Amount"),
    responseCode: searchParams.get("vnp_ResponseCode"),
    bankCode: searchParams.get("vnp_BankCode"),
    payDate: searchParams.get("vnp_PayDate"),
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fafb",
        p: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
          boxShadow: 4,
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 80, mb: 2 }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Thanh toán thành công!
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: "left", mb: 3 }}>
            <Typography variant="body2">
              <strong>Mã đơn hàng:</strong> {order.txnRef}
            </Typography>
            <Typography variant="body2">
              <strong>Số tiền:</strong>{" "}
              {order.amount
                ? (Number(order.amount) / 100).toLocaleString("vi-VN") + "₫"
                : ""}
            </Typography>
            <Typography variant="body2">
              <strong>Ngân hàng:</strong> {order.bankCode}
            </Typography>
            <Typography variant="body2">
              <strong>Thời gian:</strong>{" "}
              {order.payDate
                ? `${order.payDate.substring(6, 8)}/${order.payDate.substring(
                    4,
                    6
                  )}/${order.payDate.substring(0, 4)} 
                   ${order.payDate.substring(8, 10)}:${order.payDate.substring(
                     10,
                     12
                   )}:${order.payDate.substring(12, 14)}`
                : new Date().toLocaleString("vi-VN")}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <ButtonLoginCus
            name="Về trang chủ"
            width={"40%"}
            onClick={() => navigate(Paths.HOME)}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentSuccess;
