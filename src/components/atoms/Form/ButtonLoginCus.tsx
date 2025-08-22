import { Button } from "@mui/material";

export function ButtonLoginCus({
  name,
  width = "30%",
  bgcolor = "#f36f21",
  color = "white",
  onClick,
  icon,
}: {
  name: string;
  width?: string | number;
  bgcolor?: string;
  color?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Button
      variant="contained"
      sx={{
        mb: 2,
        bgcolor,
        width,
        color,
        "& .MuiButton-startIcon": {
          height: "100%",
          "& svg": {
            height: "100%",
            width: "auto", // giữ tỉ lệ
          },
        },
      }}
      onClick={onClick}
      startIcon={icon}
    >
      {name}
    </Button>
  );
}
