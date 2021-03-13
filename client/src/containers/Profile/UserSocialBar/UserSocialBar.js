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

const UserSocialBar = ({ social, website }) => {
  
  console.log(website);
    return (
    
  <div className={classes.SocialContainer}>

  {website && (
        <a className={classes.SocialLink} href={`${website}`} target="_blank" rel="noopener noreferrer">
          <i className={[classes.SocialImg, "material-icons"].join(' ')}>link</i>        
        </a>
      )}
      {social.twitter && (
        <a className={classes.SocialLink} href={social.twitter} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Twitter} alt="twitter" />
        </a>
      )}

      {social.facebook && (
        <a className={classes.SocialLink} href={social.facebook} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Facebook} alt="facebook" />
        </a>
      )}

      {social.instagram && (
        <a className={classes.SocialLink} href={social.instagram} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Instagram} alt="instagram" />
        </a>
      )}

      {social.linkedin && (
        <a className={classes.SocialLink} href={social.linkedin} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Linkedin} alt="linkedin" />
        </a>
      )}

      {social.pinterest && (
        <a className={classes.SocialLink} href={social.pinterest} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Pinterest} alt="pinterest" />
        </a>
      )}
      {social.tiktok && (
        <a className={classes.SocialLink} href={social.tiktok} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Tiktok} alt="tiktok" />
        </a>
      )}

      {social.youtube && (
        <a className={classes.SocialLink} href={social.youtube} target="_blank" rel="noopener noreferrer">
          <img className={classes.SocialImg} src={Youtube} alt="youtube" />
        </a>
      )}
    </div>
  );
};

UserSocialBar.propTypes = {
  social: PropTypes.object.isRequired,
  website: PropTypes.string.isRequired,
};

export default UserSocialBar;
