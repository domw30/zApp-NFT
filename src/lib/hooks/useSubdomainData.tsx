//- React Imports
import { useState } from "react";
import { useQuery } from "react-query";

//- Hooks Imports
import { useZnsSdk } from "./useZnsSdk";

//- Library Imports
import { Domain } from "@zero-tech/zns-sdk/lib/types";

export interface useSubdomainDataReturn {
  subdomainData: Domain[] | undefined;
  isLoading: boolean;
}

export const useSubdomainData = (domainId: string): useSubdomainDataReturn => {
  // SDK
  const sdk = useZnsSdk();

  // State
  const [subdomainData, setSubdomainData] = useState<Domain[] | undefined>();

  // Query
  const { isLoading } = useQuery(
    `domain-subdomains-${domainId}`,
    async () => {
      try {
        const subdomains = await sdk.getSubdomainsById(domainId);
        setSubdomainData(subdomains);
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
    subdomainData,
    isLoading,
  };
};
