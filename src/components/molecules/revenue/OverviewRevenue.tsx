import { Box, Divider, Paper, Stack, Typography } from "@mui/material";

const OverviewRevenue = () => {
  return (
    <Paper
      elevation={0}
      sx={{ mt: 3, border: `1px solid ${"#ff6a00"}`, borderRadius: 2 }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ color: "#ff6a00", fontWeight: 700 }}
        >
          Tổng quan
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Paper sx={{ p: 2, flex: 1 }} variant="outlined">
            <Typography sx={{ color: "#ff6a00", fontWeight: 700 }}>
              Chưa thanh toán
            </Typography>
            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Tổng cộng
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
              590,000₫
            </Typography>
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }} variant="outlined">
            <Typography sx={{ color: "#ff6a00", fontWeight: 700 }}>
              Đã thanh toán
            </Typography>

            <Stack
              direction="row"
              justifyContent={"space-between"}
              sx={{ mt: 1 }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
                  Tuần này
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>0₫</Typography>
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
                  Tháng này
                </Typography>
                <Typography sx={{ fontWeight: 700 }}>0₫</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ p: 2, flex: 1 }} variant="outlined">
            <Typography sx={{ color: "#ff6a00", fontWeight: 700 }}>
              Tổng cộng
            </Typography>
            <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
              192.722.000₫
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </Paper>
  );
};

export default OverviewRevenue;
