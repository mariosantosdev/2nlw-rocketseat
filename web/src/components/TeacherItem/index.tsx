import React from 'react'

import wppIcons from '../../assets/images/icons/whatsapp.svg'
import './styles.css'
import api from '../../services/api'

export interface ITeacher {
    id: number;
    subject: string;
    cost: number;
    name: string;
    email: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

interface ITeacherItemProps {
    teacher: ITeacher;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher }) => {
    function addNewConnection(){
        api.post('/connections', {
            user_id: teacher.id
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <footer>
                <p>Preço/hr <strong>R${teacher.cost}</strong></p>
                <a onClick={addNewConnection} target="_blank" href={`https://wa.me/${teacher.whatsapp}`} type="button">
                    <img src={wppIcons} alt="Whatsapp" />
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem