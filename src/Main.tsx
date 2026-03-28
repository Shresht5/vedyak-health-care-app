import { PermissionsAndroid, Platform, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigation from './navigation/MainNavigation';
import { requestNotificationPermission } from './utils/AndroidPermission';
import notifee, { AndroidImportance } from '@notifee/react-native';

const Main = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? "#000" : "#fff",
    };
    useEffect(() => {
        // Create Android channel
        const setup = async () => {
            await requestNotificationPermission();

            await notifee.createChannel({
                id: 'medication-channel',
                name: 'Medication Reminder',
                sound: 'default',
                importance: AndroidImportance.HIGH,
            });
        };

        setup();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <MainNavigation />
        </SafeAreaProvider>
    )
}

export default Main

const styles = StyleSheet.create({})