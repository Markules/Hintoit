import React, { Fragment } from "react";
import BackDrop from "../../UI/Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = ({show, modalClosed, children}) => {

  return (
    <Fragment>
      <BackDrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
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
