import React from 'react';
import s from './Button.module.css'

export function Button ({onHandleSubmit}) {
    return (
      <button onClick={() => onHandleSubmit()} type="button" className={s.button}>
        Load more images
      </button>
    )
}