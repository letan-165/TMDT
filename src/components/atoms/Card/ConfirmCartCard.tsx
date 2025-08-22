import { Box, Stack, Typography } from "@mui/material";
import { CartItem } from "../../../apis/dto/Response";

const ConfirmCartCard = ({ item }: { item: CartItem }) => {
  return (
    <Stack
      direction={"row"}
      key={item.productId._id}
      alignItems="center"
      bgcolor="white"
      boxShadow={1}
      borderRadius={1}
      p={2}
      pr={10}
      mb={5}
      gap={2}
    >
      {/* Ảnh */}
      <Box
        component="img"
        src={item.productId.images[0] || "/public/images/productInvalid.png"}
        alt={item.productId.name}
        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
      />

      {/* thông tin */}
      <Box flex={5}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {item.productId.name}
        </Typography>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          mt={0.5}
          gap={1}
        >
          <Typography variant="body2" color="text.secondary">
            Shop: {item.productId.storeId.name}
          </Typography>
          <Stack direction={"row"} gap={5}>
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "#999" }}
            >
              {item.productId.price.toLocaleString()} đ
            </Typography>
            <Typography variant="body2" color="error" fontWeight="bold">
              {item.productId.finalPrice.toLocaleString()} đ
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Số lượng */}
      <Typography
        flex={2}
        variant="body2"
        sx={{ width: 50, textAlign: "center", fontSize: 20 }}
      >
        SL: {item.quantity}
      </Typography>

      {/* Tổng tiền */}
      <Typography
        flex={2}
        variant="body2"
        color="error"
        fontWeight="bold"
        sx={{ ml: 2, minWidth: 80, textAlign: "right" }}
      >
        Tổng: {(item.productId.finalPrice * item.quantity).toLocaleString()} đ
      </Typography>
    </Stack>
  );
};

export default ConfirmCartCard;
