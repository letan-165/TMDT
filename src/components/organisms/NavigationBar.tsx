import LockIcon from "@mui/icons-material/Lock";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Paths";
import { Store } from "../../apis/dto/Response";
import StoreService from "../../apis/services/StoreService";

const NavigationBar = ({
  activeIndex,
  role = "CUSTOMER",
}: {
  activeIndex: number;
  role?: string;
}) => {
  const [store, setStore] = useState<Store>();
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setStore(await StoreService.findByUserId(userID));
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);
  const isSeller = !!store;
  const menuItems =
    role === "CUSTOMER"
      ? [
          { label: "TRANG CHỦ", page: Paths.HOME },
          { label: "DANH MỤC SẢN PHẨM", page: Paths.CATEGORY },
          { label: "GIỚI THIỆU", page: Paths.INTRODUCE },
          {
            label: "SELLER",
            page: isSeller ? Paths.SELLER : Paths.SELLER_SIGN_UP,
          },
        ]
      : [
          { label: "QUẢN LÍ SẢN PHẨM", page: Paths.SELLER },
          { label: "THỐNG KÊ DOANH THU", page: Paths.REVENUE },
          { label: "XỬ LÍ ĐƠN", page: Paths.ORDER },
          { label: "QUẢN LÍ MÃ GIẢM GIÁ", page: Paths.DISCOUNT },
        ];
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        justifyContent: "center",
        bgcolor: "#ff6600",
        p: 1,
      }}
    >
      {menuItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            position: "relative",
            bgcolor: "#f59b1d",
            border: "2px solid #D9D9D9",
            transform: "skewX(-20deg)",
            px: 2,
            py: 0.5,
          }}
        >
          <Button
            onClick={() => navigate(menuItems[index].page)}
            sx={{
              transform: "skewX(20deg)",
              color: "white",
              fontWeight: "bold",
              fontSize: 12,
              p: 0,
              minWidth: 120,
            }}
          >
            {item.label}
            {item.label === "SELLER" && !isSeller && (
              <Box component="span" sx={{ ml: 0.5 }}>
                <LockIcon sx={{ fontSize: 20, color: "black" }} />
              </Box>
            )}
          </Button>

          {index === activeIndex && (
            <Box
              sx={{
                position: "absolute",
                bottom: -22,
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderTop: "20px solid #ff6600",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NavigationBar;
