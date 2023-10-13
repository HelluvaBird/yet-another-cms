import { redirect } from 'next/navigation';

export default function DeletePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return redirect(`/product/${id}`);
}
