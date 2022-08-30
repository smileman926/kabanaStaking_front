import "./App.scss";
import { Layout } from "./layout/layout";
import WebStake from "./pages/webStake/webStake";

function App() {
  return (
    <div className="App">
      <Layout>
        <WebStake />
      </Layout>
    </div>
  );
}

export default App;
