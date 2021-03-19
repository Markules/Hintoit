import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  createProfile,
  getCurrentProfile,
  deleteAccount
} from "../../../store/actions/profile";
import Button from '../../../components/UI/Button/Button';
import PropTypes from "prop-types";

import classes from "./EditProfile.module.css";
import Modal from "../../../components/UI/Modal/Modal";

const EditProfile = ({
  createProfile,
  history,
  getCurrentProfile,
  deleteAccount,
  profile: { profile, loading },
}) => {

  console.log(profile)
  const [formData, setFormData] = useState({
    website: "",
    location: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
    tiktok: "",
    pinterest: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [openVerifyDelete, UpdateOpenVerifyDelete] = useState(false);
  const [closeVerifyDelete, UpdateCloseVerifyDelete] = useState(true);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
      tiktok: loading || !profile.social ? "" : profile.social.tiktok,
      pinterest: loading || !profile.social ? "" : profile.social.pinterest,
    });
  }, [getCurrentProfile, loading]);


  const {
    website,
    location,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    tiktok,
    pinterest,
  } = formData;

  const openDeleteAccountVerify = () => {
    UpdateOpenVerifyDelete(true);
    UpdateCloseVerifyDelete(false);
  }

  const closeDeleteAccountVerify = () => {
    UpdateOpenVerifyDelete(false);
    UpdateCloseVerifyDelete(true);
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className={classes.Header}>
      <Modal style={{ textAlign: "center" }} show={openVerifyDelete} modalClosed={closeDeleteAccountVerify}>
        <h2>Are You Sure You Want To Delete Account?</h2>
        <p>Please Note that this action can't be undone and all of your info and activity will be deleted permenatly!</p>
        <br></br>
        <Button btnType={"DeleteAccount"} clicked={() => deleteAccount()}>DELETE</Button>
        <Button btnType={"Success"} clicked={() => closeDeleteAccountVerify()}>Go Back</Button>
        </Modal>
      <h1 className={classes.Title}>Edit Profile</h1>
      <p className={classes.Lead}>
        Let's get some information to make your profile stand out
      </p>
      </div>
      <form className={classes.Form} onSubmit={(e) => onSubmit(e)}>
        <div className={classes.FormContainer}>
          <input
            className={classes.Input}
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => onChange(e)}
          />
         <div className={classes.TextContainer}><small className={classes.FormText}>
            Could be your own or a company website
          </small></div>
        </div>
        <div className="form-group">
          <input
            className={classes.Input}
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
         <div className={classes.TextContainer}> <small className={classes.FormText}>
            City and state suggested (eg. Boston, MA)
          </small></div>
        </div>
        <div className="form-group">
          <textarea
            className={classes.TextArea}
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
         <div className={classes.TextContainer}><div className={classes.TextContainer}><small className={classes.FormText}>Tell us a little about yourself</small></div></div> 
        </div>

        <div className="my-2">
          <div
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className={classes.AddSocialButton}
          >
            <p className={classes.AddText}>Add Social Network Links</p>
          </div>
          <div className={classes.TextContainer}><small className={classes.FormText}>Optional</small></div>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Tiktok URL"
                name="tiktok"
                value={tiktok}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                className={classes.Input}
                type="text"
                placeholder="Pinterest URL"
                name="pinterest"
                value={pinterest}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}
        

       <div className={classes.ButtonContainer}><Button type="submit" className={classes.Button} btnType={"EditSubmit"}>SAVE</Button></div>
        <div className={classes.LinkContainer}><Link to={"/"} className={classes.Link}>
          Go Back
        </Link>
        </div>
      </form>
      <div className={classes.BtnDeleteAccount}><Button clicked={() => openDeleteAccountVerify()} btnType={"DeleteAccount"}>DELETE ACCOUNT</Button></div>
      
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile, deleteAccount })(
  withRouter(EditProfile)
);
