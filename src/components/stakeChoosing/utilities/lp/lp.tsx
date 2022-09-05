import React, { useEffect, useState } from "react";
import classes from "./lp.module.scss";
import StakeCard from "../../../cards/stakeCard/stakeCard";
import Button from "../../../buttons/button/button";
import useLPTokenContract from "../../../../chain/hooks/useLPTokenContract";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useLPStakingContract from "../../../../chain/hooks/useLPStakingContract";
import {
  etherToWei,
  getTransactionOptions,
} from "../../../../chain/tools/chain-utils";
import { LP_STAKING_CONTRACT_ADDRESS } from "../../../../chain/constances";

const Lp = () => {
  const { account } = useWeb3React<Web3Provider>();

  const [userLPBalance, setUserLPBalance] = useState(0);
  const LpToken = useLPTokenContract();
  const LPStakeContract = useLPStakingContract();

  const [stakeInfo, setStakeInfo] = useState<{
    period: number;
    amount: number;
  }>({ amount: 0, period: 0 });

  useEffect(() => {
    if (account && LpToken) {
      getUserLP();
    }
  }, [account]);

  const getUserLP = async () => {
    const balance = await LpToken!.balanceOf(account!);
    setUserLPBalance(Number(balance));
  };

  const onEnterStakingAmount = (value: number) => {
    setStakeInfo({ ...stakeInfo, amount: value });
  };

  const onSelectPeriodClick = (value: number) => {
    setStakeInfo({ ...stakeInfo, period: value });
  };

  const doStake = async (duration: number) => {
    const t = await LpToken?.approve(
      LP_STAKING_CONTRACT_ADDRESS,
      etherToWei(stakeInfo.amount)
    );
    await t?.wait();
    LPStakeContract?.deposit(
      etherToWei(stakeInfo.amount),
      duration,
      await getTransactionOptions(account!)
    );
  };
  const onStakeClick = async () => {
    if (stakeInfo.amount && stakeInfo.period) {
      switch (stakeInfo.period) {
        case 1:
          doStake(14787);

          break;

        case 2:
          doStake(29574);
          break;

        case 3:
          doStake(44361);
          break;

        default:
          break;
      }
    }
  };

  const onClaimClick = async () => {
    const tx = await LPStakeContract?.withdraw(
      await getTransactionOptions(account!)
    );
  };
  return (
    <StakeCard>
      <div className={classes.lp}>
        <div className={classes.lp__title}>
          <p>STAKE LP - MINE DNUTS</p>
        </div>
        <div className={classes.lp__content}>
          <div className={classes.lp__content_grayRow}>
            <p>YOU HAVE {userLPBalance} LP TOKENS</p>
          </div>
          <div className={classes.lp__content_whiteRow}>
            <p>
              <input
                type="number"
                onChange={(v) => onEnterStakingAmount(Number(v.target.value))}
              ></input>
              TO STAKE
            </p>
          </div>
          <div className={classes.lp__content_grayRow}>
            <p>
              WHAT PERIOD:
              <Button onClick={() => onSelectPeriodClick(1)}>1</Button>
              <Button onClick={() => onSelectPeriodClick(2)}>2</Button>
              <Button onClick={() => onSelectPeriodClick(3)}>3</Button> DAYS
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
            className={classes.lp__content_whiteRow}
          >
            <Button
              onClick={() => onClaimClick()}
              color={"var(--color-green-1)"}
            >
              {" "}
              CLAIM{" "}
            </Button>
            <Button onClick={() => onStakeClick()}>STAKE</Button>
          </div>
        </div>
      </div>
    </StakeCard>
  );
};

export default Lp;
