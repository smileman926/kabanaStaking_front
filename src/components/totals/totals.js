import { useState } from "react";
import classes from "./totals.module.scss";

const Totals = () => {
  const [activePool, setActivePool] = useState("NFT");

  const onChangePoolClick = (poolType) => {
    setActivePool(poolType);
  };

  return (
    <div className={classes.totals}>
      <div className={classes.totals__rowOne}>
        <div className={classes.locked}>
          <div className={classes.locked__title}>Total value locked</div>
          <div className={classes.locked__value}>$145,600</div>
        </div>
        <div className={classes.locked}>
          <div className={classes.locked__title}>Total Rewards - ROI</div>
          <div className={classes.locked__value}>$235,600</div>
        </div>
        <div className={classes.staked}>
          <div className={classes.locked__title}>Total Staked</div>
          <div className={classes.locked__value}>5,230</div>
        </div>
      </div>
      <div className={classes.totals__rowTwo}>
        <div
          className={activePool === "NFT" ? classes.activePool : classes.pool}
          onClick={() => {
            onChangePoolClick("NFT");
          }}
        >
          <p>NFT POOL</p>
        </div>
        <div
          className={activePool === "TOKEN" ? classes.activePool : classes.pool}
          onClick={() => {
            onChangePoolClick("TOKEN");
          }}
        >
          <p>TOKEN POOL</p>
        </div>
      </div>
    </div>
  );
};

export default Totals;
