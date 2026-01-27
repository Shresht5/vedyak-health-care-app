import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

type ScreenProps = {
    children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({ children }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Text style={{ color: isDarkMode ? '#fff' : '#000', fontSize: 16, fontWeight: "bold" }}>
            {children}
        </Text>
    )
}

export default Screen

const styles = StyleSheet.create({})