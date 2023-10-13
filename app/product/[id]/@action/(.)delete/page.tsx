'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function DeletePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleClose: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === overlayRef.current) {
      router.back();
    }
  };
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/product/${id}`, {
        method: 'DELETE',
      });

      return res.json();
    },
    onMutate: () => {},
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      router.replace('/products');
    },
  });

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    router.back();
    mutation.mutate();
  };
  return (
    <div
      className="bg-black/60 fixed inset-0 grid place-items-center"
      ref={overlayRef}
      onClick={handleClose}
    >
      <div className="p-4 bg-white w-full max-w-xl rounded space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-xl">Delete Product</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1 bg-transparent hover:bg-gray-200 transition-colors rounded"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="text-center">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex items-center justify-end gap-4 mt-4">
            <button
              onClick={handleDelete}
              type="button"
              className="py-2 px-4 bg-red-500 hover:bg-red-600 transition-colors text-white font-bold rounded"
            >
              Yes
            </button>
            <button
              onClick={() => router.back()}
              type="button"
              className="py-2 px-4 bg-white border border-blue-500 hover:border-blue-600 hover:text-blue-600 transition-colors text-blue-500 font-bold rounded"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
