// lib/hooks/useGoldRate.ts

import { useQuery } from '@tanstack/react-query';

const fetchGoldRate = async () => {
    console.log('Fetching gold rate from API');
  const res = await fetch('/api/gold');
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export function useGoldRate() {
  return useQuery({
    queryKey: ['goldRate'],
    queryFn: fetchGoldRate,
    refetchInterval: 300000, // Refresh every 60 seconds
    staleTime: 30000,       // Consider data fresh for 30s
  });
}
