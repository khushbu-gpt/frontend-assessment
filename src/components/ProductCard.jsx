"use client";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Card  sx={{
        height: "100%",      
        width: "350px",        
        display: "flex",
        flexDirection: "column",
      }}>
      <CardMedia
        component="img"
        height="160"
        image={product.thumbnail}
        alt={product.title}
      />

      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography sx={{ mt: 1 }} variant="h6">
          ₹{product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={`/products/${product.id}`}>
          <Button variant="outlined" size="small">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
