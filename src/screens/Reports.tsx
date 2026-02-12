import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text1 from '../components/text/Text1'
import Text3 from '../components/text/Text3'
import Screen from '../components/screen/Screen'
import AddButton from '../components/button/AddButton'
import { getReports } from '../services/db/Reports'


const Reports = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [document, setDocument] = useState<{
        id: number;
        patiantName: string;
        title: string;
        note: string;
        date: Date;
        images: string[];
        pdf: string[];
    }[]>([]);
    useEffect(() => {
        const load = async () => {
            const data = await getReports();
            setDocument(data);
        };
        load();
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Screen>
                {document.map((item: any) => (
                    <Pressable style={{ padding: 16, backgroundColor: isDarkMode ? '#111' : '#eee', marginBottom: 10, elevation: 5 }} onPress={() => { navigation.navigate('Report', { id: item.id }) }} key={item.id}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text1>{item.title}</Text1>
                            <Text3> {item.date.toLocaleDateString('en-GB')}</Text3>
                        </View>
                        <Text3>{item.patiantName}</Text3>
                        {item.note?.trim() ? <Text3>{item.note}</Text3> : null}
                    </Pressable>
                ))}
            </Screen>
            <AddButton addFunction={() => { navigation.navigate("AddReports") }} />
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({})