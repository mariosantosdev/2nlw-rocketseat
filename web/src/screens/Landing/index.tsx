import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import teachIcon from '../../assets/images/icons/teach.svg'

import './styles.css'
import api from '../../services/api'

export default function Landing() {
    const [connections, setConnections] = useState(0)

    useEffect(() => {
        api.get('/connections')
            .then(res => setConnections(res.data.total))
    }, [])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="MyProf" />
                    <h2>Plataforma de estudos online</h2>
                </div>
                <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>
                    <Link to="/teach" className="teach">
                        <img src={teachIcon} alt="Ensinar" />
                        Ensinar
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {connections} conexões <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>
            </div>
        </div>
    )
}