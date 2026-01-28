import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'

const contentContainer = ({ children }: any) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ borderColor: isDarkMode ? "#fff" : "#000", borderWidth: 2, borderStyle: "solid", borderRadius: 15, padding: 10, marginTop: 15 }}>
            {children}
        </View>
    )
}

export default contentContainer

const styles = StyleSheet.create({})