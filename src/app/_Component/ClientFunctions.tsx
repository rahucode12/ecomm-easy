'use client';
import { Button, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useCounterStore } from '@/store/counter';

const fetchHello = async () => {
  const res = await fetch('/api/hello');
  console.log('Fetching data from /api/hello',res);
  if (!res.ok) throw new Error('Network error');
  return res.json(); // returns { hello: "Hello from API!" }
};

export default function ClientFunctions() {
  const { count, increment } = useCounterStore();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['hello'],
    queryFn: fetchHello,
  });

  return (
    <Box>
      <Typography>Zustand Counter: {count}</Typography>
      <Button variant="contained" onClick={increment}>Increment</Button>

      <Typography sx={{ mt: 2 }}>API Result:</Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {isError && <Typography color="error">Error: {error.message}</Typography>}
      {data && <Typography>{data.hello}</Typography>}
    </Box>
  );
}
