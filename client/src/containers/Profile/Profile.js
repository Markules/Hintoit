import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCurrentUser } from "../Auth/store/actions/auth";
import { fetchLoggedUserGifts } from "../Profile/store/actions/profile";
import ItemsList from "../ItemsList/ItemsList";
import Button from "../../components/UI/Button/Button";
import classes from "./Profile.module.css";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import Modal from '../../components/UI/Modal/Modal';
import AddItem from '../../components/AddItem/AddItem';

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
    this.props.fetchLoggedUserGifts();
  }
  
  state = {
    openAddItem: false,
    closeAddItem: false,
  }

  openAddItemHandler = () => {
    console.log('clicked');
    this.setState({openAddItem: true});
  }

  closeAddItemHandler = () => {
    this.setState({closeAddItem: true});
    this.setState({openAddItem: false});
  }

  render() {
    let user = this.props.user;
    let gifts = null;
    const cardType = "profile";
    gifts = (
      <ItemsList
        gifts={this.props.userGifts}
        loading={this.props.loading}
        cardType={cardType}
      />
    );
    return (
      <div className={classes.ProfileContainer}>
        <Modal 
        show={this.state.openAddItem}
        modalClosed={this.state.closeAddItem}>
          <AddItem closed={this.closeAddItemHandler}/>
        </Modal>
        <div className={classes.AvatarContainer}>image</div>
        <h2 className={classes.UserName}>
          {user.firstName} {user.lastName}
        </h2>

        <ProfileNavBar userData={user} />
        <div className={classes.Seperator}></div>
      
          <Button clicked={this.openAddItemHandler} btnType="ProfileAddItem" ButtonContent="AddItemContent">
            <i className={["material-icons", classes.AddGiftIcon].join(" ")}>
              add_circle
            </i>
            ADD ITEM
          </Button>
        <div className={classes.ListContainer}>{gifts}</div>
        <div className={classes.Break}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    user: state.auth.userData,
    userGifts: state.profile.gifts,
    loading: state.profile.loading,
  };
};

export default connect(mapStateToProps, {
  fetchCurrentUser,
  fetchLoggedUserGifts,
})(Profile);
