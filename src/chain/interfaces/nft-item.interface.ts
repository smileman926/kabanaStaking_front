import { OwnedNft } from "alchemy-sdk";

export interface NFTItem extends OwnedNft {
  isApproved: boolean;
}
