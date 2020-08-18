import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { IsLogin } from '../../services/auth'
import api from '../../services/api'

import Header from '../../components/Header'
import Input from '../../components/Input'

import './style.css'

function Profile(props) {
    const [user, setUser] = useState(props?.user)
    const [token, setToken] = useState(IsLogin())
    const [title, setTitle] = useState('Meu Perfil')

    const navigateToHome = () => window.location.href = '/'

    useEffect(() => {
        if (props?.match?.params?.id != props?.user?.id) {
            api.post(`/users/${props.match.params.id}`, null, {
                headers: { Authorization: token.token }
            })
                .then(res => {
                    setUser(res.data.user)
                    setTitle(`${res.data.user.name} ${res.data.user.lastname}`)
                })
                .catch(err => {
                    if (err?.response?.data?.message) {
                        alert(err.response.data.message.toString())
                        return navigateToHome
                    }
                    alert('Desculpe, ocorreu algum erro :/')
                })
        }
    }, [])

    return (
        <div id="profile-container">
            <Header title={title} onEvent={navigateToHome} />
            <div className="banner-content">
                <img src={user.avatar} alt={user.name} />
                <p className="text-name">{user.name + ' ' + user.lastname}</p>
            </div>
        </div>
    )
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}

export default connect(mapStateToProps)(Profile)