import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ECCClient = dynamic(() => import('./ECCClient'), {
  suspense: true,
});

export const metadata = {
    title: "ECC | FOSSology",
};

export default function SearchPage() {
  return (
      <Suspense fallback={<div>Loading ECC...</div>}>
        <ECCClient />
      </Suspense>
    );
}
