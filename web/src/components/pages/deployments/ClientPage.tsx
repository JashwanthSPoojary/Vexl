'use client';

import { LogsViewer } from '@/components/pages/deployments/LogViewer';

export default function ClientPage({ buildId }: { buildId: string }) {
  return (
      <LogsViewer buildId={buildId} />
  );
}
