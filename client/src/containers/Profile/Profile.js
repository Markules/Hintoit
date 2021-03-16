import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchLoggedUser,
  getCurrentProfile,
} from "../../store/actions/profile";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import Button from "../../components/UI/Button/Button";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import Modal from "../../components/UI/Modal/Modal";
import AddItem from "../../components/Items/AddItem/AddItem";
import Spinner from "../../components/UI/Spinner/Spinner";
import UserSocialBar from "./UserSocialBar/UserSocialBar";

import classes from "./Profile.module.css";

const Profile = ({
  fetchLoggedUser,
  getCurrentProfile,
  user,
  loading,
  profile: { profile },
}) => {
  useEffect(() => {
    fetchLoggedUser();
    getCurrentProfile();
  }, [fetchLoggedUser, getCurrentProfile]);

  const [openAddItem, updateOpenAddItem] = useState(false);
  const [closeAddItem, updateCloseAddItem] = useState(false);
  const [resetAddItem, updateResetAddItem] = useState(false);

  const openAddItemHandler = () => {
    updateResetAddItem(false);
    updateOpenAddItem(true);
    updateCloseAddItem(false);
  };

  const closeAddItemHandler = () => {
    updateResetAddItem(true);
    updateOpenAddItem(false);
    updateCloseAddItem(true);
  };

  const cardType = "profile";

  return (
    <Fragment>
      {!user || loading ? (
        <div style={{ margin: "auto" }}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.ProfileContainer}>
          <Modal show={openAddItem} modalClosed={closeAddItem}>
            <AddItem closed={closeAddItemHandler} resetItems={resetAddItem} />
          </Modal>

          <div className={classes.AvatarContainer}>
            <img
              className={classes.Avatar}
              src={user.avatar}
              alt={"Hintoit || Avatar"}
            />
          </div>

          {profile && profile.social && (
            <UserSocialBar
              social={profile.social}
              website={profile.website}
            />
          )}

          <h2 className={classes.UserName}>
            {user.firstName} {user.lastName}
          </h2>
          {profile && profile.location && (
            <div className={classes.Location}>
              <p>From {profile.location}</p>
            </div>
          )}
          {profile !== null ? (
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
            clicked={() => openAddItemHandler()}
            btnType="ProfileAddItem"
            ButtonContent="AddItemContent"
          >
            <i className={["material-icons", classes.AddGiftIcon].join(" ")}>
              add_circle
            </i>
            ADD ITEM
          </Button>
          <ItemsList cardType={cardType} resetItems={resetAddItem} />
          <div className={classes.Break}></div>
        </div>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  fetchLoggedUser: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.profile.userData,
  loading: state.auth.loading,
  profile: state.profile,
});

export default connect(mapStateToProps, { fetchLoggedUser, getCurrentProfile })(
  Profile
);
