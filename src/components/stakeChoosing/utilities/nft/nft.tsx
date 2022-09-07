import classes from "./nft.module.scss";
import StakeCard from "../../../cards/stakeCard/stakeCard";
import Button from "../../../buttons/button/button";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useClubTokenContract from "../../../../chain/hooks/useGrigochkiTokenContract";
import {
  getNftsForOwner,
  getTransactionOptions,
} from "../../../../chain/tools/chain-utils";
import {
  approve,
  getApproved,
} from "../../../../chain/hooks/useGrigochkiTokenFunctions";
import { NFT_STAKING_CONTRACT_ADDRESS } from "../../../../chain/constances";
import { NFTItem } from "../../../../chain/interfaces/nft-item.interface";
import {
  claim,
  NFTM,
  stake,
  unstakeAll,
} from "../../../../chain/hooks/useStakingContractFunctions";
import useNFTStakingContract from "../../../../chain/hooks/useNFTStakingContract";

const Nft = () => {
  const NFTContract = useClubTokenContract();
  const StakingContract = useNFTStakingContract();
  const { account } = useWeb3React<Web3Provider>();

  const [NFTs, setNFTs] = useState<NFTItem[]>([]);
  const [stakedNFTInfo, setStakedNFTInfo] = useState({
    amountStaked: 0,
    lastClaim: new Date(),
  });

  useEffect(() => {
    if (account && NFTContract) {
      getUserNFTs();
    }
  }, [account, NFTContract]);

  const resetNFTs = () => {
    setNFTs([]);
    getUserNFTs();
  };

  const getUserNFTs = async () => {
    if (StakingContract) {
      const [lastClaim, amountStaked] = await NFTM(StakingContract, account!);

      setStakedNFTInfo({
        amountStaked,
        lastClaim: new Date(Number(lastClaim) * 1000),
      });
    }

    const userNFTs = await getNftsForOwner(NFTContract!, account!);
    if (userNFTs) {
      console.log(userNFTs);
      setNFTs(userNFTs);
      checkApproved(userNFTs);
    }
  };

  const checkApproved = async (userNFTs: NFTItem[]) => {
    for await (const item of userNFTs) {
      const tx = await getApproved(
        NFTContract!,
        Number(item.tokenId),
        await getTransactionOptions(account!)
      );

      if (tx?.toLowerCase() == NFT_STAKING_CONTRACT_ADDRESS.toLowerCase()) {
        item.isApproved = true;
      } else {
        item.isApproved = false;
      }
    }
    setNFTs(userNFTs);
  };

  const approveNFT = async (tokenId: number) => {
    if (NFTContract) {
      const tx = await approve(
        NFTContract!,
        NFT_STAKING_CONTRACT_ADDRESS,
        tokenId
      );
    }
  };

  const onNFTClick = async (nft: NFTItem) => {
    if (nft.isApproved) {
      if (StakingContract) {
        const tx = await stake(
          StakingContract!,
          [Number(nft.tokenId)],
          account!
        );
        resetNFTs();
      }
    } else {
      await approveNFT(Number(nft.tokenId));
      resetNFTs();
    }
  };

  const onClaimClick = async () => {
    if (StakingContract) {
      const tx = await claim(StakingContract!, account!);
      resetNFTs();
    }
  };

  const onUnstakeAllClick = async () => {
    if (StakingContract) {
      const tx = await unstakeAll(StakingContract!, account!);
      resetNFTs();
    }
  };

  return (
    <StakeCard>
      <div className={classes.nft}>
        <div className={classes.nft__title}>
          <p>STAKE NFT - MINE DNUTS</p>
        </div>
        <div className={classes.nft__content}>
          <div className={classes.nft__content_col}>
            <>YOU HAVE</>
            {NFTs.map((nft, index) => {
              if (index % 2 == 0) {
                return (
                  <div
                    key={nft.tokenId}
                    className={classes.nft__content_col_grayRow}
                  >
                    <>#{nft.tokenId}</>
                    <Button onClick={() => onNFTClick(nft)}>
                      {nft.isApproved ? "STAKE" : "APROVE"}
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div
                    key={nft.tokenId}
                    className={classes.nft__content_col_whiteRow}
                  >
                    <>#{nft.tokenId}</>
                    <Button onClick={() => onNFTClick(nft)}>
                      {nft.isApproved ? "STAKE" : "APROVE"}
                    </Button>
                  </div>
                );
              }
            })}

            <div className={classes.nft__content_col_claim}>
              <Button
                onClick={() => onClaimClick()}
                color={"var(--color-green-1)"}
              >
                {" "}
                CLAIM{" "}
              </Button>
            </div>
          </div>
          <div className={classes.nft__content_col}>
            <>CLAIM INFO</>{" "}
            <div className={classes.nft__content_col_whiteRow}>
              <>YOUR LAST CLAIM </>{" "}
            </div>
            <div className={classes.nft__content_col_grayRow}>
              {stakedNFTInfo.lastClaim.toLocaleDateString()}
            </div>
            <div className={classes.nft__content_col_whiteRow}>
              <>MUSHROOMS STAKED</>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              {stakedNFTInfo.amountStaked}
            </div>
            <div className={classes.nft__content_col_unstake}>
              <Button onClick={() => onUnstakeAllClick()}> UNSTAKE ALL </Button>
            </div>
          </div>
        </div>
      </div>
    </StakeCard>
  );
};

export default Nft;
