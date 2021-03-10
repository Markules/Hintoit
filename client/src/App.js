import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import * as actions from "./store/actions/auth";

import Login from "./containers/Auth/Login/Login";
import Profile from "./containers/Profile/Profile";
import Logout from "./containers/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";
import NotFound from "./hoc/Layout/NotFound/NotFound";

const Discover = React.lazy(() => {
  return import("./containers/Discover/Discover");
});

const ShareForm = React.lazy(() => {
  return import(
    "./components/Items/ItemsList/ItemCard/BottomBar/BarItems/Share/ShareForm/ShareForm"
  );
});

const FriendProfile = React.lazy(() => {
  return import("./containers/Profile/FriendProfile/FriendProfile");
});

const FollowersList = React.lazy(() => {
  return import("./containers/Profile/FollowLists/FollowersList/FollowersList");
});

const FollowingList = React.lazy(() => {
  return import("./containers/Profile/FollowLists/FollowingList/FollowingList");
});

const EditProfile = React.lazy(() => {
  return import("./containers/Profile/ProfileForms/EditProfile");
});

const CreateProfile = React.lazy(() => {
  return import("./containers/Profile/ProfileForms/CreateProfile");
});

const Item = React.lazy(() => {
  return import("./components/Items/Item/Item");
});

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
          <Route path="/share" render={(props) => <ShareForm {...props} />} />
          <Route path="/discover" render={(props) => <Discover {...props} />} />
          <Route path="/profile/edit" render={(props) => <EditProfile {...props} />}/>
          <Route path="/profile/create" component={CreateProfile} />
          <Route path="/following" render={(props) => <FollowingList {...props} />} />
          <Route path="/followers" render={(props) => <FollowersList {...props} />} />
          <Route path="/user/:id" render={(props) => <FriendProfile {...props} />} />

          <Route path="/item/:id" render={(props) => <Item {...props} />} />
          <Route exact path="/" component={Profile} />
          
          <Redirect to="/" />
          <Route component={NotFound} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>{routes}</Suspense>
        </Layout>
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
