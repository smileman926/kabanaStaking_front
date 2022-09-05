import { CLUB_TOKEN_ADDRESS } from "../constances";
import clubJson from "../contracts/abis/Staking.sol/IERC721.json";
import type { IERC721 } from "../contracts/typechains/IERC721";
import useContract from "./useContract";

export default function useClubTokenContract() {
  return useContract<IERC721>(CLUB_TOKEN_ADDRESS, clubJson.abi);
}
