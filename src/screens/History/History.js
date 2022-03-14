import React, { useEffect, useState } from 'react';
import {
    VStack,
    Select,
    Text,
    HStack,
    Divider
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const History = () => {
    const [monitors, setMonitors] = useState([]);

    useEffect(() => {
        getMonitors();
    }, []);

    const getMonitors = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('user');
            const { token } = JSON.parse(jsonString);

            const { data } = await axios.get('https://electrowatch-server.herokuapp.com/v1/monitor', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.success) {
                setMonitors(data.result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <VStack
            bg="white"
            height="100%"
            p="4"
        >
            {/* <Select
                selectedValue=""
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="เลือกดู"
                onValueChange={itemValue => { }}
            >
                <Select.Item label="Voltage" value="volt" />
                <Select.Item label="Current" value="current" />
                <Select.Item label="Power" value="power" />
                <Select.Item label="Energy" value="energy" />
                <Select.Item label="Power Factor" value="powerFactor" />
            </Select> */}
            <VStack>
                <HStack borderWidth={1} borderColor="gray.400" rounded="sm" px="1">
                    <Text flex={2} textAlign="center">วันที่</Text>
                    <Text flex={2} textAlign="center">เวลา</Text>
                    <Text flex={1} textAlign="center">V</Text>
                    <Text flex={1} textAlign="center">A</Text>
                    <Text flex={1} textAlign="center">W</Text>
                    <Text flex={1} textAlign="center">J</Text>
                    <Text flex={1} textAlign="center">PF</Text>
                </HStack>
                <VStack p="1" borderWidth={1} borderColor="gray.400" space="1">
                    {monitors.map(monitor => {
                        const { volt, current } = monitor;
                        const color =
                            (volt === 0 || volt < 208 || volt > 240 || current > 40)
                                ? 'red.400'
                                : 'black';

                        return (
                            <HStack
                                key={monitor.monitorId}
                                justifyContent="space-between"
                            >
                                <Text flex={2} textAlign="center" color={color}>
                                    {new Date(monitor.createdAt).toLocaleDateString('th-Th')}
                                </Text>
                                <Divider orientation="vertical" />
                                <Text flex={2} textAlign="center" color={color}>
                                    {new Date(monitor.createdAt).toLocaleTimeString('th-Th')}
                                </Text>
                                <Divider orientation="vertical" />
                                <Text flex={1} textAlign="center" color={color}>
                                    {monitor.volt}
                                </Text>
                                <Divider orientation="vertical" />
                                <Text flex={1} textAlign="center" color={color}>
                                    {monitor.current}
                                </Text>
                                <Divider orientation="vertical" />

                                <Text flex={1} textAlign="center" color={color}>
                                    {monitor.power}
                                </Text>
                                <Divider orientation="vertical" />

                                <Text flex={1} textAlign="center" color={color}>
                                    {monitor.energy}
                                </Text>
                                <Divider orientation="vertical" />

                                <Text flex={1} textAlign="center" color={color}>
                                    {monitor.powerFactor}
                                </Text>
                            </HStack>
                        )
                    })}
                </VStack>
            </VStack>
        </VStack>
    );
}

export default History;