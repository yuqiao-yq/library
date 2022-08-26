import React from 'react';
import style from './index.less';

export default function index() {
  return (
    <div className={style.container}>
      <h3>边框按钮</h3>
      <button className={style.btn}>边框按钮</button>
    </div>
  );
}
