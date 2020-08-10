import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'
import TeacherItem, { ITeacher } from '../../components/TeacherItemx'

const FavoritePage = () => {
    const [favorites, setFavorites] = useState<number[]>([])
    
    function loadFavorite() {
        AsyncStorage.getItem('favorites')
            .then(res => {
                if (res) {
                    const teachers = JSON.parse(res)
                    console.log(teachers)
                    // setFavorites(teachers)
                }
            })
    }

    useFocusEffect(() => {
        loadFavorite()
    })

    return(
        <View style={styles.container}>
            <PageHeader title="Professores favoritos" />
            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: ITeacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited={true} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default FavoritePage