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
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrders(await OrderService.getBySeller(userID));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
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
          <BodyOrder orders={orders} />
        </Stack>
      </Stack>
      <FooterCus />
    </Box>
  );
};

export default OrderPage;
