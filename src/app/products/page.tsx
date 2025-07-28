// app/products/page.tsx
'use client';

import { useProducts } from '@/lib/hooks/useProducts';
import {
  Card, CardContent, Typography,
  Grid, CircularProgress
} from '@mui/material';
import Image from 'next/image';

export default function ProductsPage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <Grid container spacing={2} padding={20} justifyContent="center">
      {products?.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id} width={300}>
          <Card sx={{ height: "100%" }}>
            <Image
              src={product.image_url}
              alt={product.title}
              width={300}
              height={200}
              style={{ objectFit: 'cover'}}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                ₹{product.price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
