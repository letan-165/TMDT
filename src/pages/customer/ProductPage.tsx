import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../apis/dto/Response";
import ProductsService from "../../apis/services/ProductsService";
import LoadingCus from "../../components/atoms/LoadingCus";
import ProductSlider from "../../components/molecules/homes/ProductSlider";
import { DetailProduct } from "../../components/molecules/product/DetailProduct";
import { InfoShop } from "../../components/molecules/product/InfoShop";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const ProductPage = () => {
  const { productID } = useParams<{ productID: string }>();
  const [products, setProducts] = useState<Product[]>();

  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts((await ProductsService.findAll(1, 8)).products);
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProduct(await ProductsService.findOne(productID));
      } catch (e) {
        throw e;
      }
    };

    fetchData();
  }, []);
  return (
    <Stack sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={0} />
      <Stack width={"100%"} alignItems={"center"}>
        {!product ? (
          <LoadingCus />
        ) : (
          <Box width={1200}>
            <DetailProduct product={product} />
            <InfoShop store={product?.storeId} />
          </Box>
        )}
        <Typography
          sx={{
            mt: 2,
            fontWeight: "bold",
            fontSize: 20,
            color: "#FF6600",
          }}
        >
          NỔI BẬC HÔM NAY
        </Typography>
        <Container sx={{ height: 4, bgcolor: "#FF6600" }} />
        <ProductSlider products={products} />
      </Stack>
      <FooterCus />
    </Stack>
  );
};

export default ProductPage;
