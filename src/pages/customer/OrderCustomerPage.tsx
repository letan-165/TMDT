import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../apis/dto/Response";
import OrderService from "../../apis/services/OrderService";
import BodyOrder from "../../components/molecules/order/BodyOrder";
import OrderNav from "../../components/molecules/order/OrderNav";

const OrderCustomerPage = () => {
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
        setOrders(await OrderService.getByCustomer(userID));
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
    <Stack>
      <OrderNav
        title={"Theo dõi đơn hàng"}
        justifyContent="space-evenly"
        page={page}
        setPage={setPage}
        nav={["Tất cả", "Đang đợi", "Xác nhận", "Đang giao", "Đã giao"]}
      />
      <BodyOrder orders={filteredOrders} isAdmin={false} />
    </Stack>
  );
};

export default OrderCustomerPage;
