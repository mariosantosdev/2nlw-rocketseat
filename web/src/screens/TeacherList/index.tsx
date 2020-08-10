import React, { useState, FormEvent } from 'react'

import PageHeader from '../../components/pageHeader'
import TeacherItem, { ITeacher } from '../../components/TeacherItem'
import Input from '../../components/Input'
import Select from '../../components/Select'
import './styles.css'
import api from '../../services/api'

export default function TeacherList() {
    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    function searchTeachers(event: FormEvent) {
        event.preventDefault()

        api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
            .then(res => {
                setTeachers(res.data)
            })
    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esse sao os Professores disponíveis">
                <form id="search-teachers" onSubmit={searchTeachers}>
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
                            { value: 'Outras', label: 'Outra' }
                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={select => setWeekDay(select.target.value)}
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
                        name="time"
                        label="Hora"
                        type="time"
                        value={time}
                        onChange={select => setTime(select.target.value)}
                    />
                    <button type="submit">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacherClass: ITeacher) => (<TeacherItem key={teacherClass.id} teacher={teacherClass} />))}
            </main>
        </div>
    )
}