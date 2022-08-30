import ApiAnalisysData from "../../components/apiAnalisysData/apiAnalisysData";
import Button from "../../components/buttons/button/button";
import OldPaper from "../../components/oldPaper/oldPaper";
import StakeChoosing from "../../components/stakeChoosing/stakeChoosing";
import Totals from "../../components/totals/totals";
import classes from "./webStake.module.scss";

const WebStake = () => {
  return (
    <div className={classes.webStake}>
      <div className={classes.webStake__rowOne}>
        <Button>CONNECT WALLET</Button>
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
