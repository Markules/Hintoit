import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./containers/Auth/store/actions/auth";

import Login from "./containers/Auth/Login/Login";
import Profile from "./containers/Profile/Profile";
import Logout  from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";


const Discover = React.lazy(() => {
  return import("./containers/Discover/Discover")
})

export class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/discover" render={props => <Discover {...props}/>} />
          <Route exact path="/" component={Profile} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout><Suspense fallback={<Spinner />}>{routes}</Suspense></Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
