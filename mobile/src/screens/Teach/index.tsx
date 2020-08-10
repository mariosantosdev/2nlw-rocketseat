import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import teachBackground from '../../assets/images/give-classes-background.png'

import styles from './style'

const TeachPage = () => {
    const { goBack } = useNavigation()
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.background} resizeMode="contain" source={teachBackground}>
                <Text style={styles.title}>Deseja compartilhar seu conhecimento ?</Text>
                <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web.</Text>
            </ImageBackground>

            <RectButton style={styles.button} onPress={goBack}>
                <Text style={styles.buttonText}>Ok</Text>
            </RectButton>
        </View>
    )
}

export default TeachPage