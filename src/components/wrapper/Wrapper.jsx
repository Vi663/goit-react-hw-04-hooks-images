import React from 'react';
import s from './Wrapper.module.css'

export function Wrapper ({children}) {

    return (
      <div className={s.wrapper}>
        {children}
      </div>
    )
}