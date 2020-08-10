import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingPage from '../screens/Landing'
import TeachPage from '../screens/Teach'
import StudyPage from '../routes/tabs'

const Stack = createStackNavigator()

export default () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="LandingPage" component={LandingPage} />
                <Stack.Screen name="TeachPage" component={TeachPage} />
                <Stack.Screen name="StudyPage" component={StudyPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}