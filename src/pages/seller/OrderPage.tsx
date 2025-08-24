import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../apis/dto/Response";
import OrderService from "../../apis/services/OrderService";
import BodyOrder from "../../components/molecules/order/BodyOrder";
import OrderNav from "../../components/molecules/order/OrderNav";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const OrderPage = () => {
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<Order[]>();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const userID = localStorage.getItem("userID");
  const listState = [
    "",
    "PENDING",
    "CONFIRMED",
    "SHIPPING",
    "COMPLETED",
  ] as const;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrderService.getBySeller(userID);
        setOrders(
          [...response].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const state = listState[page];
    if (!orders) return;

    if (state) {
      setFilteredOrders(orders.filter((o) => o.status === state));
    } else {
      setFilteredOrders(orders);
    }
  }, [orders, page]);

  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={2} role="ADMIN" />
      <Stack alignItems={"center"}>
        <Stack width={1200}>
          <OrderNav
            title={"QUẢN LÍ ĐƠN HÀNG"}
            justifyContent="space-evenly"
            page={page}
            setPage={setPage}
            nav={["Tất cả", "Cần duyệt", "Đã duyệt", "Đang giao", "Hoàn thành"]}
          />
          <BodyOrder orders={filteredOrders} />
        </Stack>
      </Stack>
      <FooterCus />
    </Box>
  );
};

export default OrderPage;
