'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}
export default function Providers({ children }: Props) {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </>
  );
}
