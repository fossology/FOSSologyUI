import ImportReportClient from "./ReportImportClient";
import { Suspense } from 'react';

export const metadata = {
    title: "Report Import | FOSSology",
};

export default function ImportReportPage() {
  return (
    <Suspense>
      <ImportReportClient />
    </Suspense>
  );
}
