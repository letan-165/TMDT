import { Box, Divider, Stack, Typography } from "@mui/material";
import DefaultCart from "../../components/molecules/cart/DefaultCart";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect, useState } from "react";
import { Cart, CartItem, User } from "../../apis/dto/Response";
import CartService from "../../apis/services/CartService";
import UserService from "../../apis/services/UserService";
import { ButtonLoginCus } from "../../components/atoms/Form/ButtonLoginCus";
import LoadingCus from "../../components/atoms/LoadingCus";
import ConfirmCart from "../../components/molecules/cart/ConfirmCart";

const CartPage = () => {
  const [page, setPage] = useState(0);
  const [cart, setCard] = useState<Cart>();
  const [items, setItems] = useState<CartItem[]>([]);
  const itemsIsSelect = items.filter((item) => item.selected);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await CartService.get(userID);
        userID && setCard(res);
        setItems(
          (res.items || []).map((it) => ({
            ...it,
            selected: it.selected ?? false,
          }))
        );
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={5} />
      <Stack alignItems={"center"}>
        <Box width={1200} mt={5}>
          <HeaderCart userID={userID} indexPage={page} setPage={setPage} />
          {page === 0 && items && (
            <DefaultCart cartID={cart?._id} items={items} setItems={setItems} />
          )}
          {page === 1 && (
            <ConfirmCart items={itemsIsSelect} setPage={setPage} />
          )}
        </Box>
      </Stack>
      <FooterCus />
    </Box>
  );
};

const HeaderCart = ({ userID, indexPage, setPage }) => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        userID && setUser(await UserService.findById(userID));
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);
  return (
    <Stack direction={"row"} alignItems={"center"} gap={10}>
      <Stack
        onClick={() => {
          if (indexPage != 0) {
            setPage(indexPage - 1);
          }
        }}
        direction={"row"}
        sx={{
          alignItems: "center",
          bgcolor: "#f9c659",
          p: 1,
          gap: 2,
          cursor: "pointer",
        }}
      >
        <ShoppingBagIcon sx={{ fontSize: 60, color: "black", p: 1 }} />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "black", width: 3 }}
        />
        <Typography sx={{ color: "black", p: 0, fontWeight: "bold" }}>
          {indexPage === 0 ? "Giỏ hàng" : "Quay lại"}
        </Typography>
      </Stack>
      {indexPage === 0 && (
        <ButtonLoginCus
          name="Đặt hàng"
          width={"12%"}
          onClick={() => setPage(1)}
        />
      )}
      {indexPage === 1 && (
        <Stack>
          {user ? (
            <>
              <Stack direction={"row"} gap={20}>
                <Typography sx={{ color: "black", p: 0 }}>
                  <b>Tên:</b> {user.name}
                </Typography>
                <Typography sx={{ color: "black", p: 0 }}>
                  <b>Số điện thoại:</b> {user.phone}
                </Typography>
              </Stack>
              <Typography sx={{ color: "black", p: 0 }}>
                <b>Địa chỉ:</b> {user.address}
              </Typography>
            </>
          ) : (
            <LoadingCus />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default CartPage;
