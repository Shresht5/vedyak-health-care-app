import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigation from './navigation/MainNavigation';

const Main = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? "#000" : "#fff",
    };
    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <MainNavigation />
        </SafeAreaProvider>
    )
}

export default Main

const styles = StyleSheet.create({})