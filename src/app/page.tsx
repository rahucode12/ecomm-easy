// src/app/page.tsx
import { Box, Typography, Container, Paper } from "@mui/material";
import GoldRateCard from "./_Component/GoldRateCard";
import ClientFunctions from "./_Component/ClientFunctions";

export default function Home() {
  return (
    <Box>
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
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Live Gold Rate
              </Typography>
              <GoldRateCard />
            </Paper>
          </Box>

          {/* News Section */}
          <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Latest News
              </Typography>
              <ClientFunctions />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
