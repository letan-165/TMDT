import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreService from "../../apis/services/StoreService";
import { ButtonLoginCus } from "../../components/atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../components/atoms/Form/TextFieldCus";
import LoadingCus from "../../components/atoms/LoadingCus";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";
import { Paths } from "../../Paths";

const SellerSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userID = localStorage.getItem("userID");
  const [request, setRequest] = useState({
    userId: userID,
    name: "",
    address: "",
  });
  const handleChange = (field: string, value: string) => {
    setRequest((prev) => ({ ...prev, [field]: value }));
  };
  const handleSave = async () => {
    setLoading(true);
    if (await StoreService.create(request)) {
      setLoading(false);
      alert("Đăng kí thành công");
      navigate(Paths.SELLER);
    } else {
      alert("Lỗi hệ thống");
    }
  };
  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={3} />
      <Stack alignItems={"center"} height={800}>
        <Stack
          width={600}
          bgcolor={"#FFEAD5"}
          padding={5}
          alignItems={"center"}
          gap={4}
          m={10}
          borderRadius={1}
        >
          <Typography fontSize={30} fontWeight="bold" gutterBottom>
            Bạn muốn kiếm tiền
          </Typography>
          <TextFieldCus
            label="Tên shop"
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <TextFieldCus
            label="Địa chỉ"
            onChange={(e) => handleChange("address", e.target.value)}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {loading ? (
              <LoadingCus />
            ) : (
              <ButtonLoginCus
                name={"Đăng kí bán ngay"}
                width={"100%"}
                onClick={() => handleSave()}
              />
            )}
          </Stack>
        </Stack>
      </Stack>
      <FooterCus />
    </Box>
  );
};

export default SellerSignUp;
