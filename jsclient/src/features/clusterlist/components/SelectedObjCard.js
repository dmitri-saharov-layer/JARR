import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// material ui  components
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import SettingsIcon from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';
// jarr
import { doFetchObjForEdit } from "../../editpanel/editSlice";
import { doDeleteObj } from "../../feedlist/feedSlice";
import { doListClusters } from "../clusterSlice";
import FeedIcon from "../../../components/FeedIcon";

const mapDispatchToProps = (dispatch) => ({
  openEditPanel(id, objType) {
    return dispatch(doFetchObjForEdit(objType, id));
  },
  deleteObj(id, type) {
    dispatch(doDeleteObj(id, type));
    return dispatch(doListClusters({ categoryId: "all" }));
  },
});

function SelectedObjCard({ id, str, type, iconUrl, errorCount, lastRetrieved,
                           openEditPanel, deleteObj }) {
  const objType = type === "feed" ? "feed" : "category";
  return (
    <Card variant="outlined">
      <CardContent>
        {type === "feed" ? <FeedIcon iconUrl={iconUrl} /> : null}
        {str}
      </CardContent>
      <CardActions>
        <IconButton size="small"
          onClick={() => openEditPanel(id, objType)}
      >
         <SettingsIcon size="small" />
        </IconButton>
        <IconButton size="small"
          onClick={() => deleteObj(id, objType)}
      >
         <DeleteIcon size="small" />
        </IconButton>
      </CardActions>
    </Card>
   );
}

SelectedObjCard.propTypes = {
  id: PropTypes.number.isRequired,
  str: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  iconUrl: PropTypes.string,
  errorCount: PropTypes.number,
  lastRetrieved: PropTypes.string,
  openEditPanel: PropTypes.func.isRequired,
  deleteObj: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SelectedObjCard);