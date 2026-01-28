import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Screen from '../components/screen/Screen'
import Text1 from '../components/text/Text1'
import Text2 from '../components/text/Text2'
import Text3 from '../components/text/Text3'
import Text4 from '../components/text/Text4'
import AddButton from '../components/button/AddButton'
import ContentContainer from '../components/container/ContentContainer'

const Home = ({ navigation }: any) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <View style={{ flex: 1 }}>
            <Screen>
                <ContentContainer>{/*component qoute main*/}
                    <View>{/*iner part */}
                        <Text1>Happy day</Text1>
                    </View>
                    <View>{/*iner part */}
                        <Text3>today taken medicine on time </Text3>
                    </View>
                </ContentContainer>
                <ContentContainer>{/*component notification*/}
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>{/*next medicine blue, next purchase medicine red */}
                        <Text1>Next medication 10:00 Am</Text1>
                        <Text2>{"<"}</Text2>
                    </View>
                </ContentContainer>
                <ContentContainer>{/*component qoute main*/}
                    <View>{/*medicine timing*/}
                        <Text2>Medicine Timing</Text2>
                    </View>
                    <View>{/*project reports*/}
                        <Text3>carol-fer:10:00</Text3>
                        <Text3>carol-fer:14:00</Text3>
                        <Text3>carol-fer:20:00</Text3>
                    </View>
                </ContentContainer>
                <ContentContainer>{/*component qoute main*/}
                    <View>{/*medicine timing*/}
                        <Text2>Recent Reports</Text2>
                    </View>
                    <View>{/*project reports*/}
                        <Text3>doctors reports</Text3>
                        <Text3>doctors reports</Text3>
                    </View>
                </ContentContainer>

            </Screen>
            <AddButton addFunction={() => { navigation.navigate("AddMedication") }} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

})