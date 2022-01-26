import React from 'react';
import { Dimensions } from 'react-native';
import { Box } from 'native-base';

const Card = ({ children }) => {
    const { width, height } = Dimensions.get('window');

    return (
        <Box
            w={width * .4}
            h={width * .4}
            bg="warmGray.400"
            rounded="lg"
        >
            {children}
        </Box>
    );
}

export default Card;