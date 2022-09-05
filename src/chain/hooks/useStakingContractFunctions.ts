import { BigNumber } from "ethers";
import { Staking } from "../contracts/typechains/NFTStaking";
import { getTransactionOptions } from "../tools/chain-utils";

export const stake = async (
  staking: Staking,
  tokenIds: number[],
  account: string
) => {
  try {
    console.log("Staking");
    console.log("Staking tokenIds", tokenIds);
    const tx = await staking.stake(
      tokenIds,
      await getTransactionOptions(account)
    );
    const txResponse = await tx.wait();
    console.log("Staking txResponse", txResponse);

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

export const NFTM = async (staking: Staking, account: string) => {
  try {
    const tx = await staking.NFTM(
      account,
      await getTransactionOptions(account)
    );
    // const txResponse = await tx.wait();
    console.log("NFTM", tx);
    return tx;
  } catch (e) {}
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
