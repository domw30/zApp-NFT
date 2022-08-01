//- React Imports
import { useState } from "react";
import { useQuery } from "react-query";

//- Hooks Imports
import { useZnsSdk } from "./useZnsSdk";

//- Library Imports
import { Domain } from "@zero-tech/zns-sdk/lib/types";

export interface UseDomainReturn {
  domainData: Domain | undefined;
  isLoading: boolean;
}

export const useDomain = (domainId: string): UseDomainReturn => {
  // SDK
  const sdk = useZnsSdk();

  // State
  const [domainData, setDomainData] = useState<Domain | undefined>();

  // Query
  const { isLoading } = useQuery(
    `domain-${domainId}`,
    async () => {
      try {
        const data = await sdk.getDomainById(domainId);
        setDomainData(data);
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
    domainData,
    isLoading,
  };
};
