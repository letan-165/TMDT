import { Box, Button, Divider, Typography } from "@mui/material";
const BoxRightHeader = ({
  onClick,
  textTop,
  textBot,
  icon,
}: {
  onClick: () => void;
  textTop: string;
  textBot: string;
  icon: any;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "#f9c659",
        border: "2px solid orange",
        ml: 2,
      }}
    >
      {icon}
      <Button
        sx={{ display: "flex", flexDirection: "column", px: 1 }}
        onClick={onClick}
      >
        <Typography sx={{ color: "black", p: 0 }}>{textTop}</Typography>
        <Divider orientation="horizontal" flexItem sx={{ bgcolor: "black" }} />
        <Typography sx={{ color: "black", p: 0 }}>{textBot}</Typography>
      </Button>
    </Box>
  );
};

export default BoxRightHeader;
