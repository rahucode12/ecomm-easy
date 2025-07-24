// src/app/page.tsx
import { Box, Typography, Container, Button, Grid, Paper } from "@mui/material";
import GoldRateCard from "./_Component/GoldRateCard";
import ClientFunctions from "./_Component/ClientFunctions";


export default function Home() {
  return (
    <Box>


      {/* Info Grid Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Gold Rate Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Live Gold Rate
              </Typography>
              <GoldRateCard />
            </Paper>
          </Grid>
          {/* News Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Latest News
                <ClientFunctions />
              </Typography>
     
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
 
    </Box>
  );
}
