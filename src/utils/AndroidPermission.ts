import { Platform } from 'react-native';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
        const settings = await notifee.requestPermission();

        return (
            settings.authorizationStatus === AuthorizationStatus.AUTHORIZED
        );
    }
    return true;
};