import React, { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  state = {};

  render() {
    return (
      <div className={s.Overlay}>
        <div className={s.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
