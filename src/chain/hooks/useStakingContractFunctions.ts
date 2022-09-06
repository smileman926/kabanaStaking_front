import { BigNumber } from "ethers";
import { Staking } from "../contracts/typechains/NFTStaking";
import { getTransactionOptions } from "../tools/chain-utils";

export const stake = async (
  staking: Staking,
  tokenIds: number[],
  account: string
) => {
  try {
    const tx = await staking.stake(
      tokenIds,
      await getTransactionOptions(account)
    );
    const txResponse = await tx.wait();

    return txResponse;
  } catch (e) {}
};

export const unstake = async (
  staking: Staking,
  tokenIds: BigNumber[],
  account: string
) => {
  try {
    const tx = await staking.unstake(
      tokenIds,
      await getTransactionOptions(account)
    );
    const txResponse = await tx.wait();
    return txResponse;
  } catch (e) {}
};

export const NFTM = async (
  staking: Staking,
  account: string
): Promise<number> => {
  try {
    const tx = await staking.NFTM(
      account,
      await getTransactionOptions(account)
    );
    return Number(tx.lastClaim);
  } catch (e) {}
  return 0;
};

export const unstakeAll = async (staking: Staking, account: string) => {
  try {
    const tx = await staking.unstakeAll(await getTransactionOptions(account));
    const txResponse = await tx.wait();
    return txResponse;
  } catch (e) {}
};

export const claim = async (staking: Staking, account: string) => {
  try {
    const tx = await staking.claim(await getTransactionOptions(account));
    const txResponse = await tx.wait();
    return txResponse;
  } catch (e) {}
};
