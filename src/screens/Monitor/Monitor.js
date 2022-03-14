import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Icon,
    VStack,
    Box,
    useToast,
    HStack,
    Circle,
    Center
} from 'native-base';
import OcIcon from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { AlarmButton, CircleButton, TextBox, CreateUserModal } from '../../common/components';
import { useWebSocket, useDisclosure } from '../../common/hooks';

const Monitor = ({ navigation }) => {
    const message = useWebSocket({ enabled: true });
    const data = useMemo(() => message || {});
    const {
        peaNo,
        volt,
        current,
        power,
        energy,
        powerFactor,
        createdAt
    } = data;
    const toast = useToast();
    const { isOpen, onToggle } = useDisclosure();

    const [isAlert, setIsAlert] = useState(false);
    const [error, setError] = useState(null);
    const [role, setRole] = useState();

    useEffect(() => {
        getRole();
    }, [])

    useEffect(() => {
        validateValue();
    }, [data]);

    useLayoutEffect(() => {
        setAlarmHeader();
    }, [isAlert, error]);

    const setAlarmHeader = () => {
        navigation.setOptions({
            headerRight: () => (
                <AlarmButton
                    navigation={navigation}
                    isAlert={isAlert}
                    error={error}
                />
            )
        });
    }

    const validateValue = () => {
        if (volt === 0 || volt < 208 || volt > 240 || current > 40) {
            setIsAlert(true);
            setError({
                volt,
                current,
                date: new Date(createdAt).toLocaleDateString('th-Th'),
                time: new Date(createdAt).toLocaleTimeString('th-Th')
            });
        } else {
            setIsAlert(false);
            setError(null);
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            navigation.replace('Auth');
        } catch (error) {
            toast.show({
                title: 'มีบางอย่างผิดพลาด ไม่สามารถออกจากระบบ',
                status: 'error'
            });
        }
    }

    const handlePressHistory = () => {
        navigation.push('History')
    }

    const getRole = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('user');
            const user = JSON.parse(jsonString);

            if (user) {
                setRole(user.user.role);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box
            position="relative"
            alignItems="center"
            h="full"
            bg="white"
        >
            {
                data
                && (
                    <VStack
                        w="60%"
                        py="4"
                        space="4"
                    >
                        <TextBox
                            title="PEA NO."
                        >
                            {peaNo}
                        </TextBox>
                        <TextBox
                            title="Voltage"
                            color={(volt < 208 || volt > 240) ? 'red.400' : 'black'}
                        >
                            {volt}
                        </TextBox>
                        <TextBox title="Current" color={(current > 40) ? 'red.400' : 'black'}>
                            {current}
                        </TextBox>
                        <TextBox title="Power">
                            {power}
                        </TextBox>
                        <TextBox title="Energy">
                            {energy}
                        </TextBox>
                        <TextBox title="Power Factor">
                            {powerFactor}
                        </TextBox>
                    </VStack>
                )
            }
            {/* Logout Button */}
            <HStack
                position="absolute"
                bottom="3"
                left="3"
                space="2"
            >
                <CircleButton
                    onPress={handleLogout}
                    icon={OcIcon}
                    name="sign-out"
                    size={10}
                    color="white"
                    bg="red.400"
                    top="1"
                    left="1"
                />
                <CircleButton
                    onPress={handlePressHistory}
                    icon={MaIcon}
                    name="history"
                    size={10}
                    color="white"
                    bg="green.400"
                />
                {
                    (role === 'ADMINISTRATOR')
                    && (
                        <>
                            <CircleButton
                                onPress={onToggle}
                                icon={Ionicons}
                                name="ios-person-add"
                                size={10}
                                color="white"
                                bg="blue.400"
                            />
                            <CreateUserModal isOpen={isOpen} onClose={onToggle} />
                        </>
                    )
                }
            </HStack>

        </Box >
    );
}

export default Monitor;