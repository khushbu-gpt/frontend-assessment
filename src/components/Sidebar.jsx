"use client";

import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
  Toolbar,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

const drawerWidth = 240;

export default function Sidebar({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "Users", path: "/users", icon: <GroupIcon /> },
    { name: "Products", path: "/products", icon: <ShoppingBagIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6">Admin Panel</Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <ListItemButton
              sx={{
                backgroundColor: pathname.startsWith(item.path)
                  ? "rgba(0,0,0,0.1)"
                  : "transparent",
                gap: 1,
              }}
            >
              {item.icon}
              <ListItemText primary={item.name} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <List>
        <ListItemButton onClick={handleLogout} sx={{ gap: 1 }}>
          <LogoutIcon />
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          width: "100%",
          p: 2,
          alignItems: "center",
          gap: 1,
          boxShadow: 1,
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "white",
          zIndex: 1200,
          height: 64,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Admin Panel</Typography>
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          ml: { sm: `${drawerWidth}px` },
          mt: { xs: "80px", sm: 0 },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
