"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
  Rating,
  Button,
} from "@mui/material";
import { useProductsStore } from "../../../stores/useProductsStore";
import Image from "next/image";

export default function SingleProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: session, status } = useSession();
  const { fetchProductById } = useProductsStore();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((res) => setProduct(res));
    }
  }, [id, fetchProductById]);

  if (!product || status === "loading") {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Button
  variant="outlined"
  onClick={() => router.back()}
  sx={{ mb: 2 }}
>
  ← Back
</Button>

    <Card sx={{width:"100%", margin: "0 auto", p: 2,height:"100%"}}>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 2,
                }}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={250}
                  height={250}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
                {product.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt="product"
                    width={100}
                    height={100}
                    onClick={() =>
                      setProduct((p) => ({ ...p, thumbnail: img }))
                    }
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4">{product.title}</Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              {product.description}
            </Typography>

            <Typography variant="h5" sx={{ mt: 2 }}>
              ₹{product.price}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              Discount: <strong>{product.discountPercentage}%</strong>
            </Typography>

            <Typography variant="body1">
              Stock: {product.stock > 0 ? product.stock : "Out of stock"}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              Brand: {product.brand}
            </Typography>

            <Typography variant="body1">
              Category: {product.category}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Rating
                name="read-only"
                value={product.rating}
                precision={0.5}
                readOnly
              />
              <Typography sx={{ ml: 1 }}>
                {product.rating} / 5
              </Typography>
            </Box>

            <Button variant="contained" sx={{ mt: 3 }}>
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </>
  );
}
