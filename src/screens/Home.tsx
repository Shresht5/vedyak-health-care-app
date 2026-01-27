import { ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import Screen from '../components/screen/Screen'
import Text1 from '../components/text/Text1'
import Text2 from '../components/text/Text2'
import Text3 from '../components/text/Text3'
import Text4 from '../components/text/Text4'

const Home = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <Screen>
            <View>{/*component qoute main*/}
                <View>{/*iner part */}
                </View>
            </View>
            <View>{/*component notification*/}
                <View>{/*next medicine blue, next purchase medicine red */}
                    <Text1>Next medication 10:00 Am</Text1>
                </View>
            </View>
            <View>{/*component qoute main*/}
                <View>{/*medicine timing*/}
                    <Text2>Medicine timing</Text2>
                </View>
                <View>{/*project reports*/}
                    <Text2>doctors reports</Text2>
                    <Text3>doctors reports</Text3>
                    <Text4>doctors reports</Text4>
                </View>
            </View>
        </Screen>
    )
}

export default Home

const styles = StyleSheet.create({

})