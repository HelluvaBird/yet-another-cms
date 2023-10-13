import Image from 'next/image';
import Link from 'next/link';

interface Props {
  id: string;
  name: string;
  price: number;
  stock: number;
  thumbnail: string | null;
}

export default function Product({ id, name, price, stock, thumbnail }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 items-center border p-3 rounded text-blue-800 font-bold shadow-sm hover:shadow transition-shadow">
      <div className="flex items-center gap-1">
        {thumbnail && (
          <div className="hidden sm:block relative h-12 w-12 shrink-0">
            <Image
              src={thumbnail}
              alt=""
              fill
              priority
              sizes="10vw"
              className="object-cover rounded"
            />
          </div>
        )}
        <p className="pe-2 w-full break-all">{name}</p>
      </div>
      <p>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'usd',
        }).format(price)}
      </p>
      <p>{stock}</p>
      <Link href={`/product/${id}`} className="text-blue-400 hover:underline">
        View Details
      </Link>
    </div>
  );
}
