import { StyleSheet, useColorScheme, View } from 'react-native'
import React from 'react'

const BoxContainer = ({ children }: any) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View
            style={{
                padding: 16,
                backgroundColor: isDarkMode ? '#111' : '#eee',
                marginBottom: 10,
                elevation: 5
            }}
        >
            {children}
        </View>
    )
}

export default BoxContainer

const styles = StyleSheet.create({})