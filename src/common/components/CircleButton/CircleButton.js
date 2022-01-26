import React from 'react';
import {
    Pressable,
    Icon,
    Box
} from 'native-base';

const CircleButton = ({ icon: InputIcon, size, color, bg, onPress, ...rest }) => {
    return (
        <Pressable
            onPress={onPress || function () { }}
            {...rest}
        >
            {
                ({ isPressed }) => (
                    <Box
                        p={2}
                        bg={bg}
                        rounded="full"
                        shadow="1"
                        style={{
                            transform: [
                                {
                                    scale: isPressed ? 0.95 : 1
                                }
                            ]
                        }}
                    >
                        <Icon
                            as={InputIcon}
                            name="sign-out"
                            size={size}
                            color={color}
                            top="1"
                            left="1"
                        />
                    </Box>
                )
            }
        </Pressable>
    );
}

export default CircleButton;