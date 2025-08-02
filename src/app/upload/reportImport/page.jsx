import dynamic from "next/dynamic";
import { Suspense } from "react";

const ReportImportClient = dynamic(() => import("./ReportImportClient"), {
  suspense: true,
});


export const metadata = {
  title: "Report Import | FOSSology",
};

export default function ImportReportPage() {
  return (

    <Suspense fallback={<div>Loading report import...</div>}>
      <ReportImportClient />
    </Suspense>
  );
}
