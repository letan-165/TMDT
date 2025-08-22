import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { price: "<10.000", revenue: 400, qty: 30 },
  { price: "10.000-50.000", revenue: 4200, qty: 220 },
  { price: "50.000-100.000", revenue: 5000, qty: 150 },
  { price: "100.000-200.000", revenue: 8000, qty: 120 },
  { price: "200.000-500.000", revenue: 9000, qty: 100 },
  { price: "500.000-1.000.000", revenue: 3500, qty: 40 },
  { price: "1.000.000-2.000.000", revenue: 2000, qty: 25 },
  { price: "2.000.000-5.000.000", revenue: 1200, qty: 12 },
];

export default function StatisticalRevenue() {
  return (
    <Paper elevation={3} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        Thống kê mức giá theo doanh số và số sản phẩm đã bán
      </Typography>

      <Box sx={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="price" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              formatter={(value: any) => {
                if (typeof value === "number") {
                  return new Intl.NumberFormat("vi-VN").format(value);
                }
                const n = Number(value);
                if (!Number.isNaN(n)) {
                  return new Intl.NumberFormat("vi-VN").format(n);
                }
                return String(value);
              }}
            />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="revenue"
              name="Doanh thu (nghìn)"
              barSize={28}
              fill={"#ff6a00"}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="qty"
              name="Số sản phẩm đã bán"
              stroke="#1f77b4"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
