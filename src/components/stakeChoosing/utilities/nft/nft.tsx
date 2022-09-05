import classes from "./nft.module.scss";
import StakeCard from "../../../cards/stakeCard/stakeCard";
import Button from "../../../buttons/button/button";
import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useClubTokenContract from "../../../../chain/hooks/useGrigochkiTokenContract";
import { getNftsForOwner } from "../../../../chain/tools/chain-utils";
import { approve } from "../../../../chain/hooks/useGrigochkiTokenFunctions";
import { NFT_STAKING_CONTRACT_ADDRESS } from "../../../../chain/constances";
import { NFTItem } from "../../../../chain/interfaces/nft-item.interface";
import {
  claim,
  stake,
  unstakeAll,
} from "../../../../chain/hooks/useStakingContractFunctions";
import useNFTStakingContract from "../../../../chain/hooks/useNFTStakingContract";

const Nft = () => {
  const NFTContract = useClubTokenContract();
  const StakingContract = useNFTStakingContract();
  const { account } = useWeb3React<Web3Provider>();

  const [NFTs, setNFTs] = useState<NFTItem[]>([]);

  useEffect(() => {
    if (account && NFTContract) {
      getUserNFTs();
    }
  }, [account, NFTContract]);

  const getUserNFTs = async () => {
    const userNFTs = await getNftsForOwner(NFTContract!, account!);
    if (userNFTs) {
      console.log(userNFTs);
      setNFTs(userNFTs);
    }
  };

  const approveNFT = async (tokenId: number) => {
    if (NFTContract) {
      const tx = await approve(
        NFTContract!,
        NFT_STAKING_CONTRACT_ADDRESS,
        tokenId
      );
      console.log(tx);
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
        getUserNFTs();
      }
    } else {
      approveNFT(Number(nft.tokenId));
    }
  };

  const onClaimClick = async () => {
    if (StakingContract) {
      const tx = await claim(StakingContract!, account!);
      getUserNFTs();
    }
  };

  const onUnstakeAllClick = async () => {
    if (StakingContract) {
      const tx = await unstakeAll(StakingContract!, account!);
      getUserNFTs();
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
                  <div className={classes.nft__content_col_grayRow}>
                    <>#{nft.tokenId}</>
                    <Button onClick={() => onNFTClick(nft)}>
                      {nft.isApproved ? "STAKE" : "APROVE"}
                    </Button>
                  </div>
                );
              } else {
                return (
                  <div className={classes.nft__content_col_whiteRow}>
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
            <>YOU STAKED</>{" "}
            <div className={classes.nft__content_col_whiteRow}>
              <>#314</>
              <Button>UNSTAKE</Button>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              <>#69</>
              <Button>UNSTAKE</Button>
            </div>
            <div className={classes.nft__content_col_whiteRow}>
              <>#5</>
              <Button>UNSTAKE</Button>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              <>#3333</>
              <Button>UNSTAKE</Button>
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
