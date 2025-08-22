import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import UserService from "../../../../apis/services/UserService";
import { ButtonLoginCus } from "../../../atoms/Form/ButtonLoginCus";

const markerIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

export default function LocationProfile({
  location,
}: {
  location?: string | null;
}) {
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [address, setAddr] = useState(location || "");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSave = async () => {
    console.log(address);
    try {
      await UserService.save({ address });
      window.location.reload()
    } catch (error) {
      throw error;
    }
  };

  // Lấy địa chỉ từ tọa độ
  const getAddr = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`
      );
      const p = res.data?.features?.[0]?.properties || {};
      return (
        [p.name, p.street, p.city, p.country].filter(Boolean).join(", ") ||
        "Không xác định"
      );
    } catch {
      return "Không xác định";
    }
  };

  // Hàm lấy vị trí GPS trực tiếp
  const getCurrentGPS = async () => {
    navigator.geolocation?.getCurrentPosition(async (pos) => {
      const p: [number, number] = [pos.coords.latitude, pos.coords.longitude];
      setPos(p);
      const address = await getAddr(...p);
      setAddr(address);
      setInput(address);
    });
  };

  // Tìm địa chỉ khi nhập
  const searchAddr = async (q: string) => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await axios.get(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(q)}`
      );
      setSuggestions(res.data.features || []);
    } catch {
      setSuggestions([]);
    }
  };

  // Chọn suggestion
  const selectSuggestion = async (feature: any) => {
    const [lon, lat] = feature.geometry.coordinates;
    setPos([lat, lon]);
    const address = await getAddr(lat, lon);
    setAddr(address);
    setInput(address);
    setSuggestions([]);
    setDialogOpen(false);
  };

  // Marker click
  const ClickMarker = () => {
    useMapEvents({
      click: async (e) => {
        const p: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPos(p);
        const address = await getAddr(...p);
        setAddr(address);
        setInput(address);
        setSuggestions([]);
      },
    });
    return null;
  };

  // Map center khi pos thay đổi
  const MapCenter = ({ position }: { position: [number, number] | null }) => {
    const map = useMap();
    useEffect(() => {
      if (position) map.setView(position, 15);
    }, [position]);
    return null;
  };

  // useEffect khởi tạo
  useEffect(() => {
    if (location) return; // nếu có location đầu vào thì không lấy GPS tự động
    // nếu không có location thì ban đầu không hiển thị map
  }, []);

  // search khi nhập input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (dialogOpen) searchAddr(input);
    }, 300);
    return () => clearTimeout(timer);
  }, [input, dialogOpen]);

  // Hàm bấm nút "Vị trí hiện tại"
  const handleGoCurrentLocation = async () => {
    if (location) {
      // Nếu có location đầu vào → tìm tọa độ từ địa chỉ
      try {
        const res = await axios.get(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(location)}`
        );
        const feature = res.data.features?.[0];
        if (feature) {
          const [lon, lat] = feature.geometry.coordinates;
          setPos([lat, lon]);
          setAddr(location);
          setInput(location);
        }
      } catch {
        console.log("Không tìm thấy tọa độ từ location đầu vào");
      }
    } else {
      // Nếu không có → fallback GPS
      getCurrentGPS();
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ButtonLoginCus
          name=" + Cập nhật địa chỉ"
          onClick={() => setDialogOpen(true)}
          width={"20%"}
        />
        <ButtonLoginCus
          name="Lưu"
          onClick={handleSave}
          bgcolor="blue"
          width={"10%"}
        />
      </Stack>
      {address && (
        <Typography sx={{ mt: 2 }}>
          📍 <b>Địa chỉ hiện tại:</b> {address}
        </Typography>
      )}
      <Box sx={{ height: 400, mt: 3, position: "relative" }}>
        {pos ? (
          <MapContainer center={pos} zoom={13} style={{ height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pos} icon={markerIcon} />
            <ClickMarker />
            <MapCenter position={pos} />
          </MapContainer>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#f5f5f5",
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Chưa có vị trí
            </Typography>
          </Box>
        )}

        {/* Nút Vị trí hiện tại + GPS */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {location && (
            <Button
              variant="contained"
              size="small"
              onClick={handleGoCurrentLocation}
            >
              📍 Xem vị trí hiện tại
            </Button>
          )}
          <Button variant="contained" size="small" onClick={getCurrentGPS}>
            🛰️ Lấy từ GPS
          </Button>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nhập địa chỉ</DialogTitle>
        <DialogContent>
          <TextField
            label="Nhập địa chỉ"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            margin="normal"
          />
          {suggestions.length > 0 && (
            <List
              sx={{
                maxHeight: 200,
                overflowY: "auto",
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              {suggestions.map((item, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onClick={() => selectSuggestion(item)}>
                    {item.properties.name ||
                      item.properties.street ||
                      item.properties.city ||
                      "Không tên"}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
