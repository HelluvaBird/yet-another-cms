'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/da3qbuiww/image/upload';

export default function AddModal() {
  const client = useQueryClient();
  const overlayRef = useRef(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [media, setMedia] = useState<File[] | null>(null);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length === 0) {
      return setThumbnail(null);
    }
    if (e.target.files!.length > 0) {
      setThumbnail(e.target.files![0]);
    }
  };
  const handleMedia: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length === 0) {
      return setMedia(null);
    }
    if (e.target.files!.length > 0) {
      const arr = Array.from(e.target.files!);
      setMedia(arr);
    }
  };

  const handleClose: React.MouseEventHandler = (e) => {
    if (e.target === overlayRef.current) {
      router.back();
    }
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('upload_preset', 'wyc7ndpv');
    let thumbnailUrl;

    if (thumbnail) {
      data.append('file', thumbnail);

      const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: data,
      });

      const { url } = await response.json();
      thumbnailUrl = url;
    }

    const mediaUrls = [];

    if (media) {
      for (const file of media) {
        data.append('file', file);

        const response = await fetch(cloudinaryUrl, {
          method: 'POST',
          body: data,
        });

        const { url } = await response.json();
        mediaUrls.push(url);
      }
    }

    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        ...(thumbnailUrl ? { thumbnail: thumbnailUrl } : null),
        ...(mediaUrls.length > 0 ? { media: mediaUrls } : null),
      }),
    });

    if (res.ok) {
      await client.invalidateQueries({ queryKey: ['products'] });
      router.back();
    }
  };

  return (
    <div
      className="bg-black/60 fixed inset-0 grid place-items-center px-3"
      ref={overlayRef}
      onClick={handleClose}
    >
      <div className="p-4 bg-white w-full max-w-xl rounded space-y-8">
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-xl">Add Product</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1 bg-transparent hover:bg-gray-200 transition-colors rounded"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="border p-3 py-6 rounded relative">
            <span className="text-sm absolute -top-3 left-3 text-blue-800 bg-white px-1">
              Product Information
            </span>
            <div className="space-y-4">
              <div className="grid">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded p-1 px-3"
                  placeholder="Name of the product"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={3}
                  name="description"
                  id="description"
                  className="border rounded p-1 px-3"
                  placeholder="Description of the product"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min={0}
                    className="border rounded p-1 ps-3"
                    placeholder="11.5"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    min={1}
                    className="border rounded p-1 ps-3"
                    placeholder="100"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-3 py-6 rounded relative">
            <span className="text-sm absolute -top-3 left-3 text-blue-800 bg-white px-1">
              Thumbnail Upload
            </span>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              className="sr-only peer"
              onChange={handleThumbnail}
            />

            <label
              htmlFor="thumbnail"
              className="grid items-center border border-dashed cursor-pointer min-h-[50px] peer-focus:outline-dashed"
            >
              <p className="text-center text-gray-400">
                {thumbnail ? thumbnail.name : 'Upload a thumbnail'}
              </p>
            </label>
          </div>
          <div className="border p-3 py-6 rounded relative">
            <span className="text-sm absolute -top-3 left-3 text-blue-800 bg-white px-1">
              Media Upload
            </span>

            <input
              type="file"
              name="media"
              id="media"
              className="sr-only peer"
              multiple
              onChange={handleMedia}
            />

            <label
              htmlFor="media"
              className="grid items-center border border-dashed cursor-pointer min-h-[50px] peer-focus:outline-dashed"
            >
              <div className="text-center text-gray-400">
                {media
                  ? media.map((file) => <p key={file.name}>{file.name}</p>)
                  : 'Upload additional media'}
              </div>
            </label>
          </div>
          <div className="grid">
            <button
              type="submit"
              className="py-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold rounded"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
