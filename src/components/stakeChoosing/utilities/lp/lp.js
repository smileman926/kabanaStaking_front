import classes from "./lp.module.scss";
import StakeCard from "../../../cards/stakeCard/stakeCard";
import Button from "../../../buttons/button/button";

const Lp = () => {
  return (
    <StakeCard>
      <div className={classes.lp}>
        <div className={classes.lp__title}>
          <p>STAKE LP</p>
        </div>
        <div className={classes.lp__content}>
          <div className={classes.lp__content_grayRow}>
            <p>YOU HAVE ... LP TOKENS</p>
          </div>
          <div className={classes.lp__content_whiteRow}>
            <p>HOW MUCH TO STAKE...LP TOKENS</p>
          </div>
          <div className={classes.lp__content_grayRow}>
            <p>
              WHAT PERIOD:<Button>4</Button>
              <Button>8</Button>
              <Button>12</Button> MONTHS
            </p>
          </div>
          <div
            style={{ alignItems: "flex-end" }}
            className={classes.lp__content_whiteRow}
          >
            <Button>STAKE</Button>
          </div>
        </div>
      </div>
    </StakeCard>
  );
};

export default Lp;
