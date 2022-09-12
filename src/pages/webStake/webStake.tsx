import ApiAnalisysData from "../../components/apiAnalisysData/apiAnalisysData";
import OldPaper from "../../components/oldPaper/oldPaper";
import StakeChoosing from "../../components/stakeChoosing/stakeChoosing";
import Totals from "../../components/totals/totals";
import classes from "./webStake.module.scss";
import ConnectBtn from "../../components/connectBtn/connect-btn";
import { useEffect } from "react";
import React from "react";
import {
  connectMetamaskOnLoad,
  connectWalletConnectOnLoad,
} from "../../chain/tools/chain-utils";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../../chain/tools/connectors";
const WebStake = () => {
  const { activate } = useWeb3React();

  useEffect(() => {
    if (connectMetamaskOnLoad()) {
      activate(injected, undefined, true).catch((error) => {});
    } else if (connectWalletConnectOnLoad()) {
      activate(walletconnect, (error) => console.error(error));
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
