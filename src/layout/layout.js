import classes from "./layout.module.scss";

export const Layout = (props) => {
  return <div className={classes.container}>{props.children}</div>;
};
