import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png'
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsappIcon from '../../assets/images/icons/whatsapp.png'

import styles from './style'
import api from '../../services/api'

export interface ITeacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface ITeacherProps {
    teacher: ITeacher,
    favorited: boolean
}

const TeacherItem: React.FC<ITeacherProps> = ({ teacher, favorited }) => {
    const [isFavorite, setIsFavorite] = useState(favorited)

    const openWhatsapp = () => {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
        api.post('/connections', {
            user_id: teacher.id
        })
    }

    const toggleFavorite = async () => {
        const favorites = await AsyncStorage.getItem('favorites')
        let arrayFavorites = []
        if (favorites) arrayFavorites = JSON.parse(favorites)

        if (isFavorite) {
            const favoriteIndex = arrayFavorites.findIndex((teacherItem: ITeacher) => {
                return teacherItem.id === teacher.id
            })

            arrayFavorites.slice(favoriteIndex, 1)
            setIsFavorite(false)
        } else {
            arrayFavorites.push(teacher)
            setIsFavorite(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(arrayFavorites))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{teacher.bio}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hr {' '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>
                <View style={styles.buttonContainer}>
                    <RectButton
                        onPress={toggleFavorite}
                        style={[
                            styles.favoriteButton,
                            isFavorite && styles.favorited
                        ]}
                    >
                        {isFavorite
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }

                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={openWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem