import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Box, Link, Stack, Typography } from "@mui/material";

export default function FooterCus() {
  return (
    <Box sx={{ bgcolor: "#ff6600", color: "white", pt: 1, mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          bgcolor: "#F9C659",
          paddingLeft: 10,
          paddingRight: 10,
          mx: "auto",
        }}
      >
        {/* Chăm sóc khách hàng */}
        <Box sx={{ minWidth: 200 }}>
          <Typography
            fontWeight="bold"
            fontSize={17}
            textAlign={"left"}
            color="black"
          >
            CHĂM SÓC KHÁCH HÀNG
          </Typography>
          {[
            "Trung Tâm Trợ Giúp",
            "SevenMallDigital Blog",
            "SevenMallDigital Mall",
            "Hướng Dẫn Mua Hàng",
            "Hướng Dẫn Bán Hàng",
            "Thanh Toán",
            "Vận Chuyển",
            "Trả Hàng & Hoàn Tiền",
            "Chăm Sóc Khách Hàng",
            "Chính Sách Bảo Hành",
          ].map((item) => (
            <Typography
              key={item}
              sx={{ fontSize: 17 }}
              textAlign={"left"}
              color="black"
            >
              <Link href="#" color="inherit" underline="hover">
                {item}
              </Link>
            </Typography>
          ))}
        </Box>

        {/* Về SevenMallDigital */}
        <Box sx={{ minWidth: 200 }}>
          <Typography
            variant="subtitle1"
            fontSize={17}
            fontWeight="bold"
            textAlign={"left"}
            color="black"
          >
            VỀ SEVENMALLDIGITAL
          </Typography>
          {[
            "Giới Thiệu Về SevenMallDigital Việt Nam",
            "Tuyển Dụng",
            "Điều Khoản SevenMallDigital",
            "Chính Sách Bảo Mật",
            "Chính Hãng",
            "Kênh Người Bán",
            "Flash Sales",
            "Chương Trình Tiếp Thị Liên Kết SevenMallDigital",
          ].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{ fontSize: 17 }}
              textAlign={"left"}
              color="black"
            >
              <Link href="#" color="inherit" underline="hover">
                {item}
              </Link>
            </Typography>
          ))}
        </Box>

        {/* Thanh toán */}
        <Box sx={{ minWidth: 150 }}>
          <Typography
            fontSize={17}
            fontWeight="bold"
            mb={2}
            textAlign="left"
            color="black"
          >
            THANH TOÁN
          </Typography>

          <Box
            component="img"
            src="/images/paymentFooter.png"
            alt="SevenMallDigital"
            sx={{
              height: "30%",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />

          <Typography
            fontSize={17}
            fontWeight="bold"
            mb={2}
            textAlign="left"
            color="black"
          >
            ĐƠN VỊ VẬN CHUYỂN
          </Typography>

          <Box
            component="img"
            src="/images/shipFooter.png"
            alt="SevenMallDigital"
            sx={{
              height: "30%",
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        {/* Theo dõi */}
        <Box sx={{ minWidth: 200 }}>
          <Typography
            fontSize={17}
            fontWeight="bold"
            mb={2}
            textAlign={"left"}
            color="black"
          >
            THEO DÕI CHÚNG TÔI TRÊN
          </Typography>
          <Stack direction="row" spacing={2} textAlign={"left"} color="black">
            <Link href="#" color="inherit">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit">
              <InstagramIcon fontSize="large" />
            </Link>
          </Stack>
        </Box>
      </Box>

      {/* Footer bottom */}
      <Box
        sx={{ bgcolor: "#ffeccd", color: "black", mt: 4, py: 2, fontSize: 14 }}
      >
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            px: 2,
            textAlign: "center",
            fontSize: 17,
          }}
        >
          © 2025 SevenMallDigital. Tất cả các quyền được bảo lưu.
          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {[
              "Singapore",
              "Indonesia",
              "Đài Loan",
              "Thái Lan",
              "Malaysia",
              "Việt Nam",
              "Philippines",
              "Brazil",
            ].map((country, index) => (
              <Box fontSize={17} key={index}>
                {country}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {[
              "CHÍNH SÁCH BẢO MẬT",
              "QUY CHẾ HOẠT ĐỘNG",
              "CHÍNH SÁCH VẬN CHUYỂN",
              "CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN",
            ].map((policy, index) => (
              <Box fontSize={17} key={index}>
                {policy}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
