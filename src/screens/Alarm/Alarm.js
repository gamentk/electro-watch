import React from 'react';
import {
    VStack,
    Icon,
    Box
} from 'native-base';
import OcIcon from 'react-native-vector-icons/Octicons';

import { TextBox } from '../../common/components';
import { SquareButton } from './components';

// Mock
import { error } from '../../common/mocks';

const Alarm = ({ route, navigation }) => {
    const {
        error: {
            isCutout,
            voltageMode,
            currentMode
        }
    } = route.params;
    const errors = error(voltageMode, currentMode, isCutout);

    const handlePressAlarmInfo = () => {
        navigation.navigate('Alarm Information', {
            errors
        });
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
                {
                    errors.map((item, index) => (
                        <TextBox
                            key={`electric-${index}`}
                            title={item.title}
                            color="red.600"
                        >
                            {item.value}{' '}{item.unit}
                        </TextBox>
                    ))
                }
                <SquareButton onPress={handlePressAlarmInfo}>หมายเหตุ</SquareButton>
            </VStack>
        </Box>
    );
}

export default Alarm;