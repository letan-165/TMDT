import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Discount } from "../../apis/dto/Response";
import DiscountService from "../../apis/services/DiscountService";
import CardDiscount from "../../components/atoms/Card/CardDiscount";
import EditDiscountDialog from "../../components/atoms/Dialogs/EditDiscountDialog";
import LoadingCus from "../../components/atoms/LoadingCus";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const DiscountPage = () => {
  const userID = localStorage.getItem("userID");
  const [open, setOpen] = useState(false);
  const [discounts, setDiscounts] = useState<Discount[]>();
  const [discount, setDiscount] = useState<Discount>();
  useEffect(() => {
    const fetchStore = async () => {
      try {
        setDiscounts(await DiscountService.findAllBySeller(userID));
      } catch (e) {
        console.error(e);
      }
    };
    fetchStore();
  }, [userID]);

  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={3} role="ADMIN" />
      <Stack alignItems={"center"}>
        <Stack width={1200}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, color: "#ff6a00", pt: 5 }}
          >
            MÃ GIẢM GIÁ CỦA TÔI
          </Typography>

          <Stack
            onClick={() => setOpen(true)}
            direction="row"
            spacing={2}
            alignItems="center"
            border={"2px solid #f36f21"}
            width={300}
            p={1}
            mb={5}
            sx={{ cursor: "pointer" }}
          >
            <AddCircleOutlineIcon sx={{ color: "black", fontSize: 28 }} />
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 13 }}>
                TẠO RA MÃ GIẢM MỚI
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#666" }}>
                Tạo mã giảm giá mới dựa trên thông tin người dùng nhập và quy
                tắc khuyến mãi
              </Typography>
            </Box>
          </Stack>

          <Paper sx={{ p: 2, border: "1px solid grey", bgcolor: "#ffeccd" }}>
            {!discounts ? (
              <LoadingCus />
            ) : (
              <Stack spacing={2}>
                {discounts.map((d, i) => (
                  <CardDiscount
                    key={i}
                    discount={d}
                    onClick={() => {
                      setDiscount(d);
                      setOpen(true);
                    }}
                  />
                ))}
              </Stack>
            )}
          </Paper>

          <EditDiscountDialog
            open={open}
            setOpen={setOpen}
            discount={discount}
          />
        </Stack>
      </Stack>
      <FooterCus />
    </Box>
  );
};

export default DiscountPage;
