import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Text2 from '../../components/text/Text2'
type Props = {
    addFunction: () => void
}
const AddButton = ({ addFunction }: Props) => {
    const isDark = useColorScheme() === 'dark';

    return (
        <Pressable style={{ position: "absolute", bottom: 20, right: 20 }} onPress={() => { addFunction() }}>
            <View style={{ borderColor: isDark ? "#fff" : "#000", borderWidth: 2, borderStyle: "solid", borderRadius: 8, display: "flex", padding: 5, paddingHorizontal: 10, }}>
                <Text2>+</Text2>
            </View>
        </Pressable >
    )
}

export default AddButton

const styles = StyleSheet.create({})