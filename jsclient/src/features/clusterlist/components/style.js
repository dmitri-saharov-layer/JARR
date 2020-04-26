import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { feedListWidth, editPanelWidth } from "../../../const";

export default makeStyles((theme: Theme) =>
  createStyles({
    tabs: {
      maxWidth: "100%",
    },
    article: {
      "& p": {
        maxWidth: 800,
        "& span": {
          paddingRight: 30,
          fontStyle: "bold",
        },
      },
    },
    summary: {
      padding: 0,
      paddingRight: 15,
      margin: 0,
      "& .MuiExpansionPanelSummary-content": {
        flexDirection: "column",
        padding: "6px 0 6px 10px",
        margin: 0,
        maxWidth: "100%",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      "& .MuiExpansionPanelSummary-expandIcon": {
        padding: 6,
      },
    },
    link: {
      verticalAlign: "middle",
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 4,
      "& a": {
        lineHeight: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
      },
      "& img": {
        position: "relative",
        top: 4,
        margin: "0 6px 0 1px",
        maxHeight: 18,
        height: 18,
        maxWidth: 18,
        width: 18,
      },
    },
    mainTitle: {
      paddingLeft: 5,
      display: "inline",
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      overflow: "hidden",
      maxWidth: "100%",
    },
    mainTitleExpanded: {
      whiteSpace: "break-spaces",
    },
    titleAction: {
      padding: 0,
      margin: 0,
    },
    content: {
      display: "block",
      maxWidth: "100%",
    },
    main: {
      flexGrow: 1,
      paddingTop: 64+ theme.spacing(2),
      padding: theme.spacing(2),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -feedListWidth,
      marginRight: -editPanelWidth,
      maxWidth: `100%`,
    },
    mainShifted: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      maxWidth: `calc(100% - ${feedListWidth}px)`,
    },
    mainSplitted: {
      display: "flex",
      justifyContent: "space-between",
    },
    clusterList: {
      display: "block",
      width: "45%",
    },
    clusterListShifted: {
      display: "block",
      width: "40%",
    },
    contentPanel: {
      display: "block",
      width: "55%",
      marginLeft: theme.spacing(2),
      padding: theme.spacing(2),
      '& *': {
        maxWidth: "97%",
      },
    },
    contentPanelShifted: {
      display: "block",
      width: "60%",
    },
  })
);