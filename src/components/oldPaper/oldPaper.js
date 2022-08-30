import classes from "./oldPaper.module.scss";

const OldPaper = () => {
  const rows = ["Mushroom", "Club Coin", "dNuts", "Offers", "Wins"];

  return (
    <div className={classes.oldPaper}>
      <div className={classes.oldPaper__paper}>
        <div className={classes.oldPaper__paper_list}>
          {rows &&
            rows.map((item) => {
              return (
                <div key={item} className={classes.row}>
                  <p>{item}: </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OldPaper;
