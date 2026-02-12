import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

type ScreenProps = {
    children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <ScrollView contentContainerStyle={{ padding: 10, }} style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff', position: "relative", }}>
            {children}
        </ScrollView>
    )
}

export default Screen

const styles = StyleSheet.create({})