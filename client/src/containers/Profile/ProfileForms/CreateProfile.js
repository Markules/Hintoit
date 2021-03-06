import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { createProfile } from "../../../store/actions/profile";
import PropTypes from "prop-types";
import Button from '../../../components/UI/Button/Button';

import classes from './CreateProfile.module.css';

const CreateProfile = ({ createProfile, history }) => {
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

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
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
          <div className={classes.TextContainer}>
            <small className={classes.FormText}>
              Could be your own or a company website
            </small>
          </div>
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
          <div className={classes.TextContainer}>
            {" "}
            <small className={classes.FormText}>
              City and state suggested (eg. Boston, MA)
            </small>
          </div>
        </div>
        <div className="form-group">
          <textarea
            className={classes.TextArea}
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <div className={classes.TextContainer}>
            <div className={classes.TextContainer}>
              <small className={classes.FormText}>
                Tell us a little about yourself
              </small>
            </div>
          </div>
        </div>

        <div className="my-2">
          <div
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            className={classes.AddSocialButton}
          >
            <p className={classes.AddText}>Add Social Network Links</p>
          </div>
          <div className={classes.TextContainer}>
            <small className={classes.FormText}>Optional</small>
          </div>
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
        <div className={classes.ButtonContainer}>
          <Button
            type="submit"
            className={classes.Button}
            btnType={"EditSubmit"}
          >
            SAVE
          </Button>
        </div>
        <div className={classes.LinkContainer}>
          <Link to={"/"} className={classes.Link}>
            Go Back
          </Link>
        </div>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
