import { Image, useColorScheme } from 'react-native';
import React from 'react';

const ICONS = {
    home: {
        light: require('../global/icons/Home-Light.png'),
        dark: require('../global/icons/Home-Dark.png'),
    },
    medication: {
        light: require('../global/icons/Medication-Light.png'),
        dark: require('../global/icons/Medication-Dark.png'),
    },
    reports: {
        light: require('../global/icons/Reports-Light.png'),
        dark: require('../global/icons/Reports-Dark.png'),
    },
    setting: {
        light: require('../global/icons/Setting-Light.png'),
        dark: require('../global/icons/Setting-Dark.png'),
    },
};

type IconName = keyof typeof ICONS;

const Icons = ({ icon }: { icon: IconName }) => {
    const isDark = useColorScheme() === 'dark';

    return (
        <Image
            source={isDark ? ICONS[icon].dark : ICONS[icon].light}
            style={{ width: 30, height: 30 }}
        />
    );
};

export default Icons;