import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Container,
    Col,
    Row,
    Image,
} from 'react-bootstrap'
import { RiShutDownLine } from 'react-icons/ri'

import { Logout, IsLogin } from '../../services/auth'

import logoImg from '../../assets/images/logo.svg'
import landingImg from '../../assets/images/landing.svg'
import studyIcon from '../../assets/images/icons/study.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'
import teachIcon from '../../assets/images/icons/teach.svg'
import './style.css'


function HomePage(props) {
    const history = useHistory()

    useEffect(() => {
        if (props.user && !props.user.id) window.location.href = '/signin'
    }, [])

    const signout = () => {
        Logout()

        history.go(0)
    }

    const navigateToProfile = () => window.location.href = `/profile/${props.user.id}`

    return (
        <div id="home-container">
            <div className="header">
                <Container>
                    <Row>
                        <Col className="row perfil" >
                            <div className="perfil-content" onClick={navigateToProfile}>
                                <Image src={props.user.avatar} className="avatar" />
                                <p>{`${props.user.name}  ${props.user.lastname}` || 'name'}</p>
                            </div>
                        </Col>
                        <Col className="logout">
                            <button className="button-logout" onClick={signout}>
                                <RiShutDownLine className="icon-logout" />
                            </button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="content landing-content">
                <div className="logo-container">
                    <img src={logoImg} alt="MyProf" />
                    <h2>Plataforma de estudos online</h2>
                </div>
                <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />
            </div>
            <Container fluid className="bottom">
                <div className="container bottom-container">
                    <span className="welcome-text">
                        Olá, {props.user.name} <br></br><b>O que deseja fazer ?</b>
                    </span>
                    <div>
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
                            Total de 200 conexões <img src={purpleHeartIcon} alt="Coração Roxo" />
                        </span>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const mapToProps = ({ user }) => {
    return {
        user: user.user
    }
}

export default connect(mapToProps)(HomePage)