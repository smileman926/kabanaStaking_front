import detectEthereumProvider from "@metamask/detect-provider";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect, useRef, useState } from "react";

export default function useMetaMaskOnboarding() {
  const ONBOARD_TEXT = "Click here to install MetaMask!";
  const CONNECT_TEXT = "Connect";
  const CONNECTED_TEXT = "Connected";

  const onboarding = useRef<MetaMaskOnboarding>();
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  async function startOnboarding() {
    onboarding.current!.startOnboarding();
  }

  function stopOnboarding() {
    if (onboarding?.current) {
      onboarding.current.stopOnboarding();
    }
  }

  const isWeb3Available = typeof window !== "undefined" && window?.ethereum;
  const isMetaMaskInstalled = MetaMaskOnboarding.isMetaMaskInstalled();

  return {
    startOnboarding,
    stopOnboarding,
    isMetaMaskInstalled,
    isWeb3Available,
  };
}
