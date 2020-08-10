import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import TeacherListPage from '../screens/TeacherList'
import FavoritePage from '../screens/Favorites'

const Tabs = createBottomTabNavigator()

export default () => (
    <Tabs.Navigator
        tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: 64
            },
            tabStyle: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: 20
            },
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                fontSize: 13,
                marginLeft: 16
            },
            inactiveBackgroundColor: '#fafafc',
            activeBackgroundColor: '#ebebf5',
            inactiveTintColor: '#c1bccc',
            activeTintColor: '#32264d'
        }}
    >
        <Tabs.Screen
            name="TeacherList"
            component={TeacherListPage}
            options={{
                tabBarLabel: 'Professores',
                tabBarIcon: ({color, size, focused}) => (<Ionicons name="ios-easel" color={focused ? '#8257e5': color} size={size} />)
            }}
        />
        <Tabs.Screen
            name="Favorites"
            component={FavoritePage}
            options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({color, size, focused}) => (<Ionicons name="ios-heart" color={focused ? '#8257e5': color} size={size} />)
            }}
        />
    </Tabs.Navigator>
)