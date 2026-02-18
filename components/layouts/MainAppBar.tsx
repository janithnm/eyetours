'use client';

import React, { useState } from "react";
import {
  AppBar, Toolbar, Button, Box, useScrollTrigger, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Divider,
  Typography, CssBaseline
} from "@mui/material";
import { Menu as MenuIcon } from "lucide-react"; // Using lucide-react as standard in this project
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";

const drawerWidth = 240;

export default function MainAppBar(props: { window?: () => Window }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
    target: window ? window() : undefined,
  });

  // Force "scrolled" look if not on home page or if actually scrolled
  const trigger = scrollTrigger || !isHomePage;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navItems = [
    { label: 'Tour Packages', href: '/tours' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About Us', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
        <Image src="/logo.png" alt="Logo" width={120} height={120} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} href={item.href} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/planner" sx={{ textAlign: 'center', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ borderRadius: 4, mt: 1 }}
            >
              Plan Your Trip
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: trigger ? 'rgba(255, 255, 255, 0.95)' : 'transparent', // Increased opacity slightly
          backdropFilter: trigger ? 'blur(20px)' : 'none',
          color: trigger ? 'text.primary' : 'white',
          transition: 'all 0.4s ease',
          borderBottom: trigger ? '1px solid rgba(0,0,0,0.05)' : 'none',
          py: 0.5, // Reduced padding
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', position: 'relative', minHeight: { xs: 70, md: 90 } }}>
          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo Area */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexGrow: { xs: 1, md: 0 },
            position: { xs: 'absolute', md: 'static' },
            left: { xs: '50%', md: 'auto' },
            transform: { xs: 'translateX(-50%)', md: 'none' }
          }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box component="span" sx={{
                display: 'block',
                width: { xs: 120, md: 150 },
                height: { xs: 55, md: 90 },
                position: 'relative',
              }}>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>
            </Link>
          </Box>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 50,
                  px: 2.5,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: trigger ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.15)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/planner"
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 50,
                ml: 2,
                px: 3,
                py: 1,
                // CRITICAL: Use 'background' to override the theme's default gradient on containedPrimary
                background: trigger ? (theme) => theme.palette.secondary.main : '#ffffff',
                color: trigger ? '#ffffff' : (theme) => theme.palette.secondary.main,
                fontWeight: 600,
                border: trigger ? 'none' : '1px solid transparent',
                boxShadow: trigger ? '0 4px 14px 0 rgba(0,0,0,0.3)' : '0 4px 14px 0 rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: trigger ? (theme) => theme.palette.secondary.dark : 'rgba(255,255,255,0.95)',
                  transform: 'translateY(-1px)',
                  boxShadow: trigger ? '0 6px 20px 0 rgba(0,0,0,0.4)' : '0 6px 20px 0 rgba(0,0,0,0.15)',
                }
              }}
            >
              Plan Your Trip
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      {/* Spacer to prevent content overlap on non-home pages */}
      {!isHomePage && <Toolbar sx={{ minHeight: { xs: 70, md: 90 } }} />}
    </Box>
  );
}