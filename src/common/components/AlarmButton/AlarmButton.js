import React from 'react';
import {
    Pressable,
    Box,
    Icon,
    Text
} from 'native-base';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AlarmButton = ({ navigation, isAlert, error }) => {
    const handlePressAlert = () => {
        navigation.navigate('Alarm', {
            error
        });
    }

    return (
        <Pressable
            onPress={handlePressAlert}
            disabled={!isAlert}
        >
            {
                ({ isPressed }) => (
                    <Box
                        position="relative"
                        mr={2}
                        style={{
                            transform: [
                                {
                                    scale: isPressed ? 0.9 : 1
                                }
                            ]
                        }}
                    >
                        <Icon
                            as={MCIcon}
                            name="bell"
                            size={10}
                            color={isAlert ? 'yellow.400' : 'warmGray.400:alpha.50'}
                            shadow="1"
                        />
                        {
                            isAlert
                            && (
                                <Box
                                    position="absolute"
                                    top="0"
                                    right="0"
                                    bg="red.400"
                                    w="18px"
                                    h="18px"
                                    rounded="full"
                                    alignItems="center"
                                >
                                    <Text color="white" top="-2">
                                        1
                                    </Text>
                                </Box>
                            )
                        }
                    </Box>
                )
            }
        </Pressable>
    )
}

export default AlarmButton;