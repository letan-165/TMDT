import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function DetailRevenue({ data }) {
  return (
    <Container sx={{ py: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
        Danh sách đơn hàng
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr ",
          gap: 2,
          px: 2,
        }}
      >
        {[
          "Mã đơn",
          "Mã thanh toán",
          "Doanh thu",
          "Phương thức thanh toán",
          "Ngày tạo",
          "Trạng thái",
        ].map((h) => (
          <Typography
            key={h}
            sx={{
              fontWeight: "bold",
              fontSize: 13,
              textAlign: "center",
            }}
          >
            {h}
          </Typography>
        ))}
      </Box>
      <Divider />
      <Stack spacing={1} mt={1}>
        {data.map((r, i) => (
          <Paper
            key={r.id}
            sx={{
              px: 2,
              py: 2.2,
              bgcolor: i % 2 ? "transparent" : "background.paper",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr ",
                gap: 2,
              }}
            >
              <Col text={r.id} bold />
              <Col text={r.carrier} bold={undefined} />
              <Col text={fmt(r.revenue)} bold />
              <Col text={r.createdAt} bold={undefined} />
              <Col text={r.deliveryAt} bold={undefined} />
              <Chip
                label={r.status}
                color={color(r.status)}
                size="small"
                sx={{ mx: 1 }}
              />
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

const color = (s) => (s === "Chưa thanh toán" ? "error" : "success");
const fmt = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    v
  );

const Col = ({ text, bold }) => (
  <Typography
    sx={{
      fontWeight: bold ? 700 : 400,
      fontSize: 14,
      textAlign: "center",
      color: bold ? "inherit" : "text.secondary",
    }}
  >
    {text}
  </Typography>
);
