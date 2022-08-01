//- Lib Imports
import { useDomainMetrics } from "../../lib/hooks/useDomainMetrics";
import { formatEthers, formatNumber } from "../../lib/util/number";
import { useDomain } from "../../lib/hooks/useDomain";

//- Style Imports
import styles from "./ZNS.module.scss";

const ZNS = () => {
  const { tradeData } = useDomainMetrics(
    "0x98a5dd4acd86ecb52b5a7f9b2044c531a96a45b4552b9484fce54ac38b0cb154"
  );

  const { domainData } = useDomain(
    "0x98a5dd4acd86ecb52b5a7f9b2044c531a96a45b4552b9484fce54ac38b0cb154"
  );

  console.log(tradeData);
  console.log("DOMAINDATA", domainData);

  const domain = () => {
    return (
      <>
        <div>Name: {domainData?.name}</div>
        <div>Owner: {domainData?.owner}</div>
        <div>Creator: {domainData?.minter}</div>
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
        {domain()}
        {nftStats()}
      </div>
    </>
  );
};

export default ZNS;
