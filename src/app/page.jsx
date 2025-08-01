// Server component
import HomeClient from './HomeClient/HomeClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Home | FOSSology',
};

export default function HomePage() {
  return (
    <Suspense>
      <HomeClient />
    </Suspense>
  );
}
