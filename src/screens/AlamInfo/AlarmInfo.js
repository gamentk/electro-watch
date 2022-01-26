import React from 'react';
import {
    Box,
    Divider,
    Text,
    VStack
} from 'native-base';

// Mock
import { alarmInfo } from '../../common/mocks'

const AlarmInfo = ({ route }) => {
    const { errors } = route.params;
    const { value: title, descriptions } = alarmInfo(errors[0].value);

    return (
        <Box
            position="relative"
            alignItems="center"
            h="full"
            bg="white"
        >
            <Box
                rounded="lg"
                borderWidth={2}
                borderColor="gray.400"
                mt="10"
                w="85%"
                p="4"
            >
                {/* Title */}
                <Text
                    fontSize="xl"
                    fontFamily="heading"
                    textAlign="center"
                    mb="2"
                >
                    {title}
                </Text>
                <Divider />
                {/* Description */}
                <VStack space={2}>
                    {
                        descriptions.map((value, index) => (
                            <Text
                                key={`description-${index}`}
                                mt="2"
                                fontSize="md"
                                color="gray.600"
                            >
                                {value}
                            </Text>
                        ))
                    }
                </VStack>
            </Box>
        </Box>
    );
}

export default AlarmInfo;