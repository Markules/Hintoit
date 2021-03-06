import React, { Fragment } from "react";
import BackDrop from "../../UI/Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {

  return (
    <Fragment>
      <BackDrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
