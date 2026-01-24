import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
    return (<>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Home"}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
            </Stack.Navigator>
        </NavigationContainer>
    </>
    )
}

export default MainNavigation

const styles = StyleSheet.create({})