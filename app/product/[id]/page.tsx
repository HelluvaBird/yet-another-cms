'use client';

import { ProductsRecord } from '@/lib/xata';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export default function ProductPage({ params: { id } }: Props) {
  const { data: product, isLoading } = useQuery<ProductsRecord>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(`/api/product/${id}`);

      return res.json();
    },
  });

  return (
    <div className="grid sm:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="relative border p-4 rounded">
          <span className="absolute -top-2 left-3 bg-neutral-50 text-base/none px-1">
            Thumbnail
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          {product?.thumbnail && (
            <div className="relative h-80">
              <Image
                src={product?.thumbnail}
                alt=""
                fill
                priority
                sizes="25vw"
                className="object-cover rounded"
              />
            </div>
          )}
        </div>
        <div className="relative border p-4 rounded">
          <span className="hidden sm:inline absolute -top-2 left-3 bg-neutral-50 text-base/none px-1">
            Additional Media
          </span>
          <span className="sm:hidden absolute -top-2 left-3 bg-neutral-50 text-base/none px-1">
            Media
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          {product?.media && (
            <div className="grid grid-cols-3 gap-2">
              {product.media.map((image) => (
                <div className="relative h-40" key={image}>
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="10vw"
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <div className="relative border p-4 rounded">
          <span className="absolute -top-2 left-3 bg-neutral-50 text-base/none px-1">
            Name
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          <p className="break-all">{product?.name}</p>
        </div>
        <div className="relative border p-4 rounded">
          <span className="absolute -top-2 left-3 bg-neutral-50 text-base/none px-1">
            Description
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          <p className="break-all">{product?.description}</p>
        </div>
        <div className="relative border p-4 rounded">
          <span className="absolute -top-2 left-3 bg-neutral-50 leading-none px-1">
            Price
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          <p>
            {product?.price &&
              new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'usd',
              }).format(product?.price)}
          </p>
        </div>
        <div className="relative border p-4 rounded">
          <span className="absolute -top-2 left-3 bg-neutral-50 leading-none px-1">
            In Stock
          </span>
          {isLoading && (
            <div
              role="status"
              className="h-4 bg-gray-200 rounded-full max-w-full animate-pulse"
            ></div>
          )}
          <p>{product?.stock}</p>
        </div>
      </div>
    </div>
  );
}
