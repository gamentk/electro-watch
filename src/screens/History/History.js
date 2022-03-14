import React, { useEffect, useState } from 'react';
import {
    VStack,
    Text,
    HStack,
    Divider,
    ScrollView
} from 'native-base';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const History = () => {
    const { width } = Dimensions.get('window')
    const [monitors, setMonitors] = useState([]);

    const date = new Date('2022-03-14T15:32:03.924+00:00');

    const th_date = `${date.getDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`

    console.log(th_date)

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
        <VStack bg="white" height="100%" width="100%">
            <VStack>
                <HStack rounded="sm" px="1" py="2" bg="blue.400">
                    <Text {...styles.tableHead}>วันที่</Text>
                    <Text {...styles.tableHead}>เวลา</Text>
                    <Text {...styles.tableHead}>V</Text>
                    <Text {...styles.tableHead}>A</Text>
                    <Text {...styles.tableHead}>W</Text>
                    <Text {...styles.tableHead}>J</Text>
                    <Text {...styles.tableHead}>PF</Text>
                </HStack>
                <ScrollView>
                    <VStack p="1" space="1">
                        {monitors.map(monitor => {
                            const { volt, current, createdAt } = monitor;
                            const date = new Date(createdAt);

                            const dateDisplay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() - 2000}`;
                            const timeDisplay = date.toLocaleTimeString('th-Th');
                            const color =
                                (volt === 0 || volt < 208 || volt > 240 || current > 40)
                                    ? 'red.400'
                                    : 'black';


                            return (
                                <HStack
                                    key={monitor.monitorId}
                                    justifyContent="space-between"
                                >
                                    <Text textAlign="center" color={color} px="0.5">
                                        {dateDisplay}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />
                                    <Text flex={1} textAlign="center" color={color} px="0.5">
                                        {timeDisplay}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />
                                    <Text flex={1} textAlign="center" color={color}>
                                        {monitor.volt}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />
                                    <Text flex={1} textAlign="center" color={color}>
                                        {monitor.current}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />

                                    <Text flex={1} textAlign="center" color={color}>
                                        {monitor.power}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />

                                    <Text flex={1} textAlign="center" color={color}>
                                        {monitor.energy}
                                    </Text>
                                    <Divider orientation="vertical" bg="blue.700" thickness={1} />

                                    <Text flex={1} textAlign="center" color={color}>
                                        {monitor.powerFactor}
                                    </Text>
                                </HStack>
                            )
                        })}
                    </VStack>
                </ScrollView>
            </VStack>
        </VStack>
    );
}

const styles = {
    tableHead: {
        flex: 1,
        textAlign: "center",
        color: "white",
        fontSize: "lg",
        fontWeight: "semibold"
    }
};

export default History;