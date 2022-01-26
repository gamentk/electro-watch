import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    VStack,
    Box
} from 'native-base';
import OcIcon from 'react-native-vector-icons/Octicons';

import { AlarmButton, CircleButton, TextBox } from '../../common/components';
import { useMQTT } from '../../common/hooks';

import { electrics } from '../../common/mocks';

const Monitor = ({ navigation }) => {
    const [client, data] = useMQTT();
    const [isAlert, setIsAlert] = useState(false);
    const [voltageMode, setVoltageMode] = useState(1);
    const [currentMode, setCurrentMode] = useState(1);
    const [isCutout, setIsCutout] = useState(false);

    const valueBreakpoints = [
        null,
        { min: 220, max: 240 },
        { min: 12, max: 20 },
        { min: 2, max: 6 },
        { min: 0.24, max: 0.28 },
        { min: 0.8, max: 1 }
    ];

    useEffect(() => {
        validateValue();
    }, [data]);

    useLayoutEffect(() => {
        setAlarmHeader();
    }, [isAlert, voltageMode]);

    const setAlarmHeader = () => {
        navigation.setOptions({
            headerRight: () => (
                <AlarmButton
                    navigation={navigation}
                    isAlert={isAlert}
                    error={{
                        isCutout,
                        voltageMode,
                        currentMode
                    }}
                />
            )
        });
    }

    const validateValue = () => {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].value > valueBreakpoints[i]?.max || data[i].value < valueBreakpoints[i]?.min) {
                    setIsAlert(true);
                    break;
                } else {
                    setIsAlert(false);
                }
            }
        }
    }

    const handleChangeVoltage = () => {
        if (!client)
            return;

        const newData = [...data];
        const voltage = newData[1];

        switch (voltageMode + 1) {
            case 2:
                voltage.value = 207;
                setVoltageMode(voltageMode + 1);
                break;
            case 3:
                voltage.value = 250;
                setVoltageMode(voltageMode + 1);
                break;
            default:
                voltage.value = 230;
                setVoltageMode(1);
                break;
        }

        client.publish(JSON.stringify(newData));
    }

    const handleChangeCurrent = () => {
        if (!client)
            return;

        const newData = [...data];
        const current = newData[2];

        switch (currentMode + 1) {
            case 2:
                current.value = 45;
                setCurrentMode(currentMode + 1);
                break;
            default:
                current.value = 18;
                setCurrentMode(1);
                break;
        }

        client.publish(JSON.stringify(newData));
    }

    const handleCutout = () => {
        if (!client)
            return;

        if (isCutout) {
            client.publish(JSON.stringify(electrics()));
        } else if (!isCutout) {
            const newData = [...data];

            for (let i = 0; i < newData.length; i++) {
                if (i === 0)
                    continue;

                newData[i].value = 0;
            }

            client.publish(JSON.stringify(newData));
        }

        setIsCutout(!isCutout);
    }

    const handleLogout = () => {
        navigation.replace('Auth')
    }

    return (
        <Box
            position="relative"
            alignItems="center"
            h="full"
            bg="white"
        >
            {/* Monitoring */}
            <VStack
                w="60%"
                py="4"
                space="4"
            >
                {
                    data
                    && data.map((item, index) => (
                        <TextBox
                            key={`electric-${index}`}
                            onPress={
                                (item.title === 'PEA NO.')
                                    ? handleCutout
                                    : (item.title === 'Voltage')
                                        ? handleChangeVoltage
                                        : (item.title === 'Current')
                                            ? handleChangeCurrent
                                            : null
                            }
                            title={item.title}
                            color={
                                (valueBreakpoints[index] === null)
                                    ? null
                                    : (item.value > valueBreakpoints[index].max || item.value < valueBreakpoints[index].min)
                                        ? 'red.600'
                                        : 'green.600'
                            }
                        >
                            {item.value}{' '}{item.unit}
                        </TextBox>
                    ))
                }
            </VStack>

            {/* Logout Button */}
            <CircleButton
                onPress={handleLogout}
                icon={OcIcon}
                size={10}
                color="white"
                bg="red.400"
                alignSelf="flex-start"
                position="absolute"
                left="3"
                bottom="3"
            />
        </Box>
    );
}

export default Monitor;