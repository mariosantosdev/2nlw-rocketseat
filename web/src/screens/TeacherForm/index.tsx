import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import warnIcon from '../../assets/images/icons/warning.svg'
import api from '../../services/api'

import PageHeader from '../../components/pageHeader'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import Select from '../../components/Select'
import './styles.css'

export default function TeacherForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { "week_day": 0, from: '', to: '' }
    ])

    const history = useHistory()

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { "week_day": 0, from: '', to: '' }
        ])
    }

    function createClass(event: FormEvent) {
        event.preventDefault()

        api.post('/classes', {
            name,
            email,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        })
            .then(_ => {
                alert('Cadastrado com sucesso')
                history.push('/')
            })
            .catch(_ => alert('Ocorreu um erro'))
    }

    function setScheduleItemValue(position: number, param: string, value: string) {
        const newArray = scheduleItems.map((item, index) => {
            if (index === position) return { ...item, [param]: value }

            return item
        })

        setScheduleItems(newArray)
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Parabéns por querer repassar seu conhecimento !"
                description="Primeiro você deve se cadastrar"
            />
            <main>
                <form onSubmit={createClass}>
                    <fieldset>
                        <legend>Dados</legend>
                        <Input name="name"
                            label="Nome completo"
                            onChange={text => setName(text.target.value)}
                            value={name}
                        />
                        <Input name="email"
                            label="Email"
                            onChange={text => setEmail(text.target.value)}
                            value={email}
                        />
                        <Input name="whatsapp"
                            label="Whatsapp"
                            onChange={text => setWhatsapp(text.target.value)}
                            value={whatsapp}
                        />
                        <TextArea name="bio"
                            label="Biografia"
                            onChange={text => setBio(text.target.value)}
                            value={bio}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={select => setSubject(select.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação física', label: 'Educação física' },
                                { value: 'Filosofia', label: 'Filosofia' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Inglês', label: 'Inglês' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Sociologia', label: 'Sociologia' },
                                { value: 'Outras', label: 'Outras' }
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo por hora"
                            value={cost}
                            onChange={text => setCost(text.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Horários <button type="button" onClick={addScheduleItem}>+ Novo Horário</button></legend>
                        {scheduleItems.map((item, index) => {
                            return (
                                <div key={item.week_day} className="scheduleItem">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={item.week_day}
                                        onChange={select => setScheduleItemValue(index, 'week_day', select.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feita' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' },
                                        ]}
                                    />
                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={item.from}
                                        onChange={text => setScheduleItemValue(index, 'from', text.target.value)}
                                    />
                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={item.to}
                                        onChange={text => setScheduleItemValue(index, 'to', text.target.value)}
                                    />
                                </div>
                            )
                        })}

                    </fieldset>
                    <footer>
                        <p>
                            <img src={warnIcon} alt="Aviso Importante" />
                            Atenção! <br />
                            Complete TODOS os campos
                        </p>
                        <button type="submit">Cadastrar</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}