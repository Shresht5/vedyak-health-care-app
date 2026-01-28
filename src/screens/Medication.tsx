import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/screen/Screen';
import Text1 from '../components/text/Text1';
import AddButton from '../components/button/AddButton';

const Medication = ({ navigation }: any) => {

    const [medication, setMedication] = useState([]);
    useEffect(() => {

    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Screen>
                <Pressable onPress={() => { navigation.navigate('AddMedication') }}>
                    <Text1>+ add</Text1>
                </Pressable>
            </Screen>
            <AddButton addFunction={() => { navigation.navigate("AddMedication") }} />

        </View>
    )
}

export default Medication

const styles = StyleSheet.create({
    Screen: {
        flex: 1
    }
})