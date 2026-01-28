import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import Screen from '../components/screen/Screen';

const AddMedication = () => {
    const [medication, setMedication] = useState({
        medicineName: '',
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
        <View>
            <View>
                <Text>medicine name</Text>
                <TextInput
                    placeholder='Enter medicine name'
                    value={medication.medicineName}
                    onChangeText={(text) => { setMedication({ ...medication, medicineName: text }) }}
                />
            </View>
            <View style={styles.frequencyContainer}>
                <Text>Frequency</Text>
                <Pressable onPress={() => setShowFrequency(true)}>
                    <Text>{frequency}</Text>
                </Pressable>
                {showFrequency &&
                    <View style={styles.freqMenu}>
                        <Pressable onPress={() => { setFrequency("everday"); setShowFrequency(false) }}>
                            <Text>everyday</Text>
                        </Pressable>

                        <Pressable onPress={() => { setFrequency("every week"); setShowFrequency(false) }}>
                            <Text>every week</Text>
                        </Pressable>
                    </View>
                }
            </View>
            <View>
                <Text>schedule</Text>
                <Pressable onPress={() => addSchedule()}>
                    <Text>+ add</Text>
                </Pressable>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text>label</Text>
                        <Text>dose</Text>
                        <Text></Text>
                    </View>
                    {medication.schedule.map((item, i) => (
                        <View key={i} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                placeholder="Label"
                                value={item.label}
                                onChangeText={(text) => updateSchedule(i, 'label', text)}
                                style={styles.input}
                            />
                            <TextInput
                                placeholder="Dose"
                                keyboardType="numeric"
                                value={item.dose.toString()}
                                onChangeText={(text) => updateSchedule(i, 'dose', text)}
                                style={styles.input}
                            />
                            <Pressable onPress={() => removeSchedule(i)}>
                                <Text>delete</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
            <View>
                <Pressable onPress={() => setOpenT(true)}>
                    <Text>select time: {medication.timeing.toLocaleTimeString()}</Text>
                </Pressable>
                <DatePicker
                    modal
                    open={openT}
                    date={medication.timeing}
                    mode='time'
                    onConfirm={(selectedTime) => { setOpenT(false); setMedication({ ...medication, timeing: selectedTime }) }}
                />
            </View>
            <View>
                <Pressable onPress={() => setOpenD(true)}>
                    <Text>select started date: {medication.started.toLocaleDateString()}</Text>
                </Pressable>
                <DatePicker
                    modal
                    open={openD}
                    date={medication.started}
                    mode='date'
                    onConfirm={(selectedTime) => { setOpenD(false); setMedication({ ...medication, started: selectedTime }) }}
                />
            </View>
            <View>
                <Text>stock</Text>
                <TextInput
                    placeholder='Enter stock of medicine...'
                    keyboardType='numeric'
                    value={String(medication.stock)}
                    onChangeText={(text) => { setMedication({ ...medication, stock: Number(text) }) }}
                />
            </View>
            <View>
                <Text>notification</Text>
                <Pressable
                    onPress={() =>
                        setMedication({
                            ...medication,
                            notification: !medication.notification,
                        })
                    }
                >
                    <Text>{medication.notification ? 'ON' : 'OFF'}</Text>
                </Pressable>
            </View>
            <Text>{medication.medicineName}</Text>
            <Text>{medication.frequency}</Text>
            <Text>Schedule:</Text>
            <Text>{medication.timeing.toLocaleTimeString()}</Text>
            <Text>{medication.started.toLocaleDateString()}</Text>
            <Text>{medication.stock}</Text>
            <Text>{medication.notification ? "true" : "false"}</Text>
        </View >
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
        backgroundColor: "#FFF"
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        marginVertical: 3,
    },
})