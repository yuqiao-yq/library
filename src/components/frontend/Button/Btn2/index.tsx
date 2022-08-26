// @ts-nocheck
import React from 'react';
import './iconfont.js';
import './index.less';

export default function index() {
  return (
    <div className="container">
      <h3>btn2</h3>
      <div className="Btn2">
        <div className="items">
          <a>
            <div className="content">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconvue"></use>
                </svg>
              </i>
            </div>
            <p>Vue</p>
          </a>
        </div>
        <div className="items">
          <a>
            <div className="content">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconmusic"></use>
                </svg>
              </i>
            </div>
            <p>Music</p>
          </a>
        </div>
        <div className="items">
          <a>
            <div className="content">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconvideo"></use>
                </svg>
              </i>
            </div>
            <p>Video</p>
          </a>
        </div>
        <div className="items">
          <a>
            <div className="content">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
              <i>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconpic"></use>
                </svg>
              </i>
            </div>
            <p>Video</p>
          </a>
        </div>
      </div>
    </div>
  );
}
