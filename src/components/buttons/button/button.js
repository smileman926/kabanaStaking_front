import classes from "./button.module.scss";

const Button = (props) => {
  const { color, disabled } = props;

  if (disabled) {
    return (
      <button
        disabled
        className={classes.button}
        style={{ backgroundColor: "var(--color-gray-2)" }}
      >
        {props.children}
      </button>
    );
  }

  return (
    <button onClick={props.onClick} className={classes.button}>
      {props.children}
    </button>
  );
};

export default Button;
