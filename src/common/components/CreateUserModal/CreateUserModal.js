import React, { useState } from 'react';
import {
    Modal,
    VStack,
    FormControl,
    Input,
    Select,
    Button,
    useToast,
    Spinner
} from 'native-base';
import { useFormik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateUserModal = ({ isOpen, onClose }) => {
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);

    const handleCreateUser = async (user, { resetForm }) => {
        const {
            username,
            password,
            re_password,
            firstName,
            lastName
        } = user;

        if (username !== '' || password !== '' || re_password !== ''
            || firstName !== '' || lastName !== '') {
            if (password === re_password) {
                try {
                    setIsLoading(true);
                    const jsonString = await AsyncStorage.getItem('user');
                    const { token } = JSON.parse(jsonString);
                    await axios.post('https://electrowatch-server.herokuapp.com/v1/auth/register', user, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    setIsLoading(false);
                    toast.show({
                        title: 'เพิ่มผู้ใช้สำเร็จ',
                        status: 'success',
                        placement: 'top'
                    });
                    resetForm();
                    onClose();
                } catch (error) {
                    setIsLoading(false);
                    toast.show({
                        title: 'ไม่สามารถสร้างผู้ใช้ อาจมีผู้ใช้ชื่อนี้อยู่แล้ว',
                        status: 'error',
                        placement: 'top'
                    });
                }
            } else {
                setIsLoading(false);
                toast.show({
                    title: 'รหัสผ่านไม่ตรงกัน',
                    status: 'error'
                });
            }
        } else {
            setIsLoading(false);
            toast.show({
                title: 'ข้อมูลจะต้องไม่ว่าง',
                status: 'error'
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            re_password: '',
            firstName: '',
            lastName: '',
            role: 'USER'
        },
        onSubmit: handleCreateUser,
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide">
            <Modal.Content size="lg" marginTop="auto" marginBottom={0}>
                <Modal.CloseButton />
                <Modal.Header>
                    เพิ่มผู้ใช้
                </Modal.Header>
                <Modal.Body>
                    <VStack>
                        <FormControl>
                            <FormControl.Label>ชื่อผู้ใช้</FormControl.Label>
                            <Input
                                placeholder="ชื่อผู้ใช้"
                                onChangeText={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                                value={formik.values.username}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>รหัสผ่าน</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="รหัสผ่าน"
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                value={formik.values.password}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>ยืนยันรหัสผ่าน</FormControl.Label>
                            <Input
                                type="password"
                                placeholder="ยืนยันรหัสผ่าน"
                                onChangeText={formik.handleChange('re_password')}
                                onBlur={formik.handleBlur('re_password')}
                                value={formik.values.re_password}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>ชื่อ</FormControl.Label>
                            <Input
                                placeholder="ชื่อ"
                                onChangeText={formik.handleChange('firstName')}
                                onBlur={formik.handleBlur('firstName')}
                                value={formik.values.firstName}
                            />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>สกุล</FormControl.Label>
                            <Input
                                placeholder="สกุล"
                                onChangeText={formik.handleChange('lastName')}
                                onBlur={formik.handleBlur('lastName')}
                                value={formik.values.lastName}
                            />
                        </FormControl>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    {
                        (isLoading)
                            ? <Spinner />
                            : (
                                <Button.Group space={2}>
                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                        formik.resetForm();
                                        onClose();
                                    }}>
                                        ยกเลิก
                                    </Button>
                                    <Button colorScheme="blue" onPress={formik.handleSubmit}>
                                        เพิ่ม
                                    </Button>
                                </Button.Group>
                            )
                    }
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}

export default CreateUserModal;