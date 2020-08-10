import React from 'react'
import { View, Text } from 'react-native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'

const TeacherListPage = () => {
    return(
        <View style={styles.container}>
            <PageHeader title="Professores disponíveis" />
        </View>
    )
}

export default TeacherListPage