import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import AuthService from "../../../apis/services/AuthService";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";
import LoadingCus from "../../atoms/LoadingCus";

export function ForgotPassForm({ setPage }: { setPage: (page) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleBt = async () => {
    setLoading(true);
    console.log(await AuthService.forgotPassword(email));
    localStorage.setItem("email", email);
    setLoading(false);
    setPage("otp");
  };

  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Quên mật khẩu
      </Typography>
      <TextFieldCus
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        {loading ? (
          <LoadingCus />
        ) : (
          <ButtonLoginCus bgcolor="black" name={"Lấy mã"} onClick={handleBt} />
        )}
        <ButtonLoginCus name={"Quay về"} onClick={() => setPage("login")} />
      </Stack>
    </>
  );
}
