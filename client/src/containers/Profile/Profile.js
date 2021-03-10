import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchLoggedUser,
  getCurrentProfile,
} from "../../store/actions/profile";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import Button from "../../components/UI/Button/Button";
import classes from "./Profile.module.css";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import Modal from "../../components/UI/Modal/Modal";
import AddItem from "../../components/Items/AddItem/AddItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Link } from "react-router-dom";
import UserSocialBar from "./UserSocialBar/UserSocialBar";

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchLoggedUser();
    this.props.getCurrentProfile();
  }

  state = {
    openAddItem: false,
    closeAddItem: false,
    openShareItem: false,
    closeShareItem: false,
    resetAddItem: false,
  };

  openAddItemHandler = () => {
    this.setState({ resetAddItem: false });
    this.setState({ openAddItem: true });
    this.setState({ closeAddItem: false });
  };

  closeAddItemHandler = () => {
    this.setState({ resetAddItem: true });
    this.setState({ closeAddItem: true });
    this.setState({ openAddItem: false });
  };

  render() {
    let user = this.props.user;
    let items = null;
    const cardType = "profile";
    items = (
      <ItemsList cardType={cardType} resetItems={this.state.resetAddItem} />
    );
    if (!this.props.user) {
      return (
        <div style={{ margin: "auto" }}>
          <Spinner />
        </div>
      );
    } else {
      return (
        <div className={classes.ProfileContainer}>
          <Modal
            show={this.state.openAddItem}
            modalClosed={this.state.closeAddItem}
          >
            <AddItem
              closed={this.closeAddItemHandler}
              resetItems={this.state.resetAddItem}
            />
          </Modal>

          <div className={classes.AvatarContainer}>
            <img
              className={classes.Avatar}
              src={user.avatar}
              alt={"Hintoit || Avatar"}
            />
          </div>

          {this.props.profile.profile && this.props.profile.profile.social && (
            <UserSocialBar profile={this.props.profile.profile.social} website={this.props.profile.profile.website}/>
          )}

          <h2 className={classes.UserName}>
            {user.firstName} {user.lastName}
          </h2>
          {this.props.profile.profile && this.props.profile.profile.location && (
            <div className={classes.Location}>
              <p>From {this.props.profile.profile.location}</p>
            </div>
          )}
          {this.props.profile.profile !== null ? (
            <div className={classes.EditProfileButton}>
              <Link to="profile/edit" className={classes.ProfileEditLink}>
                <p>Edit Profile</p>
              </Link>
            </div>
          ) : (
            <div className={classes.CreateProfileBox}>
              Add more information about yourself here so your profile can stand
              out!
              <div className={classes.CreateButton}>
                <Link to="profile/create" className={classes.CreateLink}>
                  Create Profile
                </Link>
              </div>
            </div>
          )}

          <ProfileNavBar userData={user} />
          <div className={classes.Seperator}></div>

          <Button
            clicked={() => this.openAddItemHandler()}
            btnType="ProfileAddItem"
            ButtonContent="AddItemContent"
          >
            <i className={["material-icons", classes.AddGiftIcon].join(" ")}>
              add_circle
            </i>
            ADD ITEM
          </Button>
          {items}
          <div className={classes.Break}></div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.idToken !== null,
    user: state.profile.userData,
    loading: state.auth.loading,
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { fetchLoggedUser, getCurrentProfile })(
  Profile
);
