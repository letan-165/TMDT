import { Person, PhotoCamera } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useState } from "react";

export default function AvatarSection({ setFile, image }) {
  const [preview, setPreview] = useState<string>("");

  const handleSelect = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setFile(file);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ pl: { md: 4 }, position: "relative" }}
    >
      {/* Divider */}
      <Divider
        orientation="vertical"
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          left: 0,
          height: "100%",
        }}
      />

      {/* Avatar Preview */}
      <Avatar
        src={preview || image}
        sx={{ width: 100, height: 100, bgcolor: "grey.300", mb: 2 }}
      >
        {!preview && <Person sx={{ fontSize: 50 }} />}
      </Avatar>

      {/* Select Button */}
      <Button
        variant="outlined"
        component="label"
        startIcon={<PhotoCamera />}
        sx={{ mb: 2 }}
      >
        Chọn ảnh
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleSelect(file); // chỉ set preview
            }
          }}
        />
      </Button>

      <Typography variant="caption" color="text.secondary" textAlign="center">
        Dung lượng tối đa 1 MB
        <br />
        Định dạng: .JPEG, .PNG
      </Typography>
    </Box>
  );
}
