import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home';
import Medication from '../screens/Medication';
import Reports from '../screens/Reports';
import Setting from '../screens/Setting';
import Icons from '../components/Icons';

const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const isDark = useColorScheme() === 'dark';
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? '#111' : '#eee',
                    borderTopColor: isDark ? '#222' : '#ccc',
                },
                tabBarActiveTintColor: isDark ? '#fff' : '#000',
                tabBarInactiveTintColor: isDark ? '#aaa' : '#555',
                headerStyle: {
                    backgroundColor: isDark ? '#111' : '#eee',
                },
                headerTintColor: isDark ? '#fff' : '#000',
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ focused }) => (
                    <Icons icon="home" />
                )
            }} />
            <Tab.Screen name="medication" component={Medication} options={{
                tabBarIcon: ({ focused }) => (
                    <Icons icon="medication" />
                )
            }} />
            <Tab.Screen name="reports" component={Reports} options={{
                tabBarIcon: ({ focused }) => (
                    <Icons icon="reports" />
                )
            }} />
            <Tab.Screen name="setting" component={Setting} options={{
                tabBarIcon: ({ focused }) => (
                    <Icons icon="setting" />
                )
            }} />
        </Tab.Navigator >
    )
}

export default TabNavigation



const styles = StyleSheet.create({})