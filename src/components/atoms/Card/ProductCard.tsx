import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Paths } from "../../../Paths";
import { Product } from "../../../apis/dto/Response";
import ProductsService from "../../../apis/services/ProductsService";
import { formatVND } from "../../util/FunctionCus";
import EditProductDialog from "../Dialogs/EditProductDialog";
import LoadingCus from "../LoadingCus";
const ProductCard = ({
  product,
  isEdit = false,
}: {
  product: Product;
  isEdit?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async (productID) => {
    setLoading(true);
    await ProductsService.delete(productID);
    window.location.reload();
  };
  return (
    <>
      <Box
        onClick={() =>
          isEdit
            ? setOpen(true)
            : (window.location.href = `${Paths.PRODUCT}/${product._id}`)
        }
        sx={{
          width: 220,
          border: "1px solid #ccc",
          boxShadow: 1,
          p: 1,
          position: "relative",
          bgcolor: "white",
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          cursor: "pointer",
          borderRadius: 3,
        }}
      >
        <Box
          component="img"
          src={product.images[0] || "/public/images/productInvalid.png"}
          alt={product.name}
          sx={{ width: "100%", height: 220, objectFit: "cover" }}
        />
        {product.haveDiscount && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "orange",
              color: "white",
              px: 1,
              borderRadius: "0 0 0 8px",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            -{product.discountId?.value}%
          </Box>
        )}

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            fontWeight: "bold",
          }}
        >
          {product.name}
        </Typography>

        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {product.haveDiscount && (
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "#999" }}
            >
              {formatVND(product.price)}
            </Typography>
          )}
          <Typography variant="body2" color="error" fontWeight="bold">
            {formatVND(product.finalPrice)}
          </Typography>
          {loading ? (
            <LoadingCus />
          ) : (
            <DeleteIcon
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(product._id);
              }}
              sx={{ color: "red", display: !isEdit ? "none" : "block" }}
            />
          )}
        </Box>
      </Box>
      {isEdit && (
        <EditProductDialog open={open} setOpen={setOpen} product={product} />
      )}
    </>
  );
};

export default ProductCard;
