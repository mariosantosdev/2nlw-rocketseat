import React from 'react'
import { AiFillWarning as Icon } from 'react-icons/ai'

import backIcon from '../../assets/images/icons/back.svg'
import './style.css'

export default function NotFound() {
    return (
        <div id="page-error-container">
            <div className="error-header" onClick={() => window.history.back()}>
                <img src={backIcon} alt="Back Icon" />
            </div>
            <div className="error-container">
                <div className="left-content-error">
                    <Icon size={50} />
                    <p className="status-code">404</p>
                </div>
                <div className="right-content-error">
                    <p className="title-error"> Ops...</p>
                    <p className="message-error">Parece que você não vai aprender nada por aqui !</p>
                </div>
            </div>
        </div>
    )
}