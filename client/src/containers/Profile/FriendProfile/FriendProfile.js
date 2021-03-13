import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from '../../../store/actions/profile'
import Moment from 'react-moment';

import classes from './FriendProfile.module.css';
import FollowButton from "../../../components/Users/UserCard/FollowButton/FollowButton";
import UserSocialBar from "../UserSocialBar/UserSocialBar";
import ProfileNavBar from "../ProfileNavBar/ProfileNavBar";
import ItemsList from "../../../components/Items/ItemsList/ItemsList";

const FriendProfile = ({ match, profile: { profile}, getProfileById } ) => {
  
    console.log(match.params.id)

useEffect(() => {
    getProfileById(match.params.id)
}, [getProfileById])

  console.log(profile && (profile.user._id));
    return <Fragment>
            { profile ? ( 
                
                <div className={classes.ProfileContainer}>
                    <img src={profile.user.avatar} className={classes.UserAvatar} />
                    <h2 className={classes.UserName}>{profile.user.firstName} {profile.user.lastName}</h2>
                    <UserSocialBar social={profile.profile.social}/>
                    {profile.profile.location && (<p className={classes.location}>From {profile.profile.location}</p>)}
                    <p>Joined in <Moment format="MMM YYYY">{profile.user.CreatedAt}</Moment></p>
                    <div className={classes.FollowButtonContainer}>
                    <FollowButton user={profile.user}/>
                    </div>
                    <div className={classes.ProfileNav}><ProfileNavBar userData={profile.user}/></div>
                    <div className={classes.ItemsContainer}>
                    <ItemsList cardType={'friend'} userId={profile.user._id}/>
                    </div>
                </div>
            ) : (<h4>Can't find user..</h4>)}
            
    </Fragment>;
};

FriendProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfileById })(FriendProfile);
