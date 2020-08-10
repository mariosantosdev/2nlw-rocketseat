import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import landingImage from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import teachIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'

import styles from './style'

const LandingPage = () => {
    const { navigate } = useNavigation()

    const navigateToTeachScreen = () => {
        navigate('TeachPage')
    }

    const navigateToStudyScreen = () => {
        navigate('StudyPage')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImage} />
            <Text style={styles.title}>
                Seja bem vindo {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer ?</Text>
            </Text>
            <View style={styles.buttonContainer}>
                <RectButton
                    onPress={navigateToStudyScreen}
                    style={[styles.button, styles.buttonPrimary]}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton
                    onPress={navigateToTeachScreen}
                    style={[styles.button, styles.buttonSecondary]}
                >
                    <Image source={teachIcon} />
                    <Text style={styles.buttonText}>Dar Aula</Text>
                </RectButton>
            </View>
            <Text style={styles.textConnections}>
                Total de 5 conexões {' '} <Image source={heartIcon} />
            </Text>
        </View>
    )
}

export default LandingPage