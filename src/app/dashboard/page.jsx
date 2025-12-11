"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("https://dummyjson.com/users").then((r) => r.json()),
        fetch("https://dummyjson.com/products").then((r) => r.json()),
        fetch("https://dummyjson.com/products/categories").then((r) => r.json()),
      ]).then(([users, products, categories]) => {
        setStats({
          users: users.total,
          products: products.total,
          categories: categories.length,
        });
      });
    }
  }, [status]);

  if (status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 20 }}>
        <CircularProgress />
      </Box>
    );
  }

  const user = session?.user;
  const displayName = user?.name || "User";

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>

        <Typography sx={{ mt: 2 }} variant="h6">
          Welcome, <strong>{displayName}</strong>
        </Typography>

        {user?.email && <Typography sx={{ mt: 1 }}>Email: {user.email}</Typography>}
      </Paper>

      <Grid container spacing={3} >
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {stats.users}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {stats.products}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 1, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h6">Categories</Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1 }}>
                {stats.categories}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 5,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="contained"
          size="large"
          fullWidth={{ xs: true, sm: false }}
          onClick={() => router.push("/users")}
        >
          View Users
        </Button>

        <Button
          variant="contained"
          size="large"
          fullWidth={{ xs: true, sm: false }}
          onClick={() => router.push("/products")}
        >
          View Products
        </Button>
      </Box>
    </Container>
  );
}
