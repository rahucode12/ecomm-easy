'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  InputAdornment,
  Chip,
  Skeleton,
  Fade,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts, Product } from '@/lib/hooks/useProducts';
import { useRouter } from 'next/navigation';

// Styled Components (Better Performance)
const SearchContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  maxWidth: 600,
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
  },
}));

const ResultsDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 1000,
  marginTop: theme.spacing(1),
  borderRadius: theme.spacing(2),
  maxHeight: 400,
  overflow: 'hidden',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const LoadingItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ResultHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 1, 2),
}));

const ResultsList = styled(List)({
  padding: 0,
  maxHeight: 300,
  overflow: 'auto',
});

const ResultItem = styled(ListItem)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const NoResultsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const ViewAllContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 2, 1, 2),
  backgroundColor: theme.palette.action.hover,
}));

const ViewAllLink = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ProductDescription = styled(Typography)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flex: 1,
});

const SecondaryInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

const PriceChip = styled(Chip)({
  fontSize: '0.75rem',
  height: 20,
});

interface SearchComponentProps {
  onProductSelect?: (product: Product) => void;
}

export default function SearchComponent({ onProductSelect }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading } = useProducts();
  const router = useRouter();

  // Memoized filter function
  const filterProducts = React.useCallback((query: string, productList: Product[]) => {
    if (!productList || query.trim() === '') return [];
    
    const normalizedQuery = query.toLowerCase().trim();
    return productList
      .filter(product =>
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 8);
  }, []);

  // Filter products based on search query
  useEffect(() => {
    const filtered = filterProducts(searchQuery, products || []);
    setFilteredProducts(filtered);
  }, [products, searchQuery, filterProducts]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    setShowResults(value.trim().length > 0);
  }, []);

  const handleProductClick = React.useCallback((product: Product) => {
    setShowResults(false);
    setSearchQuery('');
    
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      router.push('/products');
    }
  }, [onProductSelect, router]);

  const clearSearch = React.useCallback(() => {
    setSearchQuery('');
    setShowResults(false);
  }, []);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowResults(false);
    }
  }, []);

  const handleViewAllClick = React.useCallback(() => {
    router.push('/products');
  }, [router]);

  return (
    <SearchContainer ref={searchRef}>
      <StyledTextField
        fullWidth
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={() => searchQuery.trim() && setShowResults(true)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={clearSearch}
                color="default"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Search Results Dropdown */}
      <Fade in={showResults}>
        <ResultsDropdown
          elevation={8}
          style={{ display: showResults ? 'block' : 'none' }}
        >
          {isLoading ? (
            <LoadingContainer>
              {[...Array(3)].map((_, index) => (
                <LoadingItem key={index}>
                  <Skeleton variant="circular" width={40} height={40} style={{ marginRight: 16 }} />
                  <Box style={{ flex: 1 }}>
                    <Skeleton variant="text" height={20} width="60%" />
                    <Skeleton variant="text" height={16} width="40%" />
                  </Box>
                </LoadingItem>
              ))}
            </LoadingContainer>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <>
                  <ResultHeader>
                    <Typography variant="subtitle2" color="text.secondary">
                      Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                    </Typography>
                  </ResultHeader>
                  <ResultsList>
                    {filteredProducts.map((product) => (
                      <ResultItem
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={product.image_url}
                            alt={product.title}
                            style={{ width: 40, height: 40 }}
                          >
                            {product.title.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle2" noWrap>
                              {product.title}
                            </Typography>
                          }
                          secondary={
                            <SecondaryInfo>
                              <PriceChip
                                label={`₹${product.price}`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                              <ProductDescription
                                variant="caption"
                                color="text.secondary"
                              >
                                {product.description}
                              </ProductDescription>
                            </SecondaryInfo>
                          }
                        />
                      </ResultItem>
                    ))}
                  </ResultsList>
                  <ViewAllContainer>
                    <ViewAllLink
                      variant="caption"
                      color="primary"
                      onClick={handleViewAllClick}
                    >
                      View all products →
                    </ViewAllLink>
                  </ViewAllContainer>
                </>
              ) : searchQuery.trim() ? (
                <NoResultsContainer>
                  <Typography variant="body2" color="text.secondary">
                    No products found for "{searchQuery}"
                  </Typography>
                  <Typography variant="caption" color="text.secondary" style={{ marginTop: 8, display: 'block' }}>
                    Try different keywords or browse all products
                  </Typography>
                </NoResultsContainer>
              ) : null}
            </>
          )}
        </ResultsDropdown>
      </Fade>
    </SearchContainer>
  );
}