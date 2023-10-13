import { redirect } from 'next/navigation';

export default function UpdatePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return redirect(`/product/${id}`);
}
