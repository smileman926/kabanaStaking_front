import classes from "./stakeChoosing.module.scss";
import Lp from "./utilities/lp/lp";
import Nft from "./utilities/nft/nft";

const StakeChoosing = () => {
  return (
    <div className={classes.stakeChoosing}>
      <div className={classes.stakeChoosing__lp}>
        <Lp />
      </div>

      <div className={classes.stakeChoosing__nft}>
        <Nft />
      </div>
    </div>
  );
};

export default StakeChoosing;
