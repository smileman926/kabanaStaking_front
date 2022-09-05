import { BigNumber } from "ethers";
import { IERC721 } from "../contracts/typechains/IERC721";
import { Network, Alchemy } from "alchemy-sdk";

export const approve = async (
  grigochki: IERC721,
  to: string,
  tokenId: number
) => {
  try {
    const tx = await grigochki.approve(to, tokenId);
    const txResponse = await tx.wait();
    return txResponse;
  } catch (e) {}
};

export const getApproved = async (
  grigochki: IERC721,
  tokenId: number,
  options: any
) => {
  try {
    const tx = await grigochki.getApproved(tokenId, options);
    // const approveTxUnsigned = await grigochki.populateTransaction.walletOfOwner("SOME_ADDRESS", "1000000");

    return tx;
  } catch (e) {}
};

export const ownerOf = async (
  grigochki: IERC721,
  tokenId: number,
  options: any
) => {
  try {
    const tx = await grigochki.ownerOf(tokenId, options);
    return tx;
  } catch (e) {}
};

export const balanceOf = async (grigochki: IERC721, address: string) => {
  try {
    const tx = await grigochki.balanceOf(address);
    return tx;
  } catch (e) {}
};
