import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [80001],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    80001: "https://rpc-mumbai.maticvigil.com/",
  },
  qrcode: true,
});
