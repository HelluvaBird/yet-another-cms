import { getXataClient } from '@/lib/xata';
import { NextResponse } from 'next/server';

const xata = getXataClient();

const createProduct = async (req: Request) => {
  let { name, description, price, stock, thumbnail, media } = await req.json();

  price = parseInt(price);
  stock = parseInt(stock);

  try {
    const record = await xata.db.products.create({
      name,
      description,
      price,
      stock,
      thumbnail,
      media,
    });

    return NextResponse.json(record, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error, { status: 500 });
    }
  }
};

const getProducts = async (req: Request) => {
  try {
    const records = await xata.db.products
      .select([
        'id',
        'name',
        'description',
        'price',
        'stock',
        'media',
        'thumbnail',
      ])
      .getAll();

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(error, { status: 500 });
    }
  }
};

export { createProduct as POST, getProducts as GET };
