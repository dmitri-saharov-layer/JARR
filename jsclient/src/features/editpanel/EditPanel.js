import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";

function mapStateToProps(state) {
  return { isOpen: state.edit.isOpen,
  };
}

function EditPanel({ isOpen }) {
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={isOpen}
    >
      <div>
        <Typography>
          Adding stuff
        </Typography>
      </div>
    </Drawer>
  );
}

EditPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(EditPanel);
