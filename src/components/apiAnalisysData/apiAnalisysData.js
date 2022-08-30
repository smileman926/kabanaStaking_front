import classes from "./apiAnalisysData.module.scss";

const ApiAnalisysData = () => {
  return (
    <div className={classes.apiAnalisysData}>
      <div className={classes.apiAnalisysData__title}>ANALISYS DATA</div>
      <div className={classes.apiAnalisysData__list}>
        <p>TVL:</p>
        <p>NFTs staked:</p>
        <p>LP Stakers: ...</p>
        <p>Left in mine:</p>
      </div>
    </div>
  );
};

export default ApiAnalisysData;
