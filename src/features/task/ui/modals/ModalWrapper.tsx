import React from "react";
import ReactModal from "react-modal";
import "../../../../styles/ModalWrapper.scss";

interface ModalWrapperProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="modal"
    overlayClassName="overlay"
    ariaHideApp={false}
  >
    {children}
  </ReactModal>
);

export default ModalWrapper;
