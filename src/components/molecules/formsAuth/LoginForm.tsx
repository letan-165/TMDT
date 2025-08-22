import { Google } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../apis/services/AuthService";
import { Paths } from "../../../Paths";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";
import LoadingCus from "../../atoms/LoadingCus";

export function LoginForm({ setPage }: { setPage: (page) => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    if (await AuthService.login(formData)) {
      window.location.href = Paths.HOME;
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  const handleLoginGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      try {
        await AuthService.google(tokenResponse.code);
        alert("Đăng nhập thành công");
        navigate(Paths.HOME);
      } catch (e) {
        alert("Đăng nhập thất bại");
        console.error(e);
      }
    },
    onError: (e) => console.error(e),
  });

  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Đăng Nhập
      </Typography>
      <TextFieldCus
        label="Tên tài khoản"
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <TextFieldCus
        mb={0}
        label="Mật khẩu"
        type={"password"}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Ghi nhớ mật khẩu"
        sx={{
          ".MuiFormControlLabel-label": {
            fontSize: 14,
          },
        }}
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        {loading ? (
          <LoadingCus />
        ) : (
          <ButtonLoginCus
            bgcolor="black"
            name={"Đăng nhập"}
            onClick={() => handleLogin()}
          />
        )}
        <ButtonLoginCus name={"Đăng kí"} onClick={() => setPage("signup")} />
      </Stack>

      <Box width={"100%"} display="flex" justifyContent={"center"}>
        <ButtonLoginCus
          width="40%"
          name={"Quên mật khẩu"}
          onClick={() => setPage("forgot")}
        />
      </Box>
      <Button
        sx={{ bgcolor: "white", color: "black", textAlign: "center" }}
        startIcon={<Google />}
        fullWidth
        onClick={() => handleLoginGoogle()}
      >
        Đăng nhập bằng Google
      </Button>
    </>
  );
}
