import { Stack } from "@mui/material";
import { useState } from "react";
import OrderNav from "../../components/molecules/order/OrderNav";

const OrderCustomerPage = () => {
  const [page, setPage] = useState(0);
  return (
    <Stack>
      <OrderNav
        title={"Theo dõi đơn hàng"}
        justifyContent="space-evenly"
        page={page}
        setPage={setPage}
        nav={["Đang đợi", "Xác nhận", "Đang giao", "Đã giao"]}
      />
    </Stack>
  );
};

export default OrderCustomerPage;
