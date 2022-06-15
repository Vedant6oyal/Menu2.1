import React from "react";
import { makeStyles, AppBar, CssBaseline } from "@material-ui/core";
import clsx from "clsx";
import { icons } from "../../theme";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 47,
    paddingLeft: "2.33%",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#fff",
    boxShadow: "0 0px 0px 0 rgba(0, 0, 0, 0.16)",
    justifyContent: "center",
    height: 47,
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
}));

const Header = ({ children }) => {
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
        </div>
      </AppBar>

      <main
        className={clsx(classes.content)}
        style={{
          marginTop: 47,
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
