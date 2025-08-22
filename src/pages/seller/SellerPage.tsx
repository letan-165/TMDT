import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Product, Store } from "../../apis/dto/Response";
import ProductsService from "../../apis/services/ProductsService";
import StoreService from "../../apis/services/StoreService";
import ProductCard from "../../components/atoms/Card/ProductCard";
import EditProductDialog from "../../components/atoms/Dialogs/EditProductDialog";
import { ButtonLoginCus } from "../../components/atoms/Form/ButtonLoginCus";
import { TextFieldInfoCus } from "../../components/atoms/Form/TextFieldInfoCus";
import LoadingCus from "../../components/atoms/LoadingCus";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const SellerPage = () => {
  const [store, setStore] = useState<Store>();
  const userID = localStorage.getItem("userID");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>();
  useEffect(() => {
    const fetchStore = async () => {
      try {
        setStore(await StoreService.findByUserId(userID));
        setProducts(await ProductsService.findBySeller(userID));
      } catch (e) {
        console.error(e);
      }
    };
    fetchStore();
  }, [userID]);

  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={0} role="ADMIN" />
      <Stack height={1300} alignItems={"center"} mt={5}>
        <Stack width={1200}>
          <InfoSeller store={store} />
          <Container sx={{ height: 4, bgcolor: "black", my: 3 }} />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                p: 1,
                bgcolor: "#F36F21",
                width: 350,
              }}
            >
              Danh sách sản phẩm của tôi
            </Typography>
            <ButtonLoginCus
              name="+ Thêm mới"
              width={"10%"}
              onClick={() => setOpen(true)}
            />
          </Stack>
          {/* Danh sách sản phẩm */}
          {!products ? (
            <CircularProgress sx={{ mt: 2, mb: 2 }} />
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 2,
                width: 1200,
              }}
            >
              {products.map((product, index) => (
                <ProductCard key={index} product={product} isEdit={true} />
              ))}
            </Box>
          )}
        </Stack>
        <EditProductDialog open={open} setOpen={setOpen} />
      </Stack>
      <FooterCus />
    </Box>
  );
};

const InfoSeller = ({ store }) => {
  const [name, setName] = useState(store?.name);
  const [address, setAddress] = useState(store?.address);
  const handleSaveStore = async () => {
    try {
      console.log(await StoreService.update(store._id, { name, address }));
      window.location.reload();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (store) {
      setName(store.name);
      setAddress(store.address);
    }
  }, [store]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          borderBottom: "4px solid black",
          width: 300,
          mb: 2,
        }}
      >
        Cửa hàng của tôi{" "}
      </Typography>
      {!store ? (
        <LoadingCus />
      ) : (
        <Stack direction={"row"} alignItems={"center"} gap={5}>
          <Stack flex={1}>
            <TextFieldInfoCus
              label="Tên shop"
              value={name}
              onChange={setName}
            />
            <TextFieldInfoCus
              label="Địa chỉ"
              value={address}
              onChange={setAddress}
            />
          </Stack>
          <Box flex={1}>
            <ButtonLoginCus
              name="Lưu"
              width={"10%"}
              onClick={handleSaveStore}
            />
          </Box>
        </Stack>
      )}
    </>
  );
};

export default SellerPage;
