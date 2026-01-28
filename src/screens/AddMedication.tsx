import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import ContentContainer from '../components/container/ContentContainer'
import Screen from '../components/screen/Screen';
import Text2 from '../components/text/Text2';

const AddMedication = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [medication, setMedication] = useState({
        medicationName: '',
        frequency: 'everyday',
        schedule: [{
            label: 'carol mh',
            dose: 0,
        }],
        timeing: new Date(),
        started: new Date(),
        stock: 0,
        notification: false,
    });
    //Frequency 
    const [frequency, setFrequency] = useState("")
    const [showFrequency, setShowFrequency] = useState(false)
    //schedule

    const addSchedule = () => {
        setMedication({
            ...medication,
            schedule: [...medication.schedule, { label: '', dose: 0 }],
        });
    };
    type ScheduleItem = {
        label: string
        dose: number
    }
    const updateSchedule = <K extends keyof ScheduleItem>(index: number, key: K, value: ScheduleItem[K] extends number ? string : string) => {
        const newSchedule = [...medication.schedule] as ScheduleItem[]
        newSchedule[index] = { ...newSchedule[index], [key]: key === 'dose' ? Number(value) : value, } as ScheduleItem
        setMedication({ ...medication, schedule: newSchedule })
    }
    const removeSchedule = (index: number) => {
        setMedication(prev => ({
            ...prev,
            schedule: prev.schedule.filter((_, i) => i !== index),
        }));
    };

    //timing
    const [openT, setOpenT] = useState(false)
    const [openD, setOpenD] = useState(false)


    useEffect(() => {

    }, [])
    return (
        <Screen>
            <ContentContainer>
                <Text2>medication name</Text2>
                <TextInput
                    style={{ color: isDarkMode ? "#fff" : "#000" }}
                    placeholder='Enter mediccation name'
                    value={medication.medicationName}
                    onChangeText={(text) => { setMedication({ ...medication, medicationName: text }) }}
                />
            </ContentContainer>
            <ContentContainer>
                <Text2>Frequency</Text2>
                <Pressable onPress={() => setShowFrequency(true)}>
                    <Text2>{frequency}</Text2>
                </Pressable>
                {showFrequency &&
                    <View style={styles.freqMenu} >
                        <Pressable onPress={() => { setFrequency("everday"); setShowFrequency(false) }}>
                            <Text2>everyday</Text2>
                        </Pressable>

                        <Pressable onPress={() => { setFrequency("every week"); setShowFrequency(false) }}>
                            <Text2>every week</Text2>
                        </Pressable>
                    </View>
                }
            </ContentContainer>
            <ContentContainer>
                <Text2>schedule</Text2>
                <Pressable onPress={() => addSchedule()}>
                    <Text2>+ add</Text2>
                </Pressable>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text2>label</Text2>
                        <Text2>dose</Text2>
                        <Text></Text>
                    </View>
                    {medication.schedule.map((item, i) => (
                        <View key={i} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                style={{ color: isDarkMode ? "#fff" : "#000" }}
                                placeholder="Label"
                                value={item.label}
                                onChangeText={(text) => updateSchedule(i, 'label', text)}

                            />
                            <TextInput
                                style={{ color: isDarkMode ? "#fff" : "#000" }}
                                placeholder="Dose"
                                keyboardType="numeric"
                                value={item.dose.toString()}
                                onChangeText={(text) => updateSchedule(i, 'dose', text)}

                            />
                            <Pressable onPress={() => removeSchedule(i)}>
                                <Text2>delete</Text2>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ContentContainer>
            <ContentContainer>
                <Pressable onPress={() => setOpenT(true)}>
                    <Text2>select time: {medication.timeing.toLocaleTimeString()}</Text2>
                </Pressable>
                <DatePicker
                    modal
                    open={openT}
                    date={medication.timeing}
                    mode='time'
                    onConfirm={(selectedTime) => { setOpenT(false); setMedication({ ...medication, timeing: selectedTime }) }}
                />
            </ContentContainer>
            <ContentContainer>
                <Pressable onPress={() => setOpenD(true)}>
                    <Text2>select started date: {medication.started.toLocaleDateString()}</Text2>
                </Pressable>
                <DatePicker
                    modal
                    open={openD}
                    date={medication.started}
                    mode='date'
                    onConfirm={(selectedTime) => { setOpenD(false); setMedication({ ...medication, started: selectedTime }) }}
                />
            </ContentContainer>
            <ContentContainer>
                <Text2>stock</Text2>
                <TextInput
                    style={{ color: isDarkMode ? "#fff" : "#000" }}
                    placeholder='Enter stock of medicine...'
                    keyboardType='numeric'
                    value={String(medication.stock)}
                    onChangeText={(text) => { setMedication({ ...medication, stock: Number(text) }) }}
                />
            </ContentContainer>
            <ContentContainer>
                <Text2>notification</Text2>
                <Pressable
                    onPress={() =>
                        setMedication({
                            ...medication,
                            notification: !medication.notification,
                        })
                    }
                >
                    <Text2>{medication.notification ? 'ON' : 'OFF'}</Text2>
                </Pressable>
            </ContentContainer>
            <ContentContainer>
                <Pressable
                    onPress={() => { }}
                    style={{ alignItems: "center" }}
                >
                    <Text2>save</Text2>
                </Pressable>
            </ContentContainer>
            <Text>{medication.medicationName}</Text>
            <Text>{medication.frequency}</Text>
            <Text>Schedule:</Text>
            <Text>{medication.timeing.toLocaleTimeString()}</Text>
            <Text>{medication.started.toLocaleDateString()}</Text>
            <Text>{medication.stock}</Text>
            <Text>{medication.notification ? "true" : "false"}</Text>
        </Screen >
    )
}

export default AddMedication

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
    },
    frequencyContainer: {
        position: "relative",
        zIndex: 100,
    },
    freqMenu: {
        position: "absolute",
        backgroundColor: "#000"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginVertical: 3,
    },
})