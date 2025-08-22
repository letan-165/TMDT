import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

const images = [
  "/images/banner1.png",
  "/images/banner2.png",
  "/images/banner3.png",
];

export default function BannerCus() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 5,
        position: "relative",
        width: 1200,
        height: 300,
        mx: "auto",
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 1s ease-in-out",
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}
      <IconButton
        onClick={prevImage}
        sx={{
          position: "absolute",
          top: "50%",
          left: 8,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ fontSize: 40, color: "black", fontWeight: "bold" }}
        />
      </IconButton>
      <IconButton
        onClick={nextImage}
        sx={{
          position: "absolute",
          top: "50%",
          right: 8,
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <ArrowForwardIosIcon
          sx={{ fontSize: 40, color: "black", fontWeight: "bold" }}
        />
      </IconButton>

      {/* Dots Indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 1,
          zIndex: 3,
        }}
      >
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: i === index ? "#FF6600" : "grey.400",
              cursor: "pointer",
              border: "1px solid",
              borderColor: i === index ? "#FF6600" : "transparent",
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
