import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ItemsList from "../../components/Items/ItemsList/ItemsList";
import Button from "../../components/UI/Button/Button";
import classes from "./Profile.module.css";
import ProfileNavBar from "./ProfileNavBar/ProfileNavBar";
import Modal from "../../components/UI/Modal/Modal";
import AddItem from "../../components/Items/AddItem/AddItem";
import Spinner from "../../components/UI/Spinner/Spinner";

export class Profile extends Component {
  componentDidMount() {
    this.props.fetchUserData();
  }

  state = {
    openAddItem: false,
    closeAddItem: false,
    openShareItem: false,
    closeShareItem: false,
  };

  openAddItemHandler = () => {
    console.log("clicked");
    this.setState({ openAddItem: true });
    this.setState({ closeAddItem: false });
  };

  closeAddItemHandler = () => {
    this.setState({ closeAddItem: true });
    this.setState({ openAddItem: false });
  };


  render() {
    let user = this.props.user;
    let items = null;
    const cardType = "profile";
    items = <ItemsList 
    cardType={cardType}
    />;
    if (!this.props.user) {
      return (
        <div className={{ margin: "auto" }}>
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
            <AddItem closed={this.closeAddItemHandler} />
          </Modal>

    
          <div className={classes.AvatarContainer}>image</div>
          <h2 className={classes.UserName}>
            {user.firstName} {user.lastName}
          </h2>

          <ProfileNavBar userData={user} />
          <div className={classes.Seperator}></div>

          <Button
            clicked={this.openAddItemHandler}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(actions.fetchLoggedUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
