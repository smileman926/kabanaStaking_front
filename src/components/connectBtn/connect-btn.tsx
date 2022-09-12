import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../buttons/button/button";
import useMetaMaskOnboarding from "../../chain/tools/useMetaMaskOnboarding";
import { injected, walletconnect } from "../../chain/tools/connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { makeAddressShort } from "../../utils/account-utils";
import {
  setMetamaskConnectionStatus,
  setWalletConnectConnectionStatus,
} from "../../chain/tools/chain-utils";
import { isMobile } from "react-device-detect";

// import WalletConnectProvider from "@walletconnect/web3-provider";
// import { providers } from "ethers";

const ConnectBtn = () => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { error, activate, account, setError } = useWeb3React();

  const { isMetaMaskInstalled, startOnboarding } = useMetaMaskOnboarding();

  const connectWithWalletConnect = async () => {
    activate(walletconnect, (error) => {
      setWalletConnectConnectionStatus("disconnected");
      console.error(error);
    }).then((res) => {
      setWalletConnectConnectionStatus("connected");
    });
  };
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

  if (isMobile) {
    if (error) {
      return <Button>Wrong Network</Button>;
    }

    if (!account) {
      return (
        <div>
          <Button
            onClick={() => connectWithWalletConnect()}
            disabled={isConnecting}
          >
            Wallet Connect
          </Button>
        </div>
      );
    }

    return (
      <>
        <div>
          <Button>{`${makeAddressShort(account, 4)}`}</Button>
        </div>
      </>
    );
  } else {
    if (!isMetaMaskInstalled) {
      return (
        <Button onClick={() => startOnboarding()}>
          Please Install Metamask
        </Button>
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

    return (
      <>
        <div>
          <Button>{`${makeAddressShort(account, 4)}`}</Button>
        </div>
      </>
    );
  }
};

export default ConnectBtn;
