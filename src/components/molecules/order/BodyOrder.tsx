import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { Order } from "../../../apis/dto/Response";
import CardOrder from "../../atoms/Card/CardOrder";
import LoadingCus from "../../atoms/LoadingCus";

export default function BodyOrder({ orders }: { orders?: Order[] }) {
  const gridTemplateColumns = "1fr 2fr 1fr 3fr 2fr 2fr 2fr";
  return (
    <Container sx={{ py: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", pb: 2 }}>
        Danh sách đơn hàng
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: 2,
          px: 2,
        }}
      >
        {[
          "Mã đơn",
          "Doanh thu",
          "Người đặt",
          "Phương thức thanh toán",
          "Ngày tạo",
          "Trạng thái",
          "Thao tác",
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
      {!orders ? (
        <LoadingCus />
      ) : (
        <Stack spacing={1} mt={1}>
          {orders.map((order, i) => (
            <CardOrder
              order={order}
              i={i}
              gridTemplateColumns={gridTemplateColumns}
            />
          ))}
        </Stack>
      )}
    </Container>
  );
}
