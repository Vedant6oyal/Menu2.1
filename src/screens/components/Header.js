import React from "react";
import { makeStyles, AppBar, CssBaseline, Typography } from "@material-ui/core";
import clsx from "clsx";
import { colors, icons } from "../../theme";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 56,
    paddingLeft: "2.33%",
    justifyContent: 'space-between',
    paddingRight: "2.33%",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#fff",
    boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.16)",
    justifyContent: "center",
    height: 56,
  },
  logoStyle: {
    height: 36,
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: 3,
  },
  buttonContainer: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    height: 29,
    border: `1px solid ${colors.blueColor}`,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  drinkIcon: {
    height: 16,
    width: 14,
  },
  foodIcon: {
    height: 21,
    width: 21,
  },
  buttonText: {
    fontFamily: 'Poppins',
    color: colors.blueColor,
    fontSize: 14,
    marginLeft: 10,
  },
  flCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  foodBorderColor: {
    borderColor: colors.orangeLight,
  },
  foodTextColor: {
    color: colors.orangeLight,
  },
}));

const Header = ({
  children,
  handleActiveState,
  activeState,
}) => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <CssBaseline />
        <div className={classes.container}>
          <img
            src="https://static.wixstatic.com/media/fea9eb_0633e0df0ea44e259e42a4f1cb896d7e~mv2.png/v1/crop/x_0,y_24,w_504,h_150/fill/w_382,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Screenshot%202021-11-20%20at%202_59_27%20PM.png"
            alt="logo"
            className={classes.logoStyle}
          />

          <div className={classes.flCenter}>
            <div
              className={[classes.buttonContainer, classes.foodBorderColor].join(' ')}
              style={activeState === 1 ? { background: colors.orangeLight, } : {}}
              onClick={() => handleActiveState(1)}
            >
              <img src={activeState === 1 ? icons.foodIconWhite : icons.foodIcon}
                className={classes.foodIcon} alt="drink"
              />
              <Typography className={[classes.buttonText, classes.foodTextColor].join(' ')} style={activeState === 1 ? { color: colors.whiteColor } : {}}>Food</Typography>
            </div>

            <div
              className={classes.buttonContainer}
              style={activeState === 2 ? { background: colors.blueColor, } : {}}
              onClick={() => handleActiveState(2)}
            >
              <img src={activeState === 2 ? icons.drinkIcon : icons.drinkIconBlue} className={classes.drinkIcon} alt="drink" />
              <Typography className={classes.buttonText} style={activeState === 2 ? { color: colors.whiteColor } : {}}>Drink</Typography>
            </div>
          </div>
        </div>
      </AppBar>

      <main
        className={clsx(classes.content)}
        style={{
          marginTop: 56,
          paddingTop: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Header;
