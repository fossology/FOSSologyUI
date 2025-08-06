import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CopyrightClient = dynamic(() => import('./CopyrightClient'), {
  suspense: true,
});

export const metadata = {
    title: "Copyright Browser | FOSSology",
};

export default function SearchPage() {
  return (
      <Suspense fallback={<div>Loading Copyright...</div>}>
        <CopyrightClient />
      </Suspense>
    );
}
