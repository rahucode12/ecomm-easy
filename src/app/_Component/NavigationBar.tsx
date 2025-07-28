"use client";

import { AppBar, Box, Toolbar, Typography, IconButton, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

export default function NavigationBar() {
  return (
    <AppBar position="fixed" sx={{ bgcolor: "#2CA6A4" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ecomm-Easy
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              color="inherit"
              component={Link}
              href={link.href}
              sx={{ textTransform: "none" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
