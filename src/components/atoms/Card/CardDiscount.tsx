import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Discount } from "../../../apis/dto/Response";
import DiscountService from "../../../apis/services/DiscountService";
import LoadingCus from "../../atoms/LoadingCus";
const CardDiscount = ({
  discount,
  onClick,
}: {
  discount: Discount;
  onClick: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    try {
      await DiscountService.delete(discount._id);
    } catch (error) {
      alert("Kiểm tra đăng nhập");
      setLoading(false);
    }
    window.location.reload();
  };
  return (
    <Stack
      key={discount._id}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        p: 1.25,
        border: "1px solid #ffd9b8",
        borderRadius: 1,
        bgcolor: "white",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Stack
          flex={1}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          spacing={1}
        >
          <Typography flex={2} sx={{ fontSize: 14 }}>
            <b>Mô tả: </b>
            {discount.name}
          </Typography>
          <Typography flex={2} sx={{ fontSize: 14 }}>
            <b>Giảm:</b> {discount.value}%
          </Typography>
          <Typography flex={2} sx={{ fontSize: 14 }}>
            <b>Mã nhập:</b> {discount.code}
          </Typography>
        </Stack>
      </Box>

      <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
        <Button
          variant="contained"
          size="small"
          startIcon={<EditIcon />}
          onClick={onClick}
          sx={{ backgroundColor: "#ff7a00" }}
        >
          Sửa
        </Button>
        {!loading ? (
          <IconButton
            sx={{ bgcolor: "#ffeceb", color: "#ff5a3a" }}
            onClick={handleDelete}
          >
            <DeleteOutlineIcon />
          </IconButton>
        ) : (
          <LoadingCus />
        )}
      </Stack>
    </Stack>
  );
};

export default CardDiscount;
