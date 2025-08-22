import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Discount } from "../../../apis/dto/Response";
import DiscountService from "../../../apis/services/DiscountService";
import { TextFieldInfoCus } from "../Form/TextFieldInfoCus";

const EditDiscountDialog = ({
  discount,
  open,
  setOpen,
}: {
  discount?: Discount;
  open: boolean;
  setOpen: (b) => void;
}) => {
  const [request, setRequest] = useState({
    name: "",
    code: "",
    value: 0,
    createdBy: localStorage.getItem("userID") ?? undefined,
  });

  useEffect(() => {
    if (discount) {
      setRequest({
        name: discount.name,
        code: discount.code,
        value: discount.value,
        createdBy: localStorage.getItem("userID") ?? undefined,
      });
    }
  }, [discount]);

  const handleChange = (field: string, value: any) => {
    setRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    console.log(request);

    if (discount?._id) {
      await DiscountService.update(discount._id, request);
    } else {
      await DiscountService.create(request);
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
        {/* Form */}
        <Box flex={1}>
          <Stack spacing={2}>
            <TextFieldInfoCus
              label="Mô tả"
              value={request.name}
              onChange={(e) => handleChange("name", e)}
            />
            <TextFieldInfoCus
              label="Mã nhập"
              value={request.code}
              onChange={(e) => handleChange("code", e)}
            />
            <TextFieldInfoCus
              label="Giá trị (%)"
              type="number"
              value={request.value}
              onChange={(e) => handleChange("value", Number(e))}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ bgcolor: "orange", "&:hover": { bgcolor: "#e66000" } }}
          onClick={handleSave}
        >
          Lưu
        </Button>
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

export default EditDiscountDialog;
