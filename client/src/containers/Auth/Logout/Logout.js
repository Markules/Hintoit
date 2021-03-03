import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../../store/actions/auth";
import PropTypes from "prop-types";

const Logout = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return <Redirect to="/" />;
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
