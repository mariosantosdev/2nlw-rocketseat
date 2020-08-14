import React from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Container,
    Col,
    Row,
    Image,
} from 'react-bootstrap'

import { Logout } from '../../services/auth'

function HomePage(props) {
    const history = useHistory()

    const signout = () => {
        Logout()

        history.go(0)
    }

    return (
        <div>
            <Container>
                <button onClick={signout}>Sair</button>
                <Row>
                    <Row xl={7}>
                        <Image src="" roundedCircle />
                    </Row>
                    <Col xl={4}>
                        <a href="">{props.user.name || 'name'}</a>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const mapToProps = ({ user }) => {
    console.log(user.user)
    return {
        user: user.user
    }
}

export default connect(mapToProps)(HomePage)