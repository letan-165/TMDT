import {
  Avatar,
  Box,
  Card,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Store } from "../../../apis/dto/Response";
import LoadingCus from "../../atoms/LoadingCus";

const sellerData = {
  shopName: "Lê Minh Tân - Da cấp",
  status: "Hoạt động",
  rating: 5,
  productCount: 100,
  workingHours: "6am - 6pm",
};
export const InfoShop = ({ store }: { store?: Store }) => {
  return !store ? (
    <LoadingCus />
  ) : (
    <Card sx={{ bgcolor: "#fff3e0", border: "1px solid #ff5722" }}>
      <Box sx={{ m: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            bgcolor: "#f5f5f5",
            border: "2px solid #ddd",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle1" fontWeight={600}>
              Tên shop: {store.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="caption" color="error.main">
                Trạng thái:
              </Typography>
              <Chip
                label={sellerData.status}
                color="success"
                size="small"
                sx={{ height: 20, fontSize: "0.7rem" }}
              />
            </Box>
          </Box>

          <Stack direction={"row"} alignItems={"center"} gap={3}>
            <Typography fontWeight={600}>Địa chỉ: {store.address}</Typography>
            <Rating value={sellerData.rating} readOnly size="small" />
          </Stack>

          <Box
            sx={{
              display: "flex",
              gap: 4,
              mt: 2,
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="body2">
              <strong>Số lượng sản phẩm:</strong> {sellerData.productCount}
            </Typography>
            <Typography variant="body2">
              <strong>Thời gian hoạt động:</strong> {sellerData.workingHours}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
