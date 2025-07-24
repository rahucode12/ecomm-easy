"use client";
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function NavigationBar() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#2CA6A4" }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Ecomm-Easy
                </Typography>
                <Box justifyContent={"center"} alignItems={"center"} sx={{ display: "flex", gap: 2 }}>

                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Product</Button>
                    <Button color="inherit">Contact</Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
}