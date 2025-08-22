import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { User } from "../../../../apis/dto/Response";
import CloudinaryService from "../../../../apis/external/CloudinaryService";
import UserService from "../../../../apis/services/UserService";
import { ButtonLoginCus } from "../../../atoms/Form/ButtonLoginCus";
import { TextFieldInfoCus } from "../../../atoms/Form/TextFieldInfoCus";
import AvatarSection from "./AvatarSection";

export default function ProfileForm({ user }: { user: User }) {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [request, setRequest] = useState({
    username: user.username,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    phone: user.phone,
  });

  const handleSave = async () => {
    setLoading(true);

    let uploadedUrl;
    if (file) {
      uploadedUrl = await CloudinaryService.upload(file);
    }

    // tạo object mới có avatar cập nhật
    const updatedRequest = {
      ...request,
      avatar: uploadedUrl || request.avatar,
    };

    await UserService.save(updatedRequest);

    // sau khi lưu thành công mới set lại state
    setRequest(updatedRequest);

    setLoading(false);
    console.log(updatedRequest);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Hồ sơ của tôi
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </Typography>

      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box width={"80%"}>
          <TextFieldInfoCus
            label="Tên đăng nhập"
            value={request.username}
            onChange={(val) => setRequest({ ...request, username: val })}
          />
          <TextFieldInfoCus
            label="Tên người dùng"
            value={request.name}
            onChange={(val) => setRequest({ ...request, name: val })}
          />
          <TextFieldInfoCus
            label="Số điện thoại"
            value={request.phone}
            onChange={(val) => setRequest({ ...request, phone: val })}
          />
          <TextFieldInfoCus
            label="Email"
            type="email"
            value={request.email}
            onChange={(val) => setRequest({ ...request, email: val })}
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
        <AvatarSection setFile={setFile} image={request.avatar} />
      </Stack>
    </Paper>
  );
}
