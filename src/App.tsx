/**
 * NOTE: You will need to `npm link` zUI before this repo
 * will build or run.
 */

//- React Imports
import { FC } from "react";

//- Types Imports
import { AppProps } from "./lib/types/app";

//- Page Imports
import { ZNS } from "./pages";

const App: FC<AppProps> = ({ provider, route }) => {
  console.log("prov (nft-dapp):", provider);
  return (
    <main>
      <ZNS />
    </main>
  );
};

export default App;
