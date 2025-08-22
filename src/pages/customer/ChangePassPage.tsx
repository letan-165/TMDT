import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import UserService from "../../apis/services/UserService";
import { ButtonLoginCus } from "../../components/atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../components/atoms/Form/TextFieldCus";

const ChangePassPage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleSave = async () => {
    setLoading(true);
    if (password !== rePassword) {
      alert("Mật khẩu không trùng khớp");
      setLoading(false);
      return;
    }
    await UserService.save({ password });
    window.location.reload();
  };
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Đổi mật khẩu
      </Typography>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box width={"80%"}>
          <TextFieldCus
            label="Nhập mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextFieldCus
            label="Nhập lại mật khẩu"
            type="password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />

          {loading ? (
            <CircularProgress sx={{ mt: 2, mb: 2 }} />
          ) : (
            <ButtonLoginCus
              name="Lưu"
              width={"15%"}
              onClick={() => handleSave()}
            />
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ChangePassPage;
