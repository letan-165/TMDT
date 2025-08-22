import { Add, Delete, Remove } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { CartItem } from "../../../apis/dto/Response";
import CartService from "../../../apis/services/CartService";

const ProductCartCard = ({
  item,
  cartID,
  setItems,
}: {
  item: CartItem;
  cartID: string;
  setItems: (item) => void;
}) => {
  // Chọn / bỏ chọn 1 sản phẩm
  const toggleSelectItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId._id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Tăng / giảm số lượng sản phẩm
  const changeQuantity = async (id, quantity) => {
    await CartService.updateQuantity(cartID, id, item.quantity + quantity);
    window.location.reload();
  };

  // Xóa sản phẩm khỏi giỏ
  const removeItem = async (id) => {
    await CartService.delete(cartID, id);
  };

  return (
    <Box
      key={item.productId._id}
      display="flex"
      alignItems="center"
      bgcolor="white"
      boxShadow={1}
      borderRadius={1}
      mb={2}
      p={1}
      gap={2}
    >
      <Checkbox
        checked={item.selected}
        onChange={() => toggleSelectItem(item.productId._id)}
        sx={{
          color: item.selected ? "orange" : undefined,
          "&.Mui-checked": {
            color: "orange",
          },
        }}
      />
      <Box
        component="img"
        src={item.productId.images[0] || "/public/images/productInvalid.png"}
        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 1 }}
      />
      <Box flex={1}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {item.productId.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Shop: {item.productId.storeId.name}
        </Typography>
        <Box display="flex" alignItems="center" mt={0.5} gap={1}>
          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#999" }}
          >
            {item.productId.price.toLocaleString()} đ
          </Typography>
          <Typography variant="body2" color="error" fontWeight="bold">
            {item.productId.finalPrice.toLocaleString()} đ
          </Typography>
        </Box>
      </Box>

      {/* Số lượng */}
      <Box
        display="flex"
        alignItems="center"
        bgcolor="#ddd"
        borderRadius={1}
        px={1}
      >
        <IconButton
          size="small"
          onClick={() => changeQuantity(item.productId._id, -1)}
          disabled={item.quantity === 1}
        >
          <Remove />
        </IconButton>
        <Typography variant="body2" sx={{ width: 24, textAlign: "center" }}>
          {item.quantity}
        </Typography>
        <IconButton
          size="small"
          onClick={() => changeQuantity(item.productId._id, 1)}
        >
          <Add />
        </IconButton>
      </Box>

      {/* Tổng tiền */}
      <Typography
        variant="body2"
        color="error"
        fontWeight="bold"
        sx={{ ml: 2, minWidth: 80, textAlign: "right" }}
      >
        {(item.productId.finalPrice * item.quantity).toLocaleString()} đ
      </Typography>

      {/* Icon xóa */}
      <IconButton onClick={() => removeItem(item.productId._id)} color="error">
        <Delete />
      </IconButton>
    </Box>
  );
};

export default ProductCartCard;
