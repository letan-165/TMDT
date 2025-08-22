import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Paths";

export function HeaderLoginCus() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        bgcolor: "#f36f21",
        color: "white",
        pb: 2,
        textAlign: "center",
      }}
    >
      <Box
        onClick={() => {
          navigate(Paths.HOME);
        }}
        sx={{
          backgroundImage: "url(/images/headerLogin.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 100,
          position: "relative",
          gap: 1.5,
          cursor: "pointer",
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/images/logoShop.png"
          alt="SevenMallDigital"
          sx={{
            height: 80,
            objectFit: "contain",
          }}
        />

        {/* Tên shop */}
        <Typography
          fontSize={40}
          sx={{
            fontWeight: "bold",
            color: "#000",
            textShadow: "1px 1px 2px rgba(255,255,255,0.8)", // để dễ đọc trên nền
          }}
        >
          SevenMallDigital
        </Typography>
      </Box>
    </Box>
  );
}
