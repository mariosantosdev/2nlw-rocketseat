import React from 'react'

import wppIcons from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="Nome do Professor" />
                <div>
                    <strong>Nome do Professor</strong>
                    <span>Português</span>
                </div>
            </header>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    <br /><br />
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
            <footer>
                <p>Preço/hr <strong>R$35,00</strong></p>
                <button type="button">
                    <img src={wppIcons} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    )
}

export default TeacherItem