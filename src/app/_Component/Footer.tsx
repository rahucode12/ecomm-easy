import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#2CA6A4",
        color: "#fff",
        py: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body2">© 2025 Ecomm-Easy. All rights reserved.</Typography>
    </Box>
  );
}