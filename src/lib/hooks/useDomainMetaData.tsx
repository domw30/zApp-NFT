//- React Imports
import { useState } from "react";
import { useQuery } from "react-query";

//- Types Imports
import { Metadata } from "../types/metadata";

//- Library Imports
import { parseDomainMetadata } from "../metadata";
import useZnsSdk from "./useZnsSdk";

export interface UseDomainMetadataReturn {
  domainMetadata: Metadata;
  isLoading: boolean;
}

export const useDomainMetadata = (uri: string): UseDomainMetadataReturn => {
  const sdk = useZnsSdk();

  const [domainMetadata, setDomainMetadata] = useState<Metadata | undefined>();

  // Query
  const { isLoading } = useQuery(
    `domain-metadata-${uri}`,
    async () => {
      try {
        const raw = await sdk.utility.getMetadataFromUri(uri);
        if (raw) {
          const parsedData = parseDomainMetadata(raw);
          setDomainMetadata(parsedData);
        }
      } catch (error) {
        // disable error logging in browser console
      }
    },
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return {
    domainMetadata,
    isLoading,
  };
};
