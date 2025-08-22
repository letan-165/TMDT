import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AuthService from "../../../apis/services/AuthService";
import { ButtonLoginCus } from "../../atoms/Form/ButtonLoginCus";
import TextFieldCus from "../../atoms/Form/TextFieldCus";
import LoadingCus from "../../atoms/LoadingCus";

export function UpdatePassForm({ setPage }: { setPage: (page) => void }) {
  const [newPassword, setNewPassword] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResetToken(localStorage.getItem("resetToken") || "");
  }, [resetToken]);

  const handleBt = async () => {
    setLoading(true);
    console.log(await AuthService.resetPassword({ resetToken, newPassword }));
    setLoading(false);
    setPage("login");
  };
  return (
    <>
      <Typography fontSize={30} fontWeight="bold" gutterBottom>
        Cập nhật mật khẩu mới
      </Typography>
      <TextFieldCus
        label="Mật khẩu"
        type={"password"}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <TextFieldCus label="Nhập lại mật khẩu" type={"password"} />
      <Stack direction={"row"} justifyContent={"space-between"}>
        {loading ? (
          <LoadingCus />
        ) : (
          <ButtonLoginCus
            bgcolor="black"
            name={"Xác nhận"}
            onClick={handleBt}
          />
        )}
      </Stack>
    </>
  );
}
