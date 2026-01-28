import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Text1 from '../components/text/Text1'
import Screen from '../components/screen/Screen'
import AddButton from '../components/button/AddButton'

const Reports = ({ navigation }: any) => {
    return (

        <View style={{ flex: 1 }}>
            <Screen>
                <Pressable onPress={() => { navigation.navigate('AddReports') }}>
                    <Text1>+ add</Text1>
                </Pressable>
            </Screen>
            <AddButton addFunction={() => { navigation.navigate("AddReports") }} />
        </View>
    )
}

export default Reports

const styles = StyleSheet.create({})