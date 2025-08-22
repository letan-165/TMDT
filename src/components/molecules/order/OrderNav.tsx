import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect } from "react";

const Orange = "#ff6a00";

export default function OrderNav({
  title,
  justifyContent = "none",
  page,
  setPage,
  nav,
}) {
  useEffect(() => setPage(page), [page]);
  const handleChange = (_, v) => {
    setPage(v);
  };

  return (
    <Box>
      <Typography sx={{ color: Orange, fontWeight: 700, fontSize: 18, mt: 5 }}>
        {title}
      </Typography>
      <Tabs
        value={page}
        onChange={handleChange}
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        sx={{
          minHeight: 0,
          "& .MuiTabs-flexContainer": {
            gap: 5,
            justifyContent: { justifyContent },
          },
          "& .MuiTabs-indicator": {
            display: "flex",
            height: 4,
            bottom: -1,
          },
          "& .MuiTabs-indicatorSpan": {
            width: "100%",
            backgroundColor: Orange,
          },
        }}
      >
        {nav.map((t) => (
          <Tab
            key={t}
            label={t}
            sx={{
              textTransform: "none",
              minHeight: 0,
              fontWeight: 600,
              fontSize: 16,
              color: "#222",
              letterSpacing: 0.1,
              "&.Mui-selected": { color: Orange },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
