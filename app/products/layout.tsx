import ProductsList from '@/components/ProductsList';
import Link from 'next/link';

interface Props {
  modal: React.ReactNode;
}

export default function ProductsPage({ modal }: Props) {
  return (
    <>
      <div className="p-3 grid justify-items-center">
        <div className="w-full max-w-7xl space-y-4">
          <div className="sm:flex justify-between items-center">
            <h2 className="text-2xl text-center font-bold text-gray-700">
              Products
            </h2>
            <Link
              href="/products/add"
              className="block text-center p-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold rounded"
              scroll={false}
            >
              Add Product
            </Link>
          </div>
          <div className="hidden sm:grid grid-cols-4 border p-3 rounded text-blue-800 font-bold shadow-sm">
            <p className="ps-3">Name</p>
            <p>Price</p>
            <p>In Stock</p>
            <p></p>
          </div>
          <ProductsList />
        </div>
      </div>
      {modal}
    </>
  );
}
