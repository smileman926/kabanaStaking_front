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
  showTransactionError,
  weiToEther,
} from "../../../../chain/tools/chain-utils";
import { LP_STAKING_CONTRACT_ADDRESS } from "../../../../chain/constances";
import useUNIV2TokenContract from "../../../../chain/hooks/useUniV2Contract";

const Lp = () => {
  const { account } = useWeb3React<Web3Provider>();
  const LpToken = useLPTokenContract();
  const LPStakeContract = useLPStakingContract();
  const UNI_V2 = useUNIV2TokenContract();

  const [userLPBalance, setUserLPBalance] = useState(0);
  const [stakeButtonText, setStakeButtonText] = useState("APPROVE");
  const [stakeInfo, setStakeInfo] = useState<{
    period: number;
    amount: number;
    allowance: number;
  }>({ amount: 0, period: 0, allowance: 0 });

  useEffect(() => {
    if (account && LpToken) {
      getUserLP();
      getUserAllowance();
    }
  }, [account]);

  useEffect(() => {
    checkStakeButtonText();
  }, [stakeInfo]);

  const getUserAllowance = async () => {
    const allowance = await UNI_V2!.allowance(
      account!,
      LP_STAKING_CONTRACT_ADDRESS
    );
    setStakeInfo({ ...stakeInfo, allowance: Number(weiToEther(allowance)) });
  };

  const getUserLP = async () => {
    const balance = await UNI_V2!.balanceOf(account!);

    // weiToEther(balance)
    setUserLPBalance(Number(weiToEther(balance)));
  };

  const checkStakeButtonText = (): boolean => {
    if (stakeInfo.amount > stakeInfo.allowance) {
      setStakeButtonText("APPROVE");
      return false;
    } else {
      setStakeButtonText("STAKE");
      return true;
    }
  };

  const onEnterStakingAmount = (value: number) => {
    if (value > stakeInfo.allowance) {
      setStakeInfo({ ...stakeInfo, amount: value });
    } else {
      setStakeInfo({ ...stakeInfo, amount: value });
    }
  };

  const onEnterStakingDuration = (value: number) => {
    if (value > 0) {
      setStakeInfo({ ...stakeInfo, period: value - 1 });
    }
  };

  const onSelectPeriodClick = (value: number) => {
    setStakeInfo({ ...stakeInfo, period: value });
  };

  function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

  const doStake = async (duration: number) => {
    const check = checkStakeButtonText();
    // const val = etherToWei(stakeInfo.amount);
    // console.log("duration", duration);
    if (check) {
      try {
        const t = await LPStakeContract?.deposit(
          etherToWei(stakeInfo.amount),
          duration,
          await getTransactionOptions(account!)
        );
        const r = await t?.wait();
      } catch (e) {
        console.log(e.error);
        // let reason = hex_to_ascii(e.toString().substring(138))
        // console.log('revert reason:', reason)
        // showTransactionError(e)
      }
    } else {
      const t = await UNI_V2?.approve(
        LP_STAKING_CONTRACT_ADDRESS,
        etherToWei(stakeInfo.amount),
        await getTransactionOptions(account!)
      );
      await t?.wait();
      getUserAllowance();
    }
  };
  const onStakeClick = async () => {
    console.log(stakeInfo.amount);
    console.log(stakeInfo.period);
    if (stakeInfo.amount && stakeInfo.period != undefined) {
      doStake(stakeInfo.period);
      // switch (stakeInfo.period) {
      //   case 1:
      //     // doStake(1);
      //     doStake(0);

      //     break;

      //   case 2:
      //     doStake(1);
      //     break;

      //   case 3:
      //     doStake(2);
      //     break;

      //   default:
      //     break;
      // }
    } else {
      alert("Please enter amount and select period");
    }
  };

  const onClaimClick = async () => {
    try {
      const tx = await LPStakeContract?.withdraw(
        await getTransactionOptions(account!)
      );
      await tx?.wait();
    } catch (e) {
      console.log(e);
    }
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
          <div
            style={{ flexDirection: "row" }}
            className={classes.lp__content_whiteRow}
          >
            <input
              type="number"
              style={{ width: "50%" }}
              className={classes.lp__content_whiteRow}
              onChange={(v) => onEnterStakingAmount(Number(v.target.value))}
            ></input>
            <p style={{ textAlign: "justify" }}>TO STAKE</p>
          </div>
          <div className={classes.input_section_grayRow}>
            <p>WHAT PERIOD:</p>

            <input
              style={{ width: "50%" }}
              className={classes.lp__content_grayRow}
              type="number"
              min={1}
              onChange={(v) => onEnterStakingDuration(Number(v.target.value))}
            ></input>
            <p>DAYS</p>
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
            <Button onClick={() => onStakeClick()}>{stakeButtonText}</Button>
          </div>
        </div>
      </div>
    </StakeCard>
  );
};

export default Lp;
