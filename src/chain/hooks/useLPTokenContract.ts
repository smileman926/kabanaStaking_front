import { CLUB_TOKEN_ADDRESS } from "../constances";
import erc20Json from "../contracts/abis/LPMine.sol/IERC20.json";
import type { IERC20 } from "../contracts/typechains/IERC20";
import useContract from "./useContract";

export default function useLPTokenContract() {
  return useContract<IERC20>(CLUB_TOKEN_ADDRESS, erc20Json.abi);
}
