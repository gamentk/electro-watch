import React, { useEffect, useState } from 'react';
import {
    VStack,
    Icon,
    Box
} from 'native-base';
import OcIcon from 'react-native-vector-icons/Octicons';

import { TextBox } from '../../common/components';
import { SquareButton } from './components';
import { useConditionContext } from '../../common/contexts/ConditionContext/ConditionContext';

// Mock
// import { error } from '../../common/mocks';

const Alarm = ({ route, navigation }) => {
    const { voltMin, voltMax, currentMax } = useConditionContext();
    const [description, setDescription] = useState({});
    const {
        alarmError,
        ratio
    } = description;

    const { error } = route.params;
    const {
        volt,
        current,
        date,
        time
    } = error;

    useEffect(() => {
        if (volt === 0) {
            setDescription({
                alarmError: 'Black Out',
                ratio: `${volt} V/0 A`,
                date,
                time
            });
        } else if (volt < voltMin && volt !== 0) {
            setDescription({
                alarmError: 'Voltage Drop',
                ratio: `${volt} V`,
                date,
                time
            });
        } else if (volt > voltMax) {
            setDescription({
                alarmError: 'Over Voltage',
                ratio: `${volt} V`,
                date,
                time
            });
        } else if (current > currentMax) {
            setDescription({
                alarmError: 'Over Current',
                ratio: `${current} A`,
                date,
                time
            });
        } else {
            setDescription({});
        }
    }, [error]);

    const handlePressAlarmInfo = () => {
        navigation.navigate('Alarm Information', { description });
    }

    return (
        <Box
            position="relative"
            alignItems="center"
            h="full"
            bg="white"
        >
            <VStack
                w="60%"
                py="4"
                space="4"

            >
                <Icon
                    as={OcIcon}
                    name="alert"
                    size={16}
                    color="red.400"
                    alignSelf="center"
                />
                <TextBox title="Alarm Errors" color="red.400">
                    {alarmError}
                </TextBox>
                <TextBox title="VT/CT Ratio" color="red.400">
                    {ratio}
                </TextBox>
                <TextBox title="วันที่แจ้งเตือน" color="red.400">
                    {date}
                </TextBox>
                <TextBox title="เวลา" color="red.400">
                    {time}{' '}{'น.'}
                </TextBox>
                <SquareButton onPress={handlePressAlarmInfo}>หมายเหตุ</SquareButton>
            </VStack>
        </Box>
    );
}

export default Alarm;