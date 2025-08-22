import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface TextFieldCusProps {
  label: string;
  mb?: number;
  type?: "text" | "password" | "email" | "number";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextFieldCus({
  label,
  type = "text",
  mb = 2,
  value,
  onChange,
}: TextFieldCusProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ mb, bgcolor: "#E2E2E2" }}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
}
