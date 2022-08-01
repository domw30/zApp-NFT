//- React Imports
import { useState } from "react";

//- Lib Imports
import { useDomainMetrics } from "../../lib/hooks/useDomainMetrics";
import { ethers } from "ethers";

//- Style Imports
import styles from "./ZNS.module.scss";

export const formatNumber = (number: number | string) => {
  return Number(number).toLocaleString();
};

export const formatEthers = (number: string) => {
  const asNumber = Number(ethers.utils.formatEther(number));
  return formatNumber(asNumber);
};

const ZNS = () => {
  const { tradeData } = useDomainMetrics(
    "0x6ac9b49d77117984ae21556480c5585d36b2fb94545ab0adbc270a55bb59931b"
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
