import { useContext } from "react";
import { ZnsSdkContext } from "lib/providers/ZnsSdkProvider";

export function useZnsSdk() {
  return useContext(ZnsSdkContext);
}
export default useZnsSdk;
