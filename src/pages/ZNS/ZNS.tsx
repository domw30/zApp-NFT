//- Lib Imports
import { useDomainMetrics } from "../../lib/hooks/useDomainMetrics";
import { formatEthers } from "../../lib/util/number";
import { useDomain } from "../../lib/hooks/useDomain";
import { useDomainMetadata } from "../../lib/hooks/useDomainMetaData";
import { getDomainId } from "../../lib/util/domains";

//- Style Imports
import styles from "./ZNS.module.scss";

const ZNS = ({ route }) => {
  const domainId = getDomainId(route);

  const { tradeData } = useDomainMetrics(domainId);

  const { domain } = useDomain(domainId);

  const { domainMetadata } = useDomainMetadata(domain?.metadataUri);

  console.log(tradeData);
  console.log("domain", domain);
  console.log("META", domainMetadata);

  const domainData = () => {
    return (
      <>
        <div>Name: {domain?.name}</div>
        <div>Owner: {domain?.owner}</div>
        <div>Creator: {domain?.minter}</div>
        <div>ID: {domain?.id}</div>
        <div>BIDS: {tradeData?.numberOfBids}</div>
      </>
    );
  };

  const nftStats = () => {
    return (
      <>
        <div className={styles.Stats}>
          <div className={styles.StatContainer}>
            <div className={styles.StatsFieldName}>Bids</div>
            <div className={styles.StatsTitle}>{tradeData?.numberOfBids}</div>
          </div>
          <div className={styles.StatContainer}>
            <div className={styles.StatsFieldName}>Last Sale</div>
            <div className={styles.StatsTitle}>
              {tradeData?.lastSale
                ? `${formatEthers(tradeData?.lastSale)} WILD`
                : "No sales"}
            </div>
          </div>
          <div className={styles.StatContainer}>
            <div className={styles.StatsFieldName}>Volume</div>
            <div className={styles.StatsTitle}>
              {(tradeData?.volume as any)?.all
                ? `${formatEthers((tradeData?.volume as any)?.all)} WILD`
                : String(0)}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={styles.Container}>
        {domainData()}
        {nftStats()}
      </div>
    </>
  );
};

export default ZNS;
