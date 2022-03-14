import React from 'react';
import {
    Pressable,
    Icon,
    Box
} from 'native-base';

const CircleButton = ({ icon: InputIcon, size, color, bg, onPress, name, ...rest }) => {
    return (
        <Pressable
            onPress={onPress}
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
                            name={name}
                            size={size}
                            color={color}
                            {...rest}
                        />
                    </Box>
                )
            }
        </Pressable>
    );
}

export default CircleButton;