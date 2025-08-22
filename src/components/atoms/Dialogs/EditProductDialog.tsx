import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ProductRequest } from "../../../apis/dto/Request";
import { Category, Discount, Product } from "../../../apis/dto/Response";
import CloudinaryService from "../../../apis/external/CloudinaryService";
import CategoryService from "../../../apis/services/CategoryService";
import DiscountService from "../../../apis/services/DiscountService";
import ProductsService from "../../../apis/services/ProductsService";
import AvatarSection from "../../molecules/profile/form/AvatarSection";
import { TextFieldInfoCus } from "../Form/TextFieldInfoCus";
import ListTextCus from "../ListTextCus";
import LoadingCus from "../LoadingCus";

const EditProductDialog = ({
  open,
  setOpen,
  product,
}: {
  open: boolean;
  setOpen: (o) => void;
  product?: Product;
}) => {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<ProductRequest>({
    name: product?.name ?? "",
    description: product?.description ?? "",
    images: product?.images ?? [],
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    categoryId: product?.categoryId._id ?? undefined,
    discountId: product?.discountId?._id ?? undefined,
    sellerId: product?.sellerId ?? localStorage.getItem("userID") ?? "",
  });

  const [categories, setCategories] = useState<Category[]>();
  const [discounts, setDiscounts] = useState<Discount[]>();
  const categoriesName =
    categories?.map((c) => ({
      id: c._id,
      text: c.name,
    })) || [];

  const discountValue = discounts
    ? [
        { id: undefined, text: "Không giảm" },
        ...discounts.map((c) => ({
          id: c._id,
          text: c.value.toString(),
        })),
      ]
    : [{ id: undefined, text: "Không giảm" }];

  const userID = localStorage.getItem("userID");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setCategories((await CategoryService.findAll(1, 10)).categories);
        setDiscounts(await DiscountService.findAllBySeller(userID));
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, value: any) => {
    setRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSave = async () => {
    setLoading(true);

    let uploadedUrl;
    if (file) {
      uploadedUrl = await CloudinaryService.upload(file);
    }

    const updatedRequest: ProductRequest = {
      ...request,
      images: uploadedUrl ? [uploadedUrl] : request.images,
    };

    if (product?._id) {
      await ProductsService.update(product._id, updatedRequest);
    } else {
      await ProductsService.save(updatedRequest);
    }

    window.location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { bgcolor: "#fde2c6", borderRadius: 2 },
      }}
    >
      <DialogContent sx={{ display: "flex", gap: 2 }}>
        {/* Ảnh sản phẩm */}
        <Stack gap={2} alignItems={"center"}>
          <AvatarSection setFile={setFile} image={request.images[0]} />
          <ListTextCus
            title="Mã giảm"
            value={request.discountId}
            items={discountValue}
            onSelect={(v) => handleChange("discountId", v)}
          />
        </Stack>
        {/* Form */}
        <Box flex={1}>
          <Stack spacing={2}>
            <TextFieldInfoCus
              label="Tên sản phẩm"
              value={request.name}
              onChange={(e) => handleChange("name", e)}
            />

            <TextFieldInfoCus
              label="Mô tả"
              value={request.description}
              onChange={(e) => handleChange("description", e)}
            />

            <TextFieldInfoCus
              label="Giá tiền"
              type="number"
              value={request.price}
              onChange={(e) => handleChange("price", Number(e))}
            />

            <TextFieldInfoCus
              label="Còn lại"
              type="number"
              value={request.stock}
              onChange={(e) => handleChange("stock", Number(e))}
            />

            <ListTextCus
              title="Danh mục"
              value={request.categoryId}
              items={categoriesName}
              onSelect={(v) => handleChange("categoryId", v)}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        {loading ? (
          <LoadingCus />
        ) : (
          <Button
            variant="contained"
            sx={{ bgcolor: "orange", "&:hover": { bgcolor: "#e66000" } }}
            onClick={() => handleSave()}
          >
            Lưu
          </Button>
        )}
        <Button
          variant="contained"
          sx={{ bgcolor: "orange", "&:hover": { bgcolor: "#e66000" } }}
          onClick={() => setOpen(false)}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
