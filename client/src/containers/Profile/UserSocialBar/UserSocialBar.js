import React from "react";
import PropTypes from "prop-types";

import Twitter from "../../../../src/img/social/Twitter.png";
import Facebook from "../../../../src/img/social/Facebook.png";
import Instagram from "../../../../src/img/social/Instagram.png";
import Linkedin from "../../../../src/img/social/Linkedin.png";
import Pinterest from "../../../../src/img/social/Pinterest.png";
import Tiktok from "../../../../src/img/social/Tiktok.png";
import Youtube from "../../../../src/img/social/Youtube.png";

import classes from "./UserSocialBar.module.css";

const UserSocialBar = ({ profile, website }) => {
  
  console.log(website);
    return (
    
  <div className={classes.SocialContainer}>

  {website && (
        <a className={classes.SocialLink} href={`${website}`} target="_blank" rel="noopener noreferrer">
          <i className={[classes.SocialImg, "material-icons"].join(' ')}>link</i>        
        </a>
      )}
      {profile.twitter && (
        <a className={classes.SocialLink} href={profile.twitter} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Twitter} alt="twitter" />
        </a>
      )}

      {profile.facebook && (
        <a className={classes.SocialLink} href={profile.facebook} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Facebook} alt="facebook" />
        </a>
      )}

      {profile.instagram && (
        <a className={classes.SocialLink} href={profile.instagram} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Instagram} alt="instagram" />
        </a>
      )}

      {profile.linkedin && (
        <a className={classes.SocialLink} href={profile.linkedin} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Linkedin} alt="linkedin" />
        </a>
      )}

      {profile.pinterest && (
        <a className={classes.SocialLink} href={profile.pinterest} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Pinterest} alt="pinterest" />
        </a>
      )}
      {profile.tiktok && (
        <a className={classes.SocialLink} href={profile.tiktok} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Tiktok} alt="tiktok" />
        </a>
      )}

      {profile.youtube && (
        <a className={classes.SocialLink} href={profile.youtube} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Youtube} alt="youtube" />
        </a>
      )}
    </div>
  );
};

UserSocialBar.propTypes = {
  profile: PropTypes.object.isRequired,
  website: PropTypes.string.isRequired,
};

export default UserSocialBar;
