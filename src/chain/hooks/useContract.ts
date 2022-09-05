import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";

export default function useContract<T extends Contract = Contract>(
  address: string,
  ABI: any
): T | null {
  const { library, account, chainId } = useWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library || !chainId) {
      return null;
    }

    try {
      return new Contract(address, ABI, library.getSigner(account));
    } catch (err) {
      console.error("Failed To Reach Contract", err);

      return null;
    }
  }, [address, ABI, library, account]) as T;
}
