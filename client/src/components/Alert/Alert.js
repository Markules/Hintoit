import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(
    (alert) => (
      console.log(alert),
      (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
          <p className={'alertMessage'}>{alert.msg}</p>
        </div>
      )
    )
  );

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
