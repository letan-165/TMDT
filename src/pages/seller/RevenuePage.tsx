import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import OrderNav from "../../components/molecules/order/OrderNav";
import DetailRevenue from "../../components/molecules/revenue/DetailRevenue";
import ExcelRevenue from "../../components/molecules/revenue/ExcelRevenue";
import OverviewRevenue from "../../components/molecules/revenue/OverviewRevenue";
import StatisticalRevenue from "../../components/molecules/revenue/StatisticalRevenue";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const data = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  revenue: 590000,
  carrier: "Go ject",
  createdAt: "12/08/2025",
  deliveryAt: "lê minh tân",
  status: ["Chưa thanh toán", "Đã thanh toán"][i % 2],
}));

const RevenuePage = () => {
  const [page, setPage] = useState(0);
  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={1} role="ADMIN" />
      <Stack alignItems={"center"} mt={5}>
        <Stack width={1200}>
          <HeaderRevenue />
          <StatisticalRevenue />
          <OverviewRevenue />
          <OrderNav
            title={"Chi tiết thanh toán"}
            page={page}
            setPage={setPage}
            justifyContent="none"
            nav={["Chưa thanh toán", "Đã thanh toán"]}
          />
          <ExcelRevenue />
          <DetailRevenue data={data} />
        </Stack>
      </Stack>
      <FooterCus />
    </Box>
  );
};

const HeaderRevenue = () => {
  return (
    <Typography variant="h5" sx={{ color: "#ff6a00", fontWeight: 700 }}>
      DOANH THU CỦA TUI
      <Typography
        component="span"
        sx={{ ml: 1, color: "text.secondary", fontSize: 12 }}
      >
        (Ngày hôm nay)
      </Typography>
    </Typography>
  );
};

export default RevenuePage;
