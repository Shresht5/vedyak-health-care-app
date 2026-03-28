import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Text1 from '../components/text/Text1'
import Text2 from '../components/text/Text2'
import Text4 from '../components/text/Text4'
import Screen from '../components/screen/Screen'
import Line from '../components/line/Line'

const Setting = () => {
    return (
        <Screen>
            <View style={{ paddingVertical: 10 }}>
                <Text1>User Guide</Text1>
            </View>
            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Getting Started</Text2>
            </View>
            <Text4>• After installing the app:</Text4>
            <Text4>• Open the application</Text4>
            <Text4>• Allow notification permission ( required for medication reminders )</Text4>
            <Text4>• You are now ready to add medications and reports</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Adding a Medication</Text2>
            </View>
            <Text4>• Tap the ➕ Add button</Text4>
            <Text4>• Enter details</Text4>
            <Text4>• Enable notification ( if reminder required )</Text4>
            <Text4>• Tap Save</Text4>
            <Text4>• If notification is enabled, the app will schedule a daily reminder, notify you at the selected time</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Medication Reminders</Text2>
            </View>
            <Text4>• Notifications repeat daily</Text4>
            <Text4>• If the selected time has already passed today, reminder starts from tomorrow</Text4>
            <Text4>• You can edit medication to update reminder time</Text4>
            <Text4>• Deleting medication automatically cancels reminder</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Viewing Medications</Text2>
            </View>
            <Text4>• Home screen shows:</Text4>
            <Text4>• Next upcoming medication</Text4>
            <Text4>• Top 3 upcoming medications sorted by time</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Adding Medical Reports</Text2>
            </View>
            <Text4>• Go to Reports section</Text4>
            <Text4>• Add details ( including image or pdf ) in form </Text4>
            <Text4>• Save</Text4>
            <Text4>• Recent reports appear on the Home screen.</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Editing or Deleting</Text2>
            </View>
            <Text4>• Tap edit icon ✏️ to modify</Text4>
            <Text4>• Tap delete icon 🗑 to remove</Text4>
            <Text4>• Deleting medication cancels its notification</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Notifications Permission</Text2>
            </View>
            <Text4>• If reminders are not working:</Text4>
            <Text4>• Go to Device Settings</Text4>
            <Text4>• Open App Permissions</Text4>
            <Text4>• Enable Notifications</Text4>
            <Text4>• Android 13+ requires notification permission to be manually granted.</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Data Storage</Text2>
            </View>
            <Text4>• All data is stored locally on your device</Text4>
            <Text4>• No cloud sync</Text4>
            <Text4>• Uninstalling the app deletes all data</Text4>
            <View style={{ height: 10 }} />


            <Line />
            <View style={{ paddingVertical: 10 }}>
                <Text2>Tips 📌 </Text2>
            </View>
            <Text4>• Keep stock updated to avoid missing doses</Text4>
            <Text4>• Double-check time before saving medication</Text4>
            <Text4>• Keep notification enabled for better adherence</Text4>
            <View style={{ height: 100 }} />

        </Screen>
    )
}

export default Setting

const styles = StyleSheet.create({})
