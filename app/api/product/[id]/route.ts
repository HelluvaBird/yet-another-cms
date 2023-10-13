import { getXataClient } from '@/lib/xata';
import { NextResponse } from 'next/server';

const xata = getXataClient();

const getProductInfo = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const record = await xata.db.products.read(params.id);

  return NextResponse.json(record, { status: 200 });
};

const deleteProduct = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  await xata.db.products.delete(id);
  return NextResponse.json('Record deleted successfully', { status: 200 });
};

const updateProoduct = async (
  req: Request,
  { params: { id } }: { params: { id: string } }
) => {
  let { name, description, price, stock, thumbnail, media } = await req.json();

  price = parseInt(price);
  stock = parseInt(stock);

  const record = await xata.db.products.update(id, {
    name,
    description,
    price,
    stock,
    thumbnail,
    media,
  });

  return NextResponse.json(record, { status: 200 });
};

export {
  getProductInfo as GET,
  deleteProduct as DELETE,
  updateProoduct as PATCH,
};
