import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Category, Product } from "../../apis/dto/Response";
import CategoryService from "../../apis/services/CategoryService";
import ProductsService from "../../apis/services/ProductsService";
import ListCheckBoxTestCus from "../../components/atoms/ListCheckBoxTextCus";
import ListProduct from "../../components/atoms/ListProduct";
import ListTextCus from "../../components/atoms/ListTextCus";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const CategoryPage = () => {
  const items1 = ["Sắp hết giảm giá", "Giảm sâu", "10%", "30%", "15%"];
  const items2 = [
    { id: "1", text: "Mới nhất" },
    { id: "2", text: "Phổ biến" },
    { id: "3", text: "Giá tăng dần" },
    { id: "4", text: "Giá giảm dần" },
  ];

  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const categoriesTags = categories?.flatMap((c) => c.tags) || [];
  const categoriesName: { id: string | undefined; text: string }[] = [
    { id: undefined, text: "Tất cả" },
    ...(categories?.map((c) => ({
      id: c._id,
      text: c.name,
    })) || []),
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProducts((await ProductsService.findAll(1, 30)).products);
        setCategories((await CategoryService.findAll(1, 10)).categories);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);
  //loc
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedPromo, setSelectedPromo] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("1"); // mặc định "Mới nhất"
  const filterProducts = () => {
    if (!products) return [];

    let filtered = [...products];
    // 1. Lọc theo danh mục
    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => String(p.categoryId) === selectedCategory
      );
    }

    // 3. Lọc theo khuyến mãi
    if (selectedPromo.length > 0) {
      filtered = filtered.filter((p) => {
        return selectedPromo.some((promo) => {
          if (promo === "Sắp hết giảm giá") {
            return p.haveDiscount && p.stock < 10;
          }
          if (promo === "Giảm sâu") {
            return p.haveDiscount && p.finalPrice <= p.price * 0.7;
          }
          if (promo.endsWith("%")) {
            const percent = parseInt(promo);
            return (
              p.haveDiscount && (1 - p.finalPrice / p.price) * 100 >= percent
            );
          }
          return false;
        });
      });
    }

    // 4. Sort
    switch (sortType) {
      case "1": // Mới nhất
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "2": // Phổ biến -> ví dụ tạm theo stock nhiều
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      case "3": // Giá tăng dần
        filtered.sort((a, b) => a.finalPrice - b.finalPrice);
        break;
      case "4": // Giá giảm dần
        filtered.sort((a, b) => b.finalPrice - a.finalPrice);
        break;
    }

    return filtered;
  };

  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={1} />
      <Stack height={1300} direction="row" pt={1}>
        <Stack
          p={1}
          width={"20%"}
          borderRight={"3px solid grey"}
          alignItems={"center"}
        >
          <ListTextCus
            title="DANH MỤC"
            items={categoriesName}
            onSelect={(id) => setSelectedCategory(id)}
          />
          <ListCheckBoxTestCus
            title={"Dịch vụ khuyến mãi"}
            items={items1}
            onChange={(list) => setSelectedPromo(list)}
          />
          <ListCheckBoxTestCus
            title={"Gợi ý thẻ hot"}
            items={categoriesTags}
            onChange={undefined}
          />
        </Stack>
        <Stack width="80%" p={1} sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: 0, right: 0, zIndex: 999 }}>
            <ListTextCus
              title="Xếp theo"
              items={items2}
              onSelect={(id) => setSortType(id ?? "1")}
            />
          </Box>
          <ListProduct products={filterProducts()} paddingTop={6} />
        </Stack>
      </Stack>

      <FooterCus />
    </Box>
  );
};

export default CategoryPage;
