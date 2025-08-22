import { Stack, TextField, Typography } from "@mui/material";

interface LabeledTextFieldProps {
  label: string;
  value?: string | number;
  type?: string;
  onChange?: (value) => void;
  disabled?: boolean;
  placeholder?: string;
  helper?: string;
}

export function TextFieldInfoCus({
  label,
  value = "",
  type,
  onChange,
  disabled,
  placeholder,
}: LabeledTextFieldProps) {
  return (
    <Stack direction={"row"} mb={3} width={"100%"} alignItems={"center"}>
      <Typography width={"25%"}>{label}:</Typography>
      <TextField
        fullWidth
        type={type}
        size="small"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        sx={{ bgcolor: "white" }}
      />
    </Stack>
  );
}
