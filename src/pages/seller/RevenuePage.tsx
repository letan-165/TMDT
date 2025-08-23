import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../apis/dto/Response";
import OrderService from "../../apis/services/OrderService";
import BodyOrder from "../../components/molecules/order/BodyOrder";
import OrderNav from "../../components/molecules/order/OrderNav";
import ExcelRevenue, {
  DateRange,
} from "../../components/molecules/revenue/ExcelRevenue";
import OverviewRevenue from "../../components/molecules/revenue/OverviewRevenue";
import StatisticalRevenue from "../../components/molecules/revenue/StatisticalRevenue";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const RevenuePage = () => {
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const [range, setRange] = useState<DateRange | null>(null);

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await OrderService.getBySeller(userID);
        setOrders(res);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [userID]);

  const filteredOrders = orders.filter((o) => {
    if (!range) return true;
    const d = new Date(o.createdAt);
    return d >= new Date(range.start) && d <= new Date(range.end + "T23:59:59");
  });
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={1} role="ADMIN" />
      <Stack alignItems={"center"} mt={5}>
        <Stack width={1200}>
          <HeaderRevenue />
          <StatisticalRevenue />
          <OverviewRevenue totalRevenue={totalRevenue} />
          <OrderNav
            title={"Chi tiết thanh toán"}
            page={page}
            setPage={setPage}
            justifyContent="none"
            nav={[]}
          />
          <ExcelRevenue orders={filteredOrders} onRangeChange={setRange} />
          <BodyOrder orders={filteredOrders} isAdmin={false} />
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
