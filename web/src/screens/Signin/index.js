import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
    Container,
    Row,
    Form,
    Col,
    Button
} from 'react-bootstrap'
import Input from '../../components/Input'
import api from '../../services/api'
import { Login } from '../../services/auth'

import logo from '../../assets/images/logo.svg'
import heart from '../../assets/images/icons/purple-heart.svg'

import './styles.css'

export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [canLogin, setCanLogin] = useState(false)
    const [remember, setRemeber] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (email.trim() !== '' && password.trim() !== '') {
            setCanLogin(true)
        } else {
            if (canLogin === true) setCanLogin(false)
        }
    }, [email, password, canLogin])

    const loginUser = (event) => {
        event.preventDefault()

        api.post('/signin', {
            email,
            password
        })
            .then(res => {
                const { token } = res.data

                remember === true ? Login(token, 'local') : Login(token, 'session')
                history.go(0)
            })
            .catch(err => {
                if (err?.response?.data?.message) return alert(err.response.data.message.toString())
                alert('Desculpe, ocorreu algum erro :(')
            })
    }

    return (
        <Container fluid id="signin-container">
            <Row className="flex-row">
                <Col xs={6} className="d-flex justify-content-center banner-container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={logo} alt="Logo da plataforma" />
                        <p className="mt-3">Sua plataforma de aprendizado online.</p>
                    </div>
                </Col>
                <Col xs={6} className="d-flex flex-column form-container">
                    <div className="mb-auto mt-auto">
                        <Form onSubmit={loginUser}>
                            <Form.Group>
                                <h2>Fazer login</h2>
                            </Form.Group>
                            <Input
                                label="E-mail"
                                size="lg"
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(text) => setEmail(text.target.value)}
                            />
                            <Input
                                label="Senha"
                                size="lg"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(text) => setPassword(text.target.value)}
                            />
                            <Form.Group>
                                <Row>
                                    <Col xs={6}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Lembrar-me"
                                            onChange={(value) => setRemeber(value.target.checked)}
                                        />
                                    </Col>
                                    <Col xs={6}>
                                        <Link to="/forgout">Esqueci minha senha</Link>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Button className="submit" variant="success" type="submit" disabled={!canLogin}>Entrar</Button>
                        </Form>
                    </div>
                    <div className="mt-auto bottom-form">
                        <div className="left-bottom-form">
                            <p>Não tem conta? <br /> <Link to="/signup">Cadastre-se</Link></p>
                        </div>
                        <div className="right-bottom-form">
                            <p>É de graça <img src={heart} alt="Coração" /></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}