import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/screen/Screen';
import Text1 from '../components/text/Text1';
import Text3 from '../components/text/Text3';
import AddButton from '../components/button/AddButton';
import { getMedications } from '../services/db/MedicationDB';
import BoxContainer from '../components/container/BoxContainer';


const Medication = ({ navigation }: any) => {

    const [medication, setMedication] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    useEffect(() => {
        const load = async () => {
            const data = await getMedications();
            setMedication(data);
        };
        load();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Screen>
                {medication.map((item: any) => (
                    <Pressable onPress={() => { navigation.navigate('UpMedication', { id: item.id }) }} key={item.id}>
                        <BoxContainer>
                            <Text1>{item.medicationName}</Text1>
                            <Text3>Timing:{' '}{item.timing?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', })}</Text3>
                            <Text3>Frequency: {item.frequency}</Text3>
                        </BoxContainer>
                    </Pressable>
                ))}
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