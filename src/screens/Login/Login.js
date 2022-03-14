import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
    KeyboardAvoidingView,
    Pressable,
    Box,
    VStack,
    Text,
    Input,
    useToast,
    Spinner
} from 'native-base';
import axios from 'axios';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUserFromStorage();
    }, []);

    const handleLogin = async user => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://electrowatch-server.herokuapp.com/v1/auth/login', user);

            if (data.success) {
                setIsLoading(false);

                saveUserToStorage(data.result);
                navigation.replace('App');
            }
        } catch (error) {
            setIsLoading(false);
            toast.show({
                title: 'ชื่อผู้ใช้หรือรหัสผ่านผิด',
                status: 'error'
            });
        }
    }

    const saveUserToStorage = async user => {
        try {
            const jsonString = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonString);
        } catch (error) {
            toast.show({
                title: 'บัฟกทรื',
                status: 'error'
            });
        }
    }

    const getUserFromStorage = async () => {
        try {
            const user = await AsyncStorage.getItem('user');

            if (user) {
                navigation.replace('App');
            }
        } catch (error) {
            return null;
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: handleLogin,
    })


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
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    value={formik.values.username}
                    isDisabled={isLoading}
                />
                <Text {...label}>Password</Text>
                <Input
                    type="password"
                    fontSize="md"
                    placeholder="รหัสผ่าน"
                    borderColor="gray.300"
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                    isDisabled={isLoading}
                />
                {
                    (isLoading)
                        ? <Spinner size="lg" />
                        : (
                            <Pressable onPress={formik.handleSubmit}>
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
                        )
                }
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