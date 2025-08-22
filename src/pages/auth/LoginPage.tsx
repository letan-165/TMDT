import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ForgotPassForm } from "../../components/molecules/formsAuth/ForgotPassForm";
import { LoginForm } from "../../components/molecules/formsAuth/LoginForm";
import { SignUpForm } from "../../components/molecules/formsAuth/SignUpForm";
import { UpdatePassForm } from "../../components/molecules/formsAuth/UpdatePassForm";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderLoginCus } from "../../components/organisms/HeaderLoginCus";
import { OtpForm } from "../../components/molecules/formsAuth/OtpForm";

export function LoginPage() {
  const [page, setPage] = useState("login");
  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderLoginCus />

      <Stack direction="row" sx={{ p: 2, justifyContent: "space-evenly" }}>
        {/* Left side */}
        <Box width={"37%"}>
          <Stack
            sx={{
              bgcolor: "#FF6600",
              padding: 3,
              alignItems: "center",
              gap: 3,
            }}
          >
            <Box
              sx={{
                bgcolor: "#FFFCB2",
                borderRadius: "50%",
                width: 200,
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src="/images/logoShop.png"
                alt="SevenMallDigital"
                sx={{ height: 80, marginLeft: 2, marginBottom: 2 }}
              />
            </Box>

            <Stack sx={{ bgcolor: "#FFFCB2", padding: 4 }}>
              <Typography
                fontSize={25}
                gutterBottom
                align="left"
                fontWeight="bold"
              >
                🎉 Chào mừng đến với Seven Mall Digital – Thế giới mua sắm
                online tiện lợi! Tại Seven Mall Digital, bạn sẽ tìm thấy hàng
                ngàn sản phẩm chất lượng, giá tốt cùng dịch vụ giao hàng nhanh
                chóng.
              </Typography>
              <Typography fontSize={25} align="left" fontWeight="bold">
                🛒 Mua sắm dễ dàng – Ưu đãi mỗi ngày – Hỗ trợ tận tâm!
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right side */}
        <Stack width={"37%"} bgcolor={"#FFEAD5"} padding={5}>
          {page === "login" && <LoginForm setPage={setPage} />}
          {page === "signup" && <SignUpForm setPage={setPage} />}
          {page === "forgot" && <ForgotPassForm setPage={setPage} />}
          {page === "otp" && <OtpForm setPage={setPage} />}
          {page === "update" && <UpdatePassForm setPage={setPage} />}
        </Stack>
      </Stack>

      <FooterCus />
    </Box>
  );
}
