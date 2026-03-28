import notifee, { TriggerType, TimestampTrigger, RepeatFrequency, } from '@notifee/react-native';
import { requestNotificationPermission } from './AndroidPermission';

export const scheduleMedicationNotification = async (id: number, name: string, timing: Date) => {

    await requestNotificationPermission();
    const now = new Date();

    // If today's time already passed → move to tomorrow
    if (timing <= now) {
        timing.setDate(timing.getDate() + 1);
    }

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: timing.getTime(),
        repeatFrequency: RepeatFrequency.DAILY, // daily
    };

    await notifee.createTriggerNotification(
        {
            id: id.toString(),
            title: 'Medication Reminder',
            body: `Time to take ${name}`,
            android: {
                channelId: 'medication-channel',
                pressAction: {
                    id: 'default',
                },
            },
        },
        trigger
    );
};


export const cancelMedicationNotification = async (id: number) => {
    await notifee.cancelNotification(id.toString());
};
