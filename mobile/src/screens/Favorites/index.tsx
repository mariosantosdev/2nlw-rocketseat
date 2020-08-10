import React from 'react'
import { View, Text } from 'react-native'

import PageHeader from '../../components/PageHeader'

import styles from './styles'

const FavoritePage = () => {
    return(
        <View style={styles.container}>
            <PageHeader title="Professores favoritos" />
        </View>
    )
}

export default FavoritePage