import { NFT_STAKING_CONTRACT_ADDRESS } from "../constances";
import stakingAbi from "../contracts/abis/Staking.sol/Staking.json";
import type { Staking } from "../contracts/typechains/NFTStaking";
import useContract from "./useContract";

export default function useNFTStakingContract() {
  return useContract<Staking>(NFT_STAKING_CONTRACT_ADDRESS, stakingAbi.abi);
}
