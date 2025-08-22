import { Add, Remove } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Product } from "../../../apis/dto/Response";
import CartService from "../../../apis/services/CartService";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import LoadingCus from "../../atoms/LoadingCus";
import { formatVND } from "../../util/FunctionCus";

export const DetailProduct = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity((prev) => prev + 1);
  };
  const userID = localStorage.getItem("userID");
  const handleAddCart = async () => {
    console.log(userID);

    if (await CartService.create(userID, product._id, quantity)) {
      alert("Thêm thành công");
    } else {
      alert("Lỗi hệ thống");
    }
  };

  return !product ? (
    <LoadingCus />
  ) : (
    <Card sx={{ m: 2, p: 2, overflow: "visible" }}>
      <Stack direction={"row"} sx={{ gap: 3 }}>
        <Stack flex={2}>
          <Box
            component="img"
            src={product.images[0] || "/public/images/productInvalid.png"}
            sx={{ width: "100%" }}
          />
        </Stack>
        <Stack flex={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {product.name}
          </Typography>

          {/* rating */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Rating value={5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              Đánh giá
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Đã bán
            </Typography>
          </Box>

          {/* price */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            {product.discountId && (
              <>
                <Chip
                  label={`-${product.discountId?.value}%`}
                  size="small"
                  sx={{ bgcolor: "#ff5722", color: "white", fontWeight: 600 }}
                />
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "#999" }}
                >
                  {formatVND(product.price)}
                </Typography>
              </>
            )}

            <Typography
              variant="h5"
              sx={{
                color: "#ff5722",
                fontWeight: 700,
                bgcolor: "#fff3e0",
                px: 2,
                py: 0.5,
              }}
            >
              {formatVND(product.finalPrice)}
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Ngày đăng:</strong> {product.updatedAt}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Thông tin sản phẩm
            </Typography>
            {product.description}
          </Box>

          {/* stock */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Typography fontWeight={"bold"} variant="body2">
              Còn lại:
            </Typography>
            <Typography variant="body2" sx={{ ml: 2 }}>
              {product.stock}
            </Typography>
          </Box>

          {/* tag */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography fontWeight={"bold"} variant="body2" sx={{ mr: 1 }}>
              Tag:
            </Typography>
            {product.categoryId.tags.map((tag, i) => (
              <Chip key={i} label={tag} size="small" variant="outlined" />
            ))}
          </Box>

          {/* tăng giảm số lượng */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography fontWeight={"bold"} variant="body2">
              Số lượng:
            </Typography>
            <IconButton size="small" onClick={handleDecrease}>
              <Remove />
            </IconButton>
            <Typography variant="body1">{quantity}</Typography>
            <IconButton size="small" onClick={handleIncrease}>
              <Add />
            </IconButton>
          </Box>

          <ButtonLoginCus
            onClick={() => handleAddCart()}
            name="Thêm vào giỏ hàng"
            bgcolor="#F9C659"
            width={"35%"}
            color="black"
            icon={<ShoppingBagIcon />}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
