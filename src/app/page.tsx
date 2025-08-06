// src/app/page.tsx
import { Box, Typography, Container, Paper } from "@mui/material";
import GoldRateCard from "./_Component/GoldRateCard";
import ClientFunctions from "./_Component/ClientFunctions";
import SearchComponent from "./_Component/SearchComponent";

export default function Home() {
  return (
    <Box>
      {/* Hero Section with Search */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2CA6A4 0%, #1e7b7a 100%)',
          color: 'white',
          py: 8,
          mt: 8, // Account for fixed navbar
        }}
      >
        <Container>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Welcome to Ecomm-Easy
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Discover amazing products at great prices
            </Typography>
          </Box>
          
          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <SearchComponent />
          </Box>
          
          <Typography variant="body2" sx={{ textAlign: 'center', opacity: 0.8 }}>
            Search from our collection of premium products
          </Typography>
        </Container>
      </Box>

      {/* Info Section */}
      <Container sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Gold Rate Section */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 4, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom>
                Live Gold Rate
              </Typography>
              <GoldRateCard />
            </Paper>
          </Box>

          {/* News Section */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 4, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom>
                Latest News
              </Typography>
              <ClientFunctions />
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Quick Stats Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 6 }}>
        <Container>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
              gap: 4,
              textAlign: 'center',
            }}
          >
            <Box>
              <Typography variant="h4" color="primary" fontWeight="bold">
                1000+
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Products
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary" fontWeight="bold">
                24/7
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Live Rates
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary" fontWeight="bold">
                Fast
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Delivery
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" color="primary" fontWeight="bold">
                Secure
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Payments
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}