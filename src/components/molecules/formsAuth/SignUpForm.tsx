import { Google } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import AuthService from "../../../apis/services/AuthService";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";

export function SignUpForm({ setPage }: { setPage: (page: string) => void }) {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (formData.password != confirmPassword) {
      alert("Mật khẩu không trùng khớp");
      return;
    }
    if (await AuthService.register(formData)) {
      alert("Đăng kí thành công");
      setPage("login");
    } else {
      alert("Đăng kí thất bại");
    }
  };

  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Đăng Ký
      </Typography>

      <TextFieldCus
        label="Tên tài khoản"
        value={formData.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <TextFieldCus
        label="Tên người dùng"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <TextFieldCus
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <TextFieldCus
        label="Mật khẩu"
        type="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <TextFieldCus
        label="Nhập lại mật khẩu"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Stack direction={"row"} justifyContent={"space-between"}>
        <ButtonLoginCus
          bgcolor="black"
          name={"Đăng Kí"}
          onClick={handleSubmit}
        />
        <ButtonLoginCus name={"Quay về"} onClick={() => setPage("login")} />
      </Stack>

      <Button
        sx={{ bgcolor: "white", color: "black", textAlign: "center" }}
        startIcon={<Google />}
        fullWidth
      >
        Đăng ký bằng Google
      </Button>
    </>
  );
}
