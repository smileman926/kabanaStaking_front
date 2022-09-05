import ApiAnalisysData from "../../components/apiAnalisysData/apiAnalisysData";
import Button from "../../components/buttons/button/button";
import OldPaper from "../../components/oldPaper/oldPaper";
import StakeChoosing from "../../components/stakeChoosing/stakeChoosing";
import Totals from "../../components/totals/totals";
import classes from "./webStake.module.scss";
import ConnectBtn from "../../components/connectBtn/connect-btn";
import useStakingContract from "../../chain/hooks/useNFTStakingContract";
import { stake } from "../../chain/hooks/useStakingContractFunctions";
import { useEffect } from "react";
import React from "react";
import { connectMetamaskOnLoad } from "../../chain/tools/chain-utils";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../chain/tools/connectors";
const WebStake = () => {
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  useEffect(() => {
    if (connectMetamaskOnLoad()) {
      activate(injected, undefined, true).catch((error) => {});
    }
  });

  return (
    <div className={classes.webStake}>
      <div className={classes.webStake__rowOne}>
        {/* <Button>CONNECT WALLET</Button> */}
        <ConnectBtn />
      </div>
      <div className={classes.webStake__rowTwo}>
        <div className={classes.webStake__rowTwo_colOne}>
          <Totals />
        </div>
        <div className={classes.webStake__rowTwo_colTwo}>
          <OldPaper />
        </div>
      </div>
      <div className={classes.webStake__rowThree}>
        <div className={classes.webStake__rowThree_colOne}>
          <StakeChoosing />
        </div>
        <div className={classes.webStake__rowThree_colTwo}>
          <ApiAnalisysData />
        </div>
      </div>
    </div>
  );
};

export default WebStake;
