import { Box, Checkbox, Typography } from "@mui/material";
import ProductCartCard from "../../atoms/Card/ProductCartCard";

export default function DefaultCart({ cartID, items, setItems }) {
  // Chọn tất cả
  const selectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: true })));
  };

  // Bỏ chọn tất cả
  const deselectAll = () => {
    setItems((prev) => prev.map((item) => ({ ...item, selected: false })));
  };

  // Kiểm tra có phải tất cả đã được chọn
  const allSelected = items.length > 0 && items.every((item) => item.selected);

  const totalPrice = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.productId.finalPrice * item.quantity, 0);

  return (
    <Box p={2}>
      <Box display="flex" alignItems="center" mb={2} gap={2}>
        <Checkbox
          checked={allSelected}
          indeterminate={items.some((item) => item.selected) && !allSelected}
          onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
        />
        <Box
          sx={{
            bgcolor: "#f7c948",
            px: 2,
            py: 0.5,
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          SẢN PHẨM
        </Box>
        <Typography
          variant="body2"
          sx={{ userSelect: "none", cursor: "pointer" }}
          onClick={selectAll}
        >
          Chọn tất cả
        </Typography>
        <Typography
          variant="body2"
          sx={{ userSelect: "none", cursor: "pointer" }}
          onClick={deselectAll}
        >
          Xóa tất cả
        </Typography>
        <Typography
          sx={{
            cursor: "pointer",
            flexGrow: 1,
            textAlign: "right",
            color: "#D32F2F",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Tổng tiền:{" "}
          {totalPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Typography>
      </Box>

      {/* Danh sách sản phẩm */}
      {items.map((item) => (
        <ProductCartCard item={item} setItems={setItems} cartID={cartID} />
      ))}
    </Box>
  );
}
