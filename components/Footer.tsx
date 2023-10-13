'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  return pathname === '/' ? (
    <div className="h-[5vh] lg:h-[8vh] border-t bg-[#F8F8F2] text-center grid place-content-center">
      <p>&copy; Yet Another CMS {new Date(Date.now()).getFullYear()}</p>
    </div>
  ) : null;
}
