//- React Imports
import { useState } from "react";
import { useQuery } from "react-query";

//- Hooks Imports
import { useZnsSdk } from "./useZnsSdk";

//- Library Imports
import { DomainMetrics } from "@zero-tech/zns-sdk/lib/types";

export interface UseDomainMetricsReturn {
  domainMetrics: DomainMetrics | undefined;
  isLoading: boolean;
}

export const useDomainMetrics = (domainId: string): UseDomainMetricsReturn => {
  // SDK
  const sdk = useZnsSdk();

  // State
  const [domainMetrics, setDomainMetrics] = useState<
    DomainMetrics | undefined
  >();

  // Query
  const { isLoading } = useQuery(
    `domain-metrics-${domainId}`,
    async () => {
      try {
        const metricsData = await sdk.getDomainMetrics([domainId]);
        setDomainMetrics(metricsData[domainId]);
      } catch (error) {
        // disable error loging in browser console
      }
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    domainMetrics,
    isLoading,
  };
};
