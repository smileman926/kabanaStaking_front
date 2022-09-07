import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../buttons/button/button";
import useMetaMaskOnboarding from "../../chain/tools/useMetaMaskOnboarding";
import { injected } from "../../chain/tools/connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { makeAddressShort } from "../../utils/account-utils";
import { setMetamaskConnectionStatus } from "../../chain/tools/chain-utils";

const ConnectBtn = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const { isMetaMaskInstalled, isWeb3Available, startOnboarding } =
    useMetaMaskOnboarding();

  const connectToMetamask = () => {
    activate(injected, undefined, true)
      .catch((error) => {
        console.log(error);
        // ignore the error if it's a user rejected request
        if (error instanceof UserRejectedRequestError) {
          setIsConnecting(false);
        } else {
          setError(error);
        }
        setMetamaskConnectionStatus("disconnected");
      })
      .then((res) => {
        setMetamaskConnectionStatus("connected");
      });
  };
  if (!isMetaMaskInstalled) {
    return (
      <Button onClick={() => startOnboarding()}>Please Install Metamask</Button>
    );
  }
  if (error) {
    return <Button>Wrong Network</Button>;
  }

  if (!account) {
    return (
      <div>
        <Button onClick={() => connectToMetamask()} disabled={isConnecting}>
          CONNECT WALLET
        </Button>
      </div>
    );
  }

  return <Button>{`${makeAddressShort(account, 4)}`}</Button>;
};

export default ConnectBtn;
