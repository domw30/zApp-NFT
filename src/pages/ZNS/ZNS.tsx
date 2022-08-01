//- Lib Imports
import { useDomainMetrics } from "lib/hooks/useDomainMetrics";
import { formatEthers } from "lib/util/number";

//- Style Imports
import styles from "./ZNS.module.scss";

const ZNS = () => {
  const { tradeData } = useDomainMetrics(
    "0xd679f47d74935f037b9d4d507a17acdcffeb9672d82778e0adfd4bb583c5f2fc"
  );

  console.log(tradeData);

  return (
    <>
      <div className={styles.Container}>
        {tradeData && formatEthers(tradeData?.highestBid)}
      </div>
    </>
  );
};

export default ZNS;
