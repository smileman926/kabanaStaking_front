import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import "./App.scss";
import getLibrary from "./chain/tools/getLibrary";
import { Layout } from "./layout/layout";
import WebStake from "./pages/webStake/webStake";

function App() {
  return (
    <div className="App">
      <Web3ReactProvider getLibrary={getLibrary}>
        <Layout>
          <WebStake />
        </Layout>
      </Web3ReactProvider>
    </div>
  );
}

export default App;
