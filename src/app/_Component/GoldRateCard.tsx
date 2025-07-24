'use client';

import React from 'react';
import { useGoldRate } from '@/lib/hooks/useGoldRate';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components using MUI's styled (Emotion under the hood)
const StyledCard = styled(Card)`
  background: linear-gradient(to bottom right, #fffde7, #fff8e1);
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
`;

const PriceText = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 700;
  color: #4e342e;
`;

const LabelText = styled(Typography)`
  font-size: 0.9rem;
  color: #5d4037;
`;

const ChangeBox = styled(Box)`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const PriceRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

export default function GoldRateCard() {
  const { data, isLoading, isError } = useGoldRate();

  if (isLoading) return <p>Loading gold rate...</p>;
  if (isError || !data) return <p>Failed to load rate</p>;

  const { price, prev_close_price, currency, timestamp } = data;

  const isUp = price > prev_close_price;
  const isDown = price < prev_close_price;
  const ChangeIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;
  const changeColor = isUp ? '#2e7d32' : isDown ? '#c62828' : '#616161';
  const changeText = isUp ? '+' : isDown ? '' : '';

  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" color="textPrimary">
            Gold Rate (per gram)
          </Typography>
          <ChangeBox sx={{ color: changeColor }}>
            <ChangeIcon size={18} />
            <span style={{ marginLeft: 4 }}>
              {changeText}
              {(price - prev_close_price).toFixed(2)} {currency}
            </span>
          </ChangeBox>
        </Box>

        <PriceRow>
          <LabelText>24K</LabelText>
          <PriceText>{data.price_gram_24k.toFixed(2)} {currency}</PriceText>
        </PriceRow>

        <PriceRow>
          <LabelText>22K</LabelText>
          <PriceText>{data.price_gram_22k.toFixed(2)} {currency}</PriceText>
        </PriceRow>

        <PriceRow>
          <LabelText>18K</LabelText>
          <PriceText>{data.price_gram_18k.toFixed(2)} {currency}</PriceText>
        </PriceRow>

        <Typography variant="caption" color="textSecondary" mt={2} display="block">
          Updated at{' '}
          {new Date(timestamp * 1000).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}