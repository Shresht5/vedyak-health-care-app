import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const Medication = ({ navigation }: any) => {
    const [medication, setMedication] = useState([]);
    useEffect(() => {

    }, [])
    return (
        <View style={styles.Screen}>
            <Pressable onPress={() => { navigation.navigate('AddMedication') }}>
                <Text>+ add</Text>
            </Pressable>
        </View>
    )
}

export default Medication

const styles = StyleSheet.create({
    Screen: {
        flex: 1
    }
})