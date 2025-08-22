import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../apis/dto/Response";
import AuthService from "../../apis/services/AuthService";
import { Paths } from "../../Paths";
import BoxRightHeader from "../molecules/header/BoxRightHeader";

export function HeaderCustomerCus() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setProfile(await AuthService.profile());
    };
    fetchData();
  }, []);
  profile && localStorage.setItem("userID", profile.userId);
  const isLogin = profile !== null;
  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          backgroundImage: "url(/images/headerLogin.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: 80,
          position: "relative",
          gap: 1.5,
        }}
      >
        {/* Logo */}
        <Stack
          onClick={() => {
            navigate(Paths.HOME);
          }}
          direction={"row"}
          sx={{
            cursor: "pointer",
          }}
        >
          <Box
            component="img"
            src="/images/logoShop.png"
            alt="SevenMallDigital"
            sx={{
              height: 50,
              objectFit: "contain",
            }}
          />

          <Typography
            paddingTop={1}
            fontSize={30}
            sx={{
              fontWeight: "bold",
              color: "#000",
              textShadow: "1px 1px 2px rgba(255,255,255,0.8)",
            }}
          >
            SevenMallDigital
          </Typography>
        </Stack>

        {/* Ô tìm kiếm */}
        <TextField
          variant="outlined"
          placeholder="Tìm kiếm sản phẩm"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
            sx: {
              height: 40, // chiều cao tổng thể
              padding: 2,
            },
          }}
          inputProps={{
            style: {
              padding: "8px 14px", // padding bên trong input
            },
          }}
          sx={{
            bgcolor: "white",
            borderRadius: "50px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "50px",
              "& fieldset": {
                borderColor: "orange",
                borderWidth: 2,
              },
            },
            minWidth: 500,
          }}
        />

        {isLogin && (
          <Button onClick={() => navigate(Paths.PROFILE)}>
            <AccountCircleIcon sx={{ fontSize: 50, color: "black" }} />
          </Button>
        )}

        {isLogin ? (
          <BoxRightHeader
            onClick={() => navigate(Paths.CART)}
            textTop={"Mua sắm tại đây"}
            textBot={"Giỏ hàng"}
            icon={
              <ShoppingBagIcon sx={{ fontSize: 60, color: "black", p: 1 }} />
            }
          />
        ) : (
          <BoxRightHeader
            onClick={() => navigate(Paths.LOGIN)}
            textTop={"Đăng kí"}
            textBot={"Đăng nhập"}
            icon={
              <AccountCircleIcon sx={{ fontSize: 60, color: "black", p: 1 }} />
            }
          />
        )}
      </Box>
    </Box>
  );
}
