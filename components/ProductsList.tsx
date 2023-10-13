'use client';

import { useQuery } from '@tanstack/react-query';
import Product from './Product';

interface ProductList {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  thumbnail: string | null;
  media: string[] | null;
}

export default function ProductsList() {
  const { data: products, isLoading } = useQuery<ProductList[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      return res.json();
    },
  });

  return (
    <div className="grid content-start gap-y-4 border p-3 rounded h-[73vh] shadow-sm overflow-y-auto">
      {isLoading ? (
        <p className="text-center text-gray-500">Loading data...</p>
      ) : products && products.length > 0 ? (
        products.map((product) => <Product key={product.id} {...product} />)
      ) : (
        <p className="text-center text-gray-500">
          No products found. Add a product to see the data.
        </p>
      )}
    </div>
  );
}
