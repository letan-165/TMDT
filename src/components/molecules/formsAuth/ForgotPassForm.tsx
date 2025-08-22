import { Stack, Typography } from "@mui/material";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";

export function ForgotPassForm({ setPage }: { setPage: (page) => void }) {
  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Quên mật khẩu
      </Typography>
      <TextFieldCus label="Email" type="email" />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ButtonLoginCus
          bgcolor="black"
          name={"Lấy mã"}
          onClick={() => setPage("update")}
        />
        <ButtonLoginCus name={"Quay về"} onClick={() => setPage("login")} />
      </Stack>
    </>
  );
}
