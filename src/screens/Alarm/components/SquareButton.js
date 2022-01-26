import React from 'react';
import {
    Pressable,
    Box,
    Text
} from 'native-base';

const SquareButton = ({ onPress, children }) => {
    return (
        <Pressable onPress={onPress || function () { }}>
            {
                ({ isPressed }) => (
                    <Box
                        my="4"
                        bg={(isPressed) ? "blue.600" : "blue.500"}
                        rounded="md"
                        style={{
                            transform: [
                                {
                                    scale: (isPressed) ? 0.98 : 1
                                }
                            ]
                        }}
                    >
                        <Text
                            fontSize="lg"
                            fontWeight="semibold"
                            textAlign="center"
                            color="white"
                            py="2"
                        >
                            {children}
                        </Text>
                    </Box>
                )
            }
        </Pressable>
    );
}

export default SquareButton;