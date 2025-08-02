import dynamic from "next/dynamic";
import { Suspense } from "react";

const LicenseBrowserClient = dynamic(() => import("./LicenseBrowserClient"), {
  suspense: true,
});

export const metadata = {
  title: "License Browser | FOSSology",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading license browser...</div>}>
      <LicenseBrowserClient />
    </Suspense>
  );
}
