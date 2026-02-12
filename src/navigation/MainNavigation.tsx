import { StyleSheet, useColorScheme, } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigation from './TabNavigation'
import AddMedication from '../screens/AddMedication'
import AddReport from '../screens/AddReport'
import UpReport from '../screens/UpReport'
import UpMedication from '../screens/UpMedication'
import Report from '../screens/Report'

const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
    const isDarkMode = useColorScheme() === 'dark';

    return (<>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={"Tab"}
                screenOptions={{

                    headerStyle: {
                        backgroundColor: isDarkMode ? '#111' : '#eee'
                    },
                    headerTintColor: isDarkMode ? '#fff' : '#000'
                }}
            >
                <Stack.Screen
                    name="Tab"
                    component={TabNavigation}
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen
                    name="AddMedication"
                    component={AddMedication}
                    options={{
                        animation: 'slide_from_bottom',
                        headerTitle: '',
                    }} />
                <Stack.Screen
                    name="UpMedication"
                    component={UpMedication}
                    options={{
                        animation: 'slide_from_bottom',
                        headerTitle: '',
                    }} />
                <Stack.Screen
                    name="AddReports"
                    component={AddReport}
                    options={{
                        animation: 'slide_from_bottom',
                        headerTitle: '',
                    }} />
                <Stack.Screen
                    name="Report"
                    component={Report}
                    options={{
                        animation: 'slide_from_bottom',
                        headerTitle: '',
                    }} />
                <Stack.Screen
                    name="UpReport"
                    component={UpReport}
                    options={{
                        animation: 'slide_from_bottom',
                        headerTitle: '',
                    }} />

            </Stack.Navigator>
        </NavigationContainer>
    </>
    )
}

export default MainNavigation

const styles = StyleSheet.create({})