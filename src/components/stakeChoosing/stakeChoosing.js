import classes from "./stakeChoosing.module.scss";
import Lp from "./utilities/lp/lp";
import Nft from "./utilities/nft/nft";

const StakeChoosing = () => {
  return (
    <div className={classes.stakeChoosing}>
      <Lp />
      <Nft />
    </div>
  );
};

export default StakeChoosing;
