import { Alchemy, Network, OwnedNft } from "alchemy-sdk";
import { BigNumber, ethers } from "ethers";
import { GRIGOCHKI_ADDRESS, NFT_STAKING_CONTRACT_ADDRESS } from "../constances";
import { IERC721 } from "../contracts/typechains/IERC721";
import { approve, getApproved } from "../hooks/useGrigochkiTokenFunctions";
import { NFTItem } from "../interfaces/nft-item.interface";

export const getNftsForOwner = async (
  gToken: IERC721,
  account: string
): Promise<NFTItem[] | null> => {
  try {
    const settings = {
      apiKey: "W5j16j4pEFEiDbXGD3FhInh5HpuMTLMg",
      network: Network.MATIC_MUMBAI,
    };

    const alchemy = new Alchemy(settings);

    // alchemy.nft.getNftsForOwner(account).then(console.log);
    const nfts = await alchemy.nft.getNftsForOwner(account);
    const filtered = nfts.ownedNfts.filter(
      (nft) =>
        nft.contract.address.toLowerCase() == GRIGOCHKI_ADDRESS.toLowerCase()
    ) as NFTItem[];

    for await (const item of filtered) {
      const tx = await getApproved(
        gToken!,
        Number(item.tokenId),
        await getTransactionOptions(account)
      );
      if (tx == NFT_STAKING_CONTRACT_ADDRESS) {
        item.isApproved = true;
      } else {
        item.isApproved = false;
      }
    }

    return filtered;
  } catch (e) {}
  return null;
};

export const connectMetamaskOnLoad = () => {
  const isConnected = localStorage.getItem("metamask-connected");
  if (isConnected) {
    const c = isConnected as unknown as boolean;
    return c;
  }

  return false;
};

export const setMetamaskConnectionStatus = (
  s: "connected" | "disconnected"
) => {
  if (s == "connected") {
    localStorage.setItem("metamask-connected", "true");
  } else {
    localStorage.setItem("metamask-connected", "false");
  }
};
export const weiToEther = (amount: BigNumber): string => {
  const res = ethers.utils.formatEther(amount);
  return res;
};

export const etherToWei = (amount: number): BigNumber => {
  const res = ethers.utils.parseEther(amount.toString());
  return res;
};

let PROVIDER: ethers.providers.BaseProvider;

const getRPC = (): string => {
  // return 'https://rpc-mumbai.matic.today';
  return "https://rpc-mumbai.maticvigil.com/";
  // return 'https://polygon-rpc.com';
  // return 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
  // return 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
};

const getProvider = (): ethers.providers.BaseProvider => {
  if (PROVIDER != undefined) {
    return PROVIDER;
  }

  PROVIDER = ethers.providers.getDefaultProvider(getRPC());
  return PROVIDER;
};

export const getTransactionOptions = async (
  account: string,
  value: number = 0
): Promise<Object> => {
  const feeData = await getProvider().getFeeData();
  const n = await getProvider().getTransactionCount(account);
  const gasPrice = Number(feeData.gasPrice) + 10000;
  console.log("gasPrice", gasPrice);
  console.log("feeData.maxFeePerGas", Number(feeData.maxFeePerGas));
  console.log("gasPrice", gasPrice);
  let overrides = {
    gasLimit: 200000,
    gasPrice: gasPrice,
    // value: this.etherToWei(0.001),
    nonce: n,
    // chainId: 137
  };

  if (value != 0) {
    const pure = etherToWei(value).add(200000 * gasPrice);
    overrides["value"] = pure;
  }

  return overrides;
};
