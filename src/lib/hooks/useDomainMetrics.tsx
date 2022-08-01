//- React Imports
import { useState } from "react";
import { useQuery } from "react-query";

//- Hooks Imports
import { useZnsSdk } from "./useZnsSdk";

//- Library Imports
import { DomainMetrics } from "@zero-tech/zns-sdk/lib/types";

export interface UseuseDomainMetricsReturn {
  tradeData: DomainMetrics | undefined;
  isLoading: boolean;
}

export const useDomainMetrics = (
  domainId: string
): UseuseDomainMetricsReturn => {
  // SDK
  const sdk = useZnsSdk();

  // State
  const [tradeData, setTradeData] = useState<DomainMetrics | undefined>();

  // Query
  const { isLoading } = useQuery(
    `domain-metrics-${domainId}`,
    async () => {
      try {
        const metricsData = await sdk.getDomainMetrics([domainId]);
        setTradeData(metricsData[domainId]);
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
    tradeData,
    isLoading,
  };
};
