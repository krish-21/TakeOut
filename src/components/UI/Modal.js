// ReactDOM & Packages
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

// CSS Modules
import styles from "./Modal.module.css";

// Backdrop to disable the page in the background
const Backdrop = (props) => (
  <div className={styles.backdrop} onClick={props.onClose}></div>
);

Backdrop.propTypes = {
  onClose: PropTypes.func,
};

// Modal Overlay which contais the Modal
const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node,
};

// Modal which should be dismissed to resume functioning of website
const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

export default Modal;
