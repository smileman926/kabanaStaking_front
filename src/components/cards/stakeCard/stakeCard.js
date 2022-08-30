import classes from "./stakeCard.module.scss";

const StakeCard = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};

export default StakeCard;
