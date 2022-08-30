import classes from "./nft.module.scss";
import StakeCard from "../../../cards/stakeCard/stakeCard";
import Button from "../../../buttons/button/button";

const Nft = () => {
  return (
    <StakeCard>
      <div className={classes.nft}>
        <div className={classes.nft__title}>
          <p>STAKE NFT - TOKEN MINE</p>
        </div>
        <div className={classes.nft__content}>
          <div className={classes.nft__content_col}>
            <>YOU HAVE</>
            <div className={classes.nft__content_col_grayRow}>
              <>#751</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_whiteRow}>
              <>#167</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              <>#7</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_whiteRow}>
              <>#44</>
              <Button>APROVE</Button>
            </div>
          </div>
          <div className={classes.nft__content_col}>
            <>YOU STAKED</>{" "}
            <div className={classes.nft__content_col_whiteRow}>
              <>#314</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              <>#69</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_whiteRow}>
              <>#5</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_grayRow}>
              <>#3333</>
              <Button>APROVE</Button>
            </div>
            <div className={classes.nft__content_col_unstake}>
              <Button> UNSTAKE ALL </Button>
            </div>
          </div>
        </div>
      </div>
    </StakeCard>
  );
};

export default Nft;
