// app/products/page.tsx
'use client';

import { useProducts } from '@/lib/hooks/useProducts';
import {
    Card, CardContent, Typography,
    CircularProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
type CustomGridProps = React.ComponentProps<typeof Grid>;

const CustomGrid = (props: CustomGridProps) => <Grid {...props} />;
export default function ProductsPage() {
    const { data: products, isLoading, isError } = useProducts();

    if (isLoading) return <CircularProgress />;
    if (isError) return <p>Failed to load products.</p>;

    return (
        <Grid container spacing={2} padding={20} justifyContent="center">
            {products?.map((product) => (
                <Grid component={"div"} key={product.id} sx={{ width: 300 }}>

                    <Card sx={{ height: "100%" }}>
                        <Image
                            src={product.image_url}
                            alt={product.title}
                            width={300}
                            height={200}
                            style={{ objectFit: 'cover' }}
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
