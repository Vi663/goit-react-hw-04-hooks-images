import React from 'react';
import s from './ImageGallery.module.css'

export function ImageGallery ({children}) {

    return (
      <ul className={s.imageGallery}>
        {children}
      </ul>
    )
}