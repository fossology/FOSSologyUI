// Server component
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HomeClient = dynamic(() => import('./HomeClient/HomeClient'), {
  suspense: true,
});

export const metadata = {
  title: 'Home | FOSSology',
};

export default function HomePage() {
  return (

    <Suspense fallback={<div>Loading...</div>}>
      <HomeClient />
    </Suspense>
  );
}
