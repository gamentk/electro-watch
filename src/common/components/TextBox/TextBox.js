import React from 'react';
import {
    Pressable,
    Text,
    Box
} from 'native-base';

const TextBox = ({ title, color, onPress, children }) => {
    return (
        <Pressable onPress={onPress}>
            <Box>
                <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    fontFamily="heading"
                >
                    {title}
                </Text>
                <Box
                    py="1.5"
                    rounded="md"
                    alignItems="center"
                    borderWidth={2}
                    borderColor="gray.400"
                >
                    <Text
                        fontSize="lg"
                        fontWeight="medium"
                        color={color}
                    >
                        {children}
                    </Text>
                </Box>
            </Box>
        </Pressable>
    );
}

export default TextBox;