import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// material ui components
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";

import LikedIcon from '@material-ui/icons/Star';
import LikedIconBorder from '@material-ui/icons/StarBorder';
// jarr
import { doFetchCluster, doEditCluster, removeClusterSelection,
         updateClusterAttrs,
} from "../clusterSlice";
import { changeReadCount } from "../../feedlist/feedSlice";

function mapStateToProps(state) {
  return { requestedClusterId: state.clusters.requestedClusterId,
           loadedCluster: state.clusters.loadedCluster,
           unreadOnClose: !state.clusters.filters.filter,
  };
}

const mapDispatchToProps = (dispatch) => ({
  handleClickOnPanel(e, clusterId, feedsId, categoriesId,
                     unreadOnClose, expanded) {
    // that is very ugly, didn't find a better way yet
    // ignoring link click
    if (e.target.attributes.ignoreonpanel
        && e.target.attributes.ignoreonpanel.nodeValue === "true") {
      return;
    }
    // ignoring command click
    const targetName = e.target.attributes.name;
    if (targetName && (targetName.nodeValue === "read"
                       || targetName.nodeValue === "liked")) {
      return;
    }
    if (!expanded) {
      // panel is folded, we fetch the cluster
      dispatch(doFetchCluster(clusterId));
      return dispatch(changeReadCount({ feedsId, categoriesId, action: "read" }));
    }
    if (unreadOnClose) {
      // panel is expanded and the filters implies
      // we have to mark cluster as unread
      dispatch(removeClusterSelection());
      dispatch(doEditCluster(clusterId,
                             { read: false, "read_reason": null }));
      return dispatch(changeReadCount(
          { feedsId, categoriesId, action: "unread" }));
    }
    // filters says everybody is displayed
    // so we're not triggering changes in cluster list
    return dispatch(removeClusterSelection());
  },
  toggleRead(e, clusterId, feedsId, categoriesId) {
    e.stopPropagation();
    const payload = { read: true, "read_reason": "marked" };
    let action = "read";
    if (!e.target.checked) {
      action = "unread";
      payload.read = false;
      payload["read_reason"] = null;
    }
    dispatch(doEditCluster(clusterId, payload));
    return dispatch(changeReadCount({ feedsId, categoriesId, action }));
  },
  toggleLiked(e, clusterId) {
    e.stopPropagation();
    return dispatch(doEditCluster(clusterId, { liked: e.target.checked }));
  },
  readOnRedirect(clusterId, feedsId, categoriesId) {
    dispatch(updateClusterAttrs({ clusterId, read: true }));
    return dispatch(changeReadCount({ feedsId, categoriesId, action: "read" }));
  },
});

function Cluster({ id, read, liked, feedsId, categoriesId,
                   mainFeedTitle, mainTitle, mainLink,
                   requestedClusterId, loadedCluster, unreadOnClose,
                   readOnRedirect, toggleRead, toggleLiked,
                   handleClickOnPanel,
}) {
  const loaded = !!loadedCluster && loadedCluster.id === id;
  let content;
  if (id === requestedClusterId) {
    if (!loaded) {
      content = <CircularProgress />;
    } else if (loaded) {
      content = (
        <Typography
          dangerouslySetInnerHTML={{__html: loadedCluster.articles[0].content}} />
      );
    }
  }
  const expanded = requestedClusterId === id;
  return (
      <ExpansionPanel
        expanded={expanded}
        onChange={(e) => handleClickOnPanel(e, id, feedsId, categoriesId,
                                            unreadOnClose, expanded)}
        key={"c"
             + (expanded ? "e" : "")
             + (read ? "r" : "")
             + (liked ? "l" : "")
             + id}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          key={"cs-" + id}
        >
          <Checkbox checked={read} name="read" size="small" color="primary"
            onChange={(e) => toggleRead(e, id, feedsId, categoriesId)} />
          <Checkbox checked={liked} name="liked" size="small" color="primary"
            icon={<LikedIconBorder />} checkedIcon={<LikedIcon />}
            onChange={(e) => toggleLiked(e, id)} />
          <Link href={mainLink} target="_blank" ignoreonpanel="true"
            onClick={() => readOnRedirect(id, feedsId, categoriesId)}>
           {mainFeedTitle}
          </Link>
          <Typography>
           {mainTitle}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails key={"cl-" + id}>
          {content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
}

Cluster.propTypes = {
  id: PropTypes.number.isRequired,
  read: PropTypes.bool.isRequired,
  liked: PropTypes.bool.isRequired,
  feedsId: PropTypes.array.isRequired,
  categoriesId: PropTypes.array,
  mainTitle: PropTypes.string.isRequired,
  mainLink: PropTypes.string.isRequired,
  mainFeedTitle: PropTypes.string.isRequired,
  unreadOnClose: PropTypes.bool.isRequired,
  requestedClusterId: PropTypes.number,
  loadedCluster: PropTypes.object,
  // funcs
  readOnRedirect: PropTypes.func.isRequired,
  toggleRead: PropTypes.func.isRequired,
  toggleLiked: PropTypes.func.isRequired,
  handleClickOnPanel: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cluster);