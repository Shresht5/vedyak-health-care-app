import { StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../components/screen/Screen'
import Text1 from '../components/text/Text1'
import Text2 from '../components/text/Text2'
import Text3 from '../components/text/Text3'
import AddButton from '../components/button/AddButton'
import ContentContainer from '../components/container/ContentContainer'
import { getReportsTop3 } from '../services/db/Reports'
import { getUpcomingMedications } from '../services/db/MedicationDB'
import BoxContainer from '../components/container/BoxContainer'

const Home = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [reports, setReports] = useState<any[]>([]);
    const [topMedications, setTopMedications] = useState<any[]>([]);
    useEffect(() => {
        const loadDocument = async () => {
            const dataD = await getReportsTop3();
            setReports(dataD || []);
            const dataM = await getUpcomingMedications();
            setTopMedications(dataM || []);
        };
        loadDocument();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Screen>
                <ContentContainer>{/*component qoute main*/}
                    <View>{/*iner part */}
                        <Text1>Happy day</Text1>
                    </View>
                    <View>{/*iner part */}
                        <Text3>today take medicine on time </Text3>
                    </View>
                </ContentContainer>
                <ContentContainer>{/*component notification*/}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>{/*next medicine blue, next purchase medicine red */}
                        <Text1>
                            {topMedications.length > 0
                                ? `Next medication ${topMedications[0].timing.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}`
                                : 'No upcoming medication'}
                        </Text1>
                    </View>
                </ContentContainer>
                <ContentContainer>{/*component qoute main*/}
                    <Text2>Medications</Text2>
                    {topMedications.length > 0 ? (
                        topMedications.map((item, index) => (
                            <Text3 key={index}>
                                {item.medicationName} : {item.timing.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text3>
                        ))
                    ) : (
                        <Text3>No upcoming medications</Text3>
                    )}
                </ContentContainer>
                <ContentContainer>{/*component qoute main*/}
                    <Text2>Reports</Text2>
                    {reports.length > 0 ? (
                        reports.map((item: any, index: number) => (
                            <Text3 key={index}>
                                {item.title} - {item.date.toLocaleDateString('en-GB')}
                            </Text3>
                        ))
                    ) : (
                        <Text3>No recent reports</Text3>
                    )}
                </ContentContainer>

            </Screen>
            <AddButton addFunction={() => { navigation.navigate("AddMedication") }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

})