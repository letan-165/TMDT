// WeekRangeToolbar.jsx
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  Box,
  Button,
  Divider,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

function formatDDMMYYYY(date) {
  if (!date) return "";
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export default function ExcelRevenue() {
  const [range, setRange] = useState({
    start: "2025-08-12",
    end: "2025-08-20",
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (e) => setAnchorEl(e.currentTarget);
  const closePopover = () => setAnchorEl(null);

  return (
    <Stack sx={{ width: "100%", my: 3, gap: 1 }}>
      <Divider sx={{ borderColor: "black" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        {/* Left: date range control */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Thời gian:</Typography>

          <Button
            variant="outlined"
            onClick={openPopover}
            sx={{
              minWidth: 260,
              justifyContent: "space-between",
              px: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayIcon fontSize="small" sx={{ color: "black" }} />
              <Typography variant="body2" sx={{ color: "black" }}>
                {formatDDMMYYYY(range.start)} - {formatDDMMYYYY(range.end)}
              </Typography>
            </Stack>

            <ArrowDropDownIcon />
          </Button>

          {/* Popover chứa 2 input date + nút apply */}
          <PopoverRevenue
            anchorEl={anchorEl}
            closePopover={closePopover}
            range={range}
            setRange={setRange}
          />
        </Stack>

        {/* Right: export button */}
        <Button
          startIcon={<FileDownloadOutlinedIcon />}
          sx={{
            textTransform: "none",
            borderRadius: 1,
            px: 2,
            height: 36,
            color: "black",
          }}
          onClick={() => {
            console.log("Xuất file excel cho:", range);
          }}
        >
          Xuất file excel
        </Button>
      </Box>

      <Divider sx={{ borderColor: "black" }} />
    </Stack>
  );
}

const PopoverRevenue = ({ anchorEl, closePopover, range, setRange }) => {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={closePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: { p: 2, minWidth: 300 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="subtitle2">Chọn khoảng ngày</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Bắt đầu"
            type="date"
            size="small"
            value={range.start}
            onChange={(e) => setRange((r) => ({ ...r, start: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Kết thúc"
            type="date"
            size="small"
            value={range.end}
            onChange={(e) => setRange((r) => ({ ...r, end: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button onClick={closePopover}>Hủy</Button>
          <Button variant="contained" onClick={closePopover}>
            Áp dụng
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};
