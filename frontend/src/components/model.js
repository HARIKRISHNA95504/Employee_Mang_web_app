
import React from 'react';
import '../styles/model.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
