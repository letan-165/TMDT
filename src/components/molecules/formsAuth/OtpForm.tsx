import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AuthService from "../../../apis/services/AuthService";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";
import LoadingCus from "../../atoms/LoadingCus";

export function OtpForm({ setPage }: { setPage: (page) => void }) {
  const [code, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email") || "");
  }, [email]);

  const handleBt = async () => {
    setLoading(true)
    const res = await AuthService.checkOTP({ code, email });
    if (res) {
      localStorage.setItem("resetToken", res.resetToken);
    } else {
      console.log(res);
    }
    setLoading(false)
    setPage("update");
  };
  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Xác nhận OTP
      </Typography>
      <TextFieldCus
        label="Nhập mã OTP"
        value={code}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        {loading ? (
          <LoadingCus />
        ) : (<ButtonLoginCus bgcolor="black" name={"Xác nhận"} onClick={handleBt} />)}
        <ButtonLoginCus name={"Quay về"} onClick={() => setPage("forgot")} />
      </Stack>
    </>
  );
}
