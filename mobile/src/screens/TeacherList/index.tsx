import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, Alert } from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { ITeacher } from '../../components/TeacherItemx'

import styles from './styles'
import api from '../../services/api'

const TeacherListPage = () => {
    const [teachers, setTeachers] = useState([])
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')

    const [isVisibleFilters, setVisibleFilters] = useState(false)
    const [favorites, setFavorites] = useState<number[]>([])
    let iconFilter
    isVisibleFilters ? iconFilter = 'ios-arrow-up' : iconFilter = 'ios-arrow-down'

    const loadFavorites = () => {
        AsyncStorage.getItem('favorites')
            .then(res => {
                console.log(res)
                if (res) {
                    const teachersIds = JSON.parse(res).map((teacher: ITeacher) => {
                        return teacher.id
                    })
                    setFavorites(teachersIds)
                }
            })
    }

    const toggleVisibleFilters = () => {
        setVisibleFilters(!isVisibleFilters)
    }

    const filtersSubmit = () => {
        loadFavorites
        api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        })
            .then(res => {
                setTeachers(res.data)
                setVisibleFilters(false)
            })
            .catch(_ => Alert.alert('Ops...', 'Ocorreu um erro em procurar os professores :('))
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Professores disponíveis"
                headerRight={(
                    <BorderlessButton onPress={toggleVisibleFilters}>
                        <Ionicons name={iconFilter} size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >
                {isVisibleFilters && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            placeholder="Digite uma Matéria"
                            placeholderTextColor="#c1bccc"
                            onChangeText={text => setSubject(text)}
                        />
                        <View style={styles.inpuGroup}>
                            <View style={styles.inpuBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    placeholder="Digite um dia"
                                    placeholderTextColor="#c1bccc"
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>
                            <View style={styles.inpuBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    placeholder="Digite um horário"
                                    placeholderTextColor="#c1bccc"
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>
                        <RectButton style={styles.submitButton} onPress={filtersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: ITeacher) => (
                    <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher.id)} />
                ))}
            </ScrollView>
        </View>
    )
}

export default TeacherListPage