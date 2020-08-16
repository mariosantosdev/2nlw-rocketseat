import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Container,
    Col,
    Row,
    Image,
} from 'react-bootstrap'
import { RiShutDownLine } from 'react-icons/ri'

import { Logout } from '../../services/auth'

import './style.css'

function HomePage(props) {
    const history = useHistory()

    useEffect(() => {
        if (props.user && !props.user.id) history.goBack()
    }, [])

    const signout = () => {
        Logout()

        history.go(0)
    }

    const navigateToProfile = () => {
        // history.go(0)
    }

    return (
        <div id="home-container">
            <Container fluid className="header">
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
            </Container>
            <Container fluid className="hero">
                
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