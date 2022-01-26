import React from 'react';
import { Dimensions } from 'react-native';
import {
    KeyboardAvoidingView,
    Pressable,
    Box,
    VStack,
    Text,
    Input
} from 'native-base';

const Login = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');

    const onLogin = () => {
        navigation.replace('App')
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            h={height}
            justifyContent="center"
            alignItems="center"
            bg="warmGray.50"
        >
            <VStack space="sm" w={width * 0.9}>
                <Text {...label}>Username</Text>
                <Input
                    type="text"
                    fontSize="md"
                    placeholder="ชื่อผู้ใช้"
                    borderColor="gray.300"
                />
                <Text {...label}>Password</Text>
                <Input
                    type="password"
                    fontSize="md"
                    placeholder="รหัสผ่าน"
                    borderColor="gray.300"
                />
                <Pressable onPress={onLogin}>
                    {
                        ({ isPressed }) => (
                            <Box
                                bg={(isPressed) ? 'blue.700' : 'blue.500'}
                                py="2"
                                my="2"
                                rounded="sm"
                                style={{
                                    transform: [
                                        {
                                            scale: (isPressed) ? .98 : 1
                                        }
                                    ]
                                }}
                            >
                                <Text
                                    color="white"
                                    fontSize="lg"
                                    fontWeight="semibold"
                                    fontFamily="body"
                                    textAlign="center"
                                >
                                    เข้าสู่ระบบ
                                </Text>
                            </Box>
                        )
                    }
                </Pressable>
            </VStack>
        </KeyboardAvoidingView>
    );
}

// Styles
const label = {
    fontFamily: "body",
    fontSize: "md",
    fontWeight: "medium"
}

export default Login;