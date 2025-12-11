"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Grid,
  Pagination,
  Box,
  CircularProgress,
} from "@mui/material";
import { useProductsStore } from "../../stores/useProductsStore";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  const { products, total, loading, fetchProducts } = useProductsStore();

  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");

  const limit = 12;

  useEffect(() => {
    if (status === "authenticated") {
      fetchProducts(limit, (page - 1) * limit, q);
    }
  }, [page, q, fetchProducts, status]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <Container>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search products"
          fullWidth
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{display:"flex",justifyContent:"center",mt:4}}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <ProductCard product={p} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Container>
  );
}
