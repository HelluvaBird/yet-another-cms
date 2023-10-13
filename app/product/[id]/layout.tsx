import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface Props {
  children: React.ReactNode;
  action: React.ReactNode;
  params: {
    id: string;
  };
}

export default function Layout({ children, params: { id }, action }: Props) {
  return (
    <div className="p-3 grid justify-items-center">
      <div className="w-full max-w-7xl space-y-4">
        <div>
          <Link
            href="/products"
            className="inline-flex gap-2 border py-2 px-4 rounded-full bg-blue-500 text-white font-bold"
          >
            <span>Products</span>
            <ArrowLeftCircleIcon className="w-6 h-6" />
          </Link>
        </div>
        <div className="sm:flex items-center justify-between">
          <p className="break-all">ID: {id}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/product/${id}/update`}
              scroll={false}
              className="p-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-bold rounded"
            >
              Update
            </Link>
            <Link
              href={`/product/${id}/delete`}
              scroll={false}
              className="p-3 text-blue-500 border border-blue-500 hover:text-blue-600 hover:border-blue-600 transition-colors font-bold rounded"
            >
              Delete
            </Link>
          </div>
        </div>
        {children}
      </div>
      {action}
    </div>
  );
}
