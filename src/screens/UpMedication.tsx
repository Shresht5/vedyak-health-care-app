import { deleteMedication, getMedicationById } from '../services/db/MedicationDB'
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-native-date-picker';
import ContentContainer from '../components/container/ContentContainer'
import Screen from '../components/screen/Screen';
import Text2 from '../components/text/Text2';
import { updateMedication } from '../services/db/MedicationDB';

const UpMedication = ({ route, navigation }: any) => {
    const { id } = route.params;
    const isDarkMode = useColorScheme() === 'dark';
    const [medication, setMedication] = useState({
        medicationName: '',
        frequency: 'everyday',
        schedule: [{
            label: 'morning',
            dose: 0,
        }],
        timing: new Date(),
        started: new Date(),
        stock: 0,
        notification: false,
    });
    //Frequency 
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

    const handleSave = async () => {
        try {
            await updateMedication(id, medication);
            Alert.alert('Medication updated!');
            navigation.navigate('Tab', { screen: 'medication', })

        } catch (err) {
            console.error(err);
            Alert.alert('Error updating medication.');
        }
    };

    //deletedata
    const handleDelete = () => {
        Alert.alert(
            `Delete Medication ''${medication.medicationName}''`,
            'Are you sure you want to delete this medication?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteMedication(id);
                            Alert.alert('Medication deleted');
                            navigation.navigate('Tab', { screen: 'medication', })
                        } catch (err) {
                            Alert.alert('Error deleting medication');
                        }
                    },
                },
            ]
        );
    }

    useEffect(() => {
        const load = async () => {
            const data = await getMedicationById(id);
            setMedication(data);
        };
        load();
    }, [id]);
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
                    <Text2>{medication.frequency}</Text2>
                </Pressable>

                {showFrequency &&
                    <View style={styles.freqMenu} >
                        <Pressable
                            onPress={() => {
                                setMedication({ ...medication, frequency: 'everyday' });
                                setShowFrequency(false);
                            }}
                        >
                            <Text2>everyday</Text2>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setMedication({ ...medication, frequency: 'every week' });
                                setShowFrequency(false);
                            }}
                        >
                            <Text2>every week</Text2>
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setMedication({ ...medication, frequency: 'every month' });
                                setShowFrequency(false);
                            }}
                        >
                            <Text2>every month</Text2>
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
                    <Text2>select time: {medication.timing.toLocaleTimeString()}</Text2>
                </Pressable>
                <DatePicker
                    modal
                    open={openT}
                    date={medication.timing}
                    mode='time'
                    onConfirm={(selectedTime) => { setOpenT(false); setMedication({ ...medication, timing: selectedTime }) }}
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
            <View style={{ flexDirection: 'row' }}>
                <Pressable
                    onPress={handleDelete}
                    style={{ alignItems: 'center' }}
                >
                    <ContentContainer>
                        <Text2>delete</Text2>
                    </ContentContainer>
                </Pressable>
                <Pressable
                    onPress={async () => { await handleSave() }}
                    style={{ alignItems: "center", marginLeft: 5 }}
                >
                    <ContentContainer>
                        <Text2>save</Text2>
                    </ContentContainer>
                </Pressable>
            </View>
        </Screen >
    )
}

export default UpMedication


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