import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

type ScreenProps = {
    children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ScrollView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff', padding: 10, position: "relative", }}>
            {children}
        </ScrollView>
    )
}

export default Screen

const styles = StyleSheet.create({})