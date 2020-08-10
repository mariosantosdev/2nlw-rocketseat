import React from 'react'
import { View, Text, Image } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'

import backIcon from '../../assets/images/icons/back.png'
import logoImg from '../../assets/images/logo.png'

import styles from './styles'
import { useNavigation } from '@react-navigation/native'

interface IPageHeaderProps{
    title: string;
}

const PageHeader: React.FC<IPageHeaderProps> = (props) => {
    const {navigate} = useNavigation()

    const navigateToLandingScreen = () => {
        navigate('LandingPage')
    }

    return(
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton onPress={navigateToLandingScreen}>
                    <Image source={backIcon} resizeMode="contain" />
                </BorderlessButton>
                <Image source={logoImg} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

export default PageHeader