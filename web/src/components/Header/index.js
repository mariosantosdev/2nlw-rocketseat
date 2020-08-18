import React from 'react'

import backIcon from '../../assets/images/icons/back.svg'
import logo from '../../assets/images/logo.svg'

import './style.css'

export default function HeaderComponent(props) {
    return (
        <div id="header-container">
            <div className="header-content">
                <div className="header-left">
                    <img src={backIcon} alt="Back Icon" onClick={props.onEvent} />
                </div>
                <div className="header-center">
                    <p>{props.title}</p>
                </div>
                <div className="header-right">
                    <img src={logo} alt="Prof" />
                </div>
            </div>
        </div>
    )
}