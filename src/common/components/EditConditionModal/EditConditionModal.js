import React, { useState } from 'react';
import {
    Modal,
    VStack,
    FormControl,
    Input,
    Select,
    Button,
    useToast,
    Spinner,
    HStack
} from 'native-base';
import { useFormik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useConditionContext } from '../../contexts/ConditionContext/ConditionContext';

const EditConditionModal = ({ isOpen, onClose }) => {
    const toast = useToast();
    const {
        voltMin,
        voltMax,
        currentMax,
        actions: {
            setVoltMin,
            setVoltMax,
            setCurrentMax
        }
    } = useConditionContext();

    const handleSubmitCondition = ({ voltMin, voltMax, currentMax }) => {
        setVoltMin(Number(voltMin));
        setVoltMax(Number(voltMax));
        setCurrentMax(Number(currentMax));

        toast.show({
            title: 'แก้ไขเงื่อนไขสำเร็จ',
            status: 'success',
            placement: 'top'
        });
        onClose();
    }

    const formik = useFormik({
        initialValues: {
            voltMin: `${voltMin}`,
            voltMax: `${voltMax}`,
            currentMax: `${currentMax}`
        },
        onSubmit: handleSubmitCondition,
        enableReinitialize: true
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} animationPreset="slide">
            <Modal.Content size="lg" marginTop="auto" marginBottom={0}>
                <Modal.CloseButton />
                <Modal.Header>
                    แก้ไชเงื่อนไข
                </Modal.Header>
                <Modal.Body>
                    <VStack space="4">
                        <HStack space="4">
                            <FormControl flex={1}>
                                <FormControl.Label>Voltage Min</FormControl.Label>
                                <Input
                                    placeholder="Voltage Min"
                                    keyboardType="number-pad"
                                    value={formik.values.voltMin}
                                    onChangeText={formik.handleChange('voltMin')}
                                    onBlur={formik.handleBlur('voltMin')}
                                />
                            </FormControl>
                            <FormControl flex={1}>
                                <FormControl.Label>Voltage Max</FormControl.Label>
                                <Input
                                    placeholder="Voltage Max"
                                    keyboardType="number-pad"
                                    value={formik.values.voltMax}
                                    onChangeText={formik.handleChange('voltMax')}
                                    onBlur={formik.handleBlur('voltMax')}
                                />
                            </FormControl>
                        </HStack>
                        <FormControl>
                            <FormControl.Label>Current Max</FormControl.Label>
                            <Input
                                placeholder="Current Max"
                                keyboardType="number-pad"
                                value={formik.values.currentMax}
                                onChangeText={formik.handleChange('currentMax')}
                                onBlur={formik.handleBlur('currentMax')}
                            />
                        </FormControl>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                            ยกเลิก
                        </Button>
                        <Button colorScheme="blue" onPress={formik.handleSubmit}>
                            เพิ่ม
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}

export default EditConditionModal;