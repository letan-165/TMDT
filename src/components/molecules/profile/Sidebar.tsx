import { Person } from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Avatar,
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AuthService from "../../../apis/services/AuthService";
import { Paths } from "../../../Paths";

export default function Sidebar({ user, activeIndex, setPage }) {
  const sidebarItems = ["Hồ sơ", "Địa chỉ", "Đổi mật khẩu"];
  const handelLogout = async () => {
    await AuthService.logout();
    localStorage.removeItem("userID");
    window.location.href = Paths.HOME;
  };
  return (
    <Paper sx={{ p: 2 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={user.avatar || undefined} sx={{ mr: 2 }}>
          <Person />
        </Avatar>
        <Box>
          <Typography fontWeight="bold">{user.name}</Typography>
          <Typography
            variant="caption"
            color="primary"
            onClick={() => setPage(0)}
            sx={{ cursor: "pointer" }}
          >
            ✏️ Sửa hồ sơ
          </Typography>
        </Box>
      </Box>
      <Stack direction={"row"} gap={1}>
        <Person />
        <Typography
          onClick={() => setPage(0)}
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Tài khoản của tôi
        </Typography>
      </Stack>
      {/* Menu Items */}
      <Box display="flex" flexDirection="column" gap={0.5}>
        {sidebarItems.map((text, i) => (
          <ButtonBase
            key={i}
            onClick={() => setPage(i)}
            sx={{
              justifyContent: "flex-start",
              color: activeIndex === i ? "#ff6600" : "black",
              pt: 1,
              pl: 1,
            }}
          >
            <Typography variant="body2">{text}</Typography>
          </ButtonBase>
        ))}
      </Box>
      <Stack direction={"row"} gap={1}>
        <ShoppingBagIcon />
        <Typography
          onClick={() => setPage(3)}
          sx={{ fontWeight: "bold", cursor: "pointer" }}
        >
          Đơn mua
        </Typography>
      </Stack>
      <Typography
        onClick={handelLogout}
        sx={{
          fontWeight: "bold",
          pt: 1,
          color: "red",
          cursor: "pointer",
        }}
      >
        Đăng xuất
      </Typography>
    </Paper>
  );
}
