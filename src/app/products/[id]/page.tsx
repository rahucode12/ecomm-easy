// src/app/products/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  IconButton,
  Divider,
  Alert,
  Skeleton,
  Breadcrumbs,
  Link,
  Rating,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add,
  Remove,
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowBack,
  LocalShipping,
  Security,
  Verified,
} from '@mui/icons-material';
import Image from 'next/image';
import { useProducts } from '@/lib/hooks/useProducts';

// Styled Components
const ProductImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 500,
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[100],
  [theme.breakpoints.down('md')]: {
    height: 300,
  },
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const QuantityContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
  height: '100%',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(3),
  fontWeight: 600,
}));

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  
  const { data: products, isLoading, isError } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the specific product
  const product = products?.find(p => p.id === productId);

  // Loading state
  if (isLoading) {
    return (
      <Container sx={{ py: 4 }}>
        <Skeleton variant="text" width={300} height={40} sx={{ mb: 2 }} />
        <Grid container spacing={4}>
          <Grid component = {"div"}>
            <Skeleton variant="rectangular" width="100%" height={500} />
          </Grid>
          <Grid component = {"div"}>
            <Skeleton variant="text" width="80%" height={60} />
            <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
            <Skeleton variant="text" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 3 }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  // Error or product not found
  if (isError || !product) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {isError ? 'Failed to load product details.' : 'Product not found.'}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => router.push('/products')}
          startIcon={<ArrowBack />}
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    alert(`Added ${quantity} x ${product.title} to cart!`);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    alert(`Proceeding to checkout with ${quantity} x ${product.title}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          href="/" 
          onClick={(e) => { e.preventDefault(); router.push('/'); }}
          sx={{ cursor: 'pointer' }}
        >
          Home
        </Link>
        <Link 
          color="inherit" 
          href="/products"
          onClick={(e) => { e.preventDefault(); router.push('/products'); }}
          sx={{ cursor: 'pointer' }}
        >
          Products
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid component={"div"}>
          <ProductImageContainer>
            <Image
              src={product.image_url}
              alt={product.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </ProductImageContainer>
          
          {/* Additional product images would go here */}
          {/* <Box sx={{ display: 'flex', gap: 1, mt: 2, overflowX: 'auto' }}>
            {additionalImages.map((img, index) => (
              <Box key={index} sx={{ minWidth: 80, height: 80, cursor: 'pointer' }}>
                <Image src={img} alt="" width={80} height={80} />
              </Box>
            ))}
          </Box> */}
        </Grid>

        {/* Product Details */}
        <Grid component={"div"}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            {/* Product Title & Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Typography variant="h4" component="h1" fontWeight="bold">
                {product.title}
              </Typography>
              <Box>
                <IconButton onClick={toggleFavorite} color={isFavorite ? 'error' : 'default'}>
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton onClick={handleShare}>
                  <Share />
                </IconButton>
              </Box>
            </Box>

            {/* Rating & Reviews */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary">
                (4.5) • 124 reviews
              </Typography>
              <Chip label="Best Seller" color="primary" size="small" />
            </Box>

            {/* Price */}
            <PriceContainer>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ₹{product.price.toLocaleString()}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹{(product.price * 1.2).toLocaleString()}
              </Typography>
              <Chip label="20% OFF" color="success" size="small" />
            </PriceContainer>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity Selector */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              Quantity
            </Typography>
            <QuantityContainer>
              <IconButton 
                onClick={() => handleQuantityChange(-1)} 
                disabled={quantity <= 1}
                size="small"
              >
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                size="small"
                sx={{ width: 80 }}
                inputProps={{ 
                  style: { textAlign: 'center' },
                  min: 1,
                  type: 'number'
                }}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <IconButton 
                onClick={() => handleQuantityChange(1)}
                size="small"
              >
                <Add />
              </IconButton>
            </QuantityContainer>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <ActionButton
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </ActionButton>
              <ActionButton
                variant="outlined"
                color="primary"
                fullWidth
                size="large"
                onClick={handleBuyNow}
              >
                Buy Now
              </ActionButton>
            </Box>

            {/* Product Features */}
            <Grid container spacing={2}>
            <Grid component={"div"}>
                <FeatureCard>
                  <LocalShipping color="primary" sx={{ mb: 1 }} />
                  <Typography variant="caption" display="block">
                    Free Delivery
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid component={"div"}>
                <FeatureCard>
                  <Security color="primary" sx={{ mb: 1 }} />
                  <Typography variant="caption" display="block">
                    Secure Payment
                  </Typography>
                </FeatureCard>
              </Grid>
              <Grid component={"div"}>
                <FeatureCard>
                  <Verified color="primary" sx={{ mb: 1 }} />
                  <Typography variant="caption" display="block">
                    Quality Assured
                  </Typography>
                </FeatureCard>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Additional Product Information */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Product Details
        </Typography>
        <Grid container spacing={3}>
        <Grid component={"div"}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 3 }}>
                {product.description}
              </Typography>
              
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Specifications
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>
                <Typography variant="body2" fontWeight="bold">Brand:</Typography>
                <Typography variant="body2">Ecomm-Easy</Typography>
                
                <Typography variant="body2" fontWeight="bold">SKU:</Typography>
                <Typography variant="body2">{product.id}</Typography>
                
                <Typography variant="body2" fontWeight="bold">Availability:</Typography>
                <Typography variant="body2" color="success.main">In Stock</Typography>
                
                <Typography variant="body2" fontWeight="bold">Category:</Typography>
                <Typography variant="body2">Premium Products</Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid component={"div"}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Delivery Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Standard Delivery:</Typography>
                  <Typography variant="body2" fontWeight="bold">2-3 days</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Express Delivery:</Typography>
                  <Typography variant="body2" fontWeight="bold">1 day</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Free Delivery:</Typography>
                  <Typography variant="body2" fontWeight="bold">Orders ₹500+</Typography>
                </Box>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Return Policy
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30-day return policy. Items must be in original condition.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetail;