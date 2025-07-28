// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      return data || [];
    }
  });
};
