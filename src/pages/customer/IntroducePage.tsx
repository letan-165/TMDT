import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FooterCus from "../../components/organisms/FooterCus";
import { HeaderCustomerCus } from "../../components/organisms/HeaderCustomerCus";
import NavigationBar from "../../components/organisms/NavigationBar";

const IntroducePage = () => {
  return (
    <Box sx={{ fontFamily: "sans-serif", bgcolor: "#fff" }}>
      <HeaderCustomerCus />
      <NavigationBar activeIndex={2} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <HeroBanner />
        <IntroCard />

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Feature
              title="Sản phẩm đa dạng & chính hãng"
              desc="Từ giày, đồng hồ, phụ kiện công nghệ đến đồ dùng, tất cả đều được chọn lọc kỹ càng."
              img="/public/images/banner1.png"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              title="Giá ưu đãi & chương trình"
              desc="Nhiều chương trình khuyến mãi — Mang đến cho bạn tiết kiệm tối đa chi phí."
              img="/public/images/banner2.png"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Feature
              title="Free shipping & giao nhanh"
              desc="Giao hàng nhanh & hỗ trợ tận tâm — đảm bảo an toàn, chăm sóc nhiệt tình."
              img="/public/images/banner3.png"
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <AboutSection />
          </Paper>
        </Box>
      </Container>
      <FooterCus />
    </Box>
  );
};
const HeroBanner = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "linear-gradient(90deg,#ff7a00,#ff9100)",
        background: "radial-gradient(circle at left, #ff8a00, #ff6a00)",
        color: "white",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 3, gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Điện tử giờ vàng
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            DEAL SANG GIÁ XỊN
          </Typography>
          <Typography sx={{ mt: 1 }}>SevenMallDigital</Typography>
          <Button variant="contained" sx={{ mt: 2, bgcolor: "black" }}>
            Khám phá
          </Button>
        </Box>

        <Box sx={{ width: 220, display: "flex", justifyContent: "center" }}>
          {/* Placeholder images - replace with real assets */}
          <Box
            component="img"
            src="/public/images/banner3.png"
            alt="hero"
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

const IntroCard = () => (
  <Paper elevation={1} sx={{ p: 2, mt: -3, mx: 2, backgroundColor: "#fff7e6" }}>
    <Typography variant="body1" sx={{ color: "text.primary" }}>
      SevenMallDigital là điểm đến mua sắm trực tuyến mang đến trải nghiệm hiện
      đại, tiện lợi và đáng tin cậy cho mọi khách hàng. Với tiêu chí "Chất lượng
      - Giá tốt - Phục vụ tận tâm", chúng tôi không ngừng mở rộng danh mục sản
      phẩm từ thời trang, phụ kiện, đến đồ công nghệ, đáp ứng mọi nhu cầu của
      bạn.
    </Typography>
  </Paper>
);

const Feature = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img?: string;
}) => (
  <Card elevation={0} sx={{ textAlign: "center", p: 2 }}>
    <Avatar sx={{ width: 64, height: 64, mx: "auto", mb: 1 }} src={img} />
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        {desc}
      </Typography>
    </CardContent>
  </Card>
);

const AboutSection = () => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      Sứ mệnh
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      SevenMallDigital ra đời với sứ mệnh mang đến cho mọi khách hàng cơ hội
      tiếp cận những sản phẩm chất lượng cao với mức giá hợp lý, đồng thời đem
      lại trải nghiệm mua sắm trực tuyến an toàn, hiện đại và thuận tiện.
    </Typography>

    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      Tầm nhìn
    </Typography>
    <Typography variant="body2" sx={{ mb: 2 }}>
      Trở thành một trong những thương hiệu mạnh trong mảng thương mại điện tử
      hàng đầu tại Việt Nam, mở rộng danh mục sản phẩm, mang các chất lượng dịch
      vụ và áp dụng công nghệ mới để đáp ứng nhu cầu ngày càng đa dạng.
    </Typography>
  </Box>
);

export default IntroducePage;
