import { Google } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";

export function UpdatePassForm({ setPage }: { setPage: (page) => void }) {
  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Cập nhật mật khẩu mới
      </Typography>
      <TextFieldCus label="Mật khẩu" type={"password"} />
      <TextFieldCus label="Nhập lại mật khẩu" type={"password"} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ButtonLoginCus
          bgcolor="black"
          name={"Xác nhận"}
          onClick={() => setPage("login")}
        />
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
