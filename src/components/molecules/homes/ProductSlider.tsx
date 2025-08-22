import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import ProductCard from "../../atoms/Card/ProductCard";
import LoadingCus from "../../atoms/LoadingCus";

export default function ProductSlider({ products }) {
  const [index, setIndex] = useState(0);
  const maxIndex = 2;

  const prev = () => {
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  return !products ? (
    <LoadingCus />
  ) : (
    <Box
      sx={{
        width: 1300,
        position: "relative",
        overflow: "hidden",
        mx: "auto",
        mt: 1,
      }}
    >
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          top: "50%",
          left: 0,
          zIndex: 10,
          transform: "translateY(-50%)",
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 30, color: "black" }} />
      </IconButton>

      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          top: "50%",
          right: 0,
          zIndex: 10,
          transform: "translateY(-50%)",
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 30, color: "black" }} />
      </IconButton>
      <Box
        sx={{
          width: 1200,
          position: "relative",
          overflow: "hidden",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            transition: "transform 0.5s ease",
            transform: `translateX(-${index * 230}px)`,
            mx: "auto", // căn giữa ngang
          }}
        >
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
