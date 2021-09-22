import React from 'react';
import s from './Modal.module.css'

export function Modal({ imageURL, onClose }) {
  return (
    <div className={s.overlay} onClick={() => onClose()}>
      <div className={s.modal}>
        <img src={imageURL.largeImageURL} alt={imageURL.id} width='700' />
      </div>
    </div>
  )
}