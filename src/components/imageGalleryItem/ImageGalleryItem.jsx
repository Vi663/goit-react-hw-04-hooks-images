import React from 'react';
import s from './ImageGalleryItem.module.css'

export function ImageGalleryItem({ response, onSelect }) {
  return (
    response.map((obj) =>
      < li key={obj.id} className={s.imageGalleryItem} >
        <img onClick={() => onSelect(obj)} src={obj.webformatURL} alt={obj.id} className={s.imageGalleryItemImage} />
      </li>)
  )
}