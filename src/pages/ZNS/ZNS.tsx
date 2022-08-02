//- Lib Imports
import { useDomainMetrics } from "../../lib/hooks/useDomainMetrics";
import { formatEthers } from "../../lib/util/number";
import { useDomain } from "../../lib/hooks/useDomain";
import { useDomainMetadata } from "../../lib/hooks/useDomainMetadata";
import { getDomainId } from "../../lib/util/domains";
import { useSubdomainData } from "../../lib/hooks/useSubdomainData";

//- Style Imports
import styles from "./ZNS.module.scss";

const ZNS = ({ route }) => {
  const domainId = getDomainId(route);

  const { domainMetrics, isLoading: isTradeDataLoading } =
    useDomainMetrics(domainId);

  const { domain, isLoading: isDomainDataLoading } = useDomain(domainId);

  const { domainMetadata, isLoading: isSubdomainDataLoading } =
    useDomainMetadata(domain?.metadataUri);

  const { subdomainData } = useSubdomainData(domainId);

  console.log(domainMetrics);
  console.log("domain", domain);
  console.log("META", domainMetadata);
  console.log("subdomainData", subdomainData);

  const domainData = () => {
    if (isDomainDataLoading) {
      return "data loading....";
    }
    return (
      <>
        <div>Name: {domain?.name}</div>
        <div>Owner: {domain?.owner}</div>
        <div>Creator: {domain?.minter}</div>
        <div>ID: {domain?.id}</div>
      </>
    );
  };

  const metricsNFTView = () => {
    if (isTradeDataLoading) {
      return "data loading....";
    }

    return (
      <>
        <div>BIDS: {domainMetrics?.numberOfBids}</div>
        <div>
          LAST SALE:{" "}
          {domainMetrics?.lastSale
            ? `${formatEthers(domainMetrics?.lastSale)} WILD`
            : "No sales"}
        </div>
        <div>
          VOLUME:{" "}
          {(domainMetrics?.volume as any)?.all
            ? `${formatEthers((domainMetrics?.volume as any)?.all)} WILD`
            : String(0)}
        </div>
      </>
    );
  };

  const metricsSubdomain = () => {
    if (isTradeDataLoading) {
      return "data loading....";
    }

    return (
      <>
        <div>ITEMS: {domainMetrics?.items}</div>
        <div>
          FLOOR PRICE:{" "}
          {domainMetrics?.lowestSale
            ? `${formatEthers(domainMetrics?.lowestSale)} WILD`
            : "No sales"}
        </div>
        <div>
          VOLUME:{" "}
          {(domainMetrics?.volume as any)?.all
            ? `${formatEthers((domainMetrics?.volume as any)?.all)} WILD`
            : String(0)}
        </div>
      </>
    );
  };

  const subdomains = () => {
    if (isSubdomainDataLoading) {
      return "data loading....";
    }

    return subdomainData?.map((sub) => (
      <div key={sub.id}>
        <div>SUBDOMAIN NAME: {sub.name}</div>
        <br />
      </div>
    ));
  };

  // const nftStats = () => {
  //   return (
  //     <>
  //       <div className={styles.Stats}>
  //         <div className={styles.StatContainer}>
  //           <div className={styles.StatsFieldName}>Bids</div>
  //           <div className={styles.StatsTitle}>
  //             {domainMetrics?.numberOfBids}
  //           </div>
  //         </div>
  //         <div className={styles.StatContainer}>
  //           <div className={styles.StatsFieldName}>Last Sale</div>
  //           <div className={styles.StatsTitle}>
  //             {domainMetrics?.lastSale
  //               ? `${formatEthers(domainMetrics?.lastSale)} WILD`
  //               : "No sales"}
  //           </div>
  //         </div>
  //         <div className={styles.StatContainer}>
  //           <div className={styles.StatsFieldName}>Volume</div>
  //           <div className={styles.StatsTitle}>
  //             {(domainMetrics?.volume as any)?.all
  //               ? `${formatEthers((domainMetrics?.volume as any)?.all)} WILD`
  //               : String(0)}
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className={styles.Container}>
        Current Domain Data:
        {domainData()}
        <br />
        Metrics Data NFT View:
        {metricsNFTView()}
        <br />
        Metrics Data Subdomains:
        {metricsSubdomain()}
        <br />
        Subdomains Data:
        {subdomains()}
        {/* {nftStats()} */}
      </div>
    </>
  );
};

export default ZNS;
