import { LP_STAKING_CONTRACT_ADDRESS } from "../constances";
import lpAbi from "../contracts/abis/LPMine.sol/Staking.json";
import type { Staking } from "../contracts/typechains/LPStaking";
import useContract from "./useContract";

export default function useLPStakingContract() {
  return useContract<Staking>(LP_STAKING_CONTRACT_ADDRESS, lpAbi.abi);
}
