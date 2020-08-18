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

import logo from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import './styles.css'

export default function Signin() {
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [canRegister, setcanRegister] = useState(false)

    const history = useHistory()

    useEffect(() => {
        if (email.trim() !== '' && password.trim() !== '' && name.trim() !== '' && lastname.trim() !== '') {
            setcanRegister(true)
        } else {
            if (canRegister === true) setcanRegister(false)
        }
    }, [email, password, name, lastname, canRegister])

    const createUser = async (event) => {
        event.preventDefault()

        if(name.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '') return alert('Por favor, complete todos os campos!')
        await api.post('/signup', {
            name,
            lastname,
            email,
            password
        })
            .then(res => {
                res?.data?.message ? alert(res.data.message) : alert('Cadastrado com sucesso.')
                history.push('/')
            })
            .catch(err => {
                if(err?.response?.data?.message) return alert(err.response.data.message.toString())
                alert('Desculpe, ocorreu algum erro :(')
            })
    }

    return (
        <Container fluid id="signin-container">
            <Row className="flex-row">
                <Col xs={6} className="d-flex flex-column form-container">
                    <div className="top-form">
                        <Link to="/"><img src={backIcon} alt="Arrow to Back"/></Link>
                    </div>
                    <div className="mb-auto mt-auto">
                        <Form onSubmit={createUser}>
                            <Form.Group>
                                <h2>Cadastro</h2>
                            </Form.Group>
                            <Input
                                label="Nome"
                                size="lg"
                                type="text"
                                placeholder="Digite seu nome"
                                value={name}
                                onChange={(text) => setName(text.target.value)}
                                column
                            />
                            <Input
                                label="Sobrenome"
                                size="lg"
                                type="text"
                                placeholder="Digite seu sobrenome"
                                value={lastname}
                                onChange={(text) => setLastname(text.target.value)}
                                column
                            />
                            <Input
                                label="E-mail"
                                size="lg"
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(text) => setEmail(text.target.value)}
                                column
                            />
                            <Input
                                label="Senha"
                                size="lg"
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(text) => setPassword(text.target.value)}
                                column
                            />
                            <Button type="submit" className="submit" variant="success" disabled={!canRegister}>Concluir Cadastro</Button>
                        </Form>
                    </div>
                </Col>
                <Col xs={6} className="d-flex justify-content-center banner-container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <img src={logo} alt="Logo da plataforma" />
                        <p className="mt-3">Sua plataforma de aprendizado online.</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}