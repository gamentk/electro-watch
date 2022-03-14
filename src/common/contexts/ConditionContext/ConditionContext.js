import React, { useState, createContext, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConditionContext = createContext({});

export const useConditionContext = () => {
    return useContext(ConditionContext);
}

const ConditionProvider = ({ children }) => {
    const [voltMin, setVoltMin] = useState(0);
    const [voltMax, setVoltMax] = useState(0);
    const [currentMax, setCurrentMax] = useState(0);

    useEffect(() => {
        getConditionFromStorage();
    }, []);

    useEffect(() => {
        saveConditionToStorage();
    }, [voltMin, voltMax, currentMax]);

    const saveConditionToStorage = async () => {
        try {
            const condition = { voltMin, voltMax, currentMax };
            const jsonStringCondition = JSON.stringify(condition);

            await AsyncStorage.setItem('condition', jsonStringCondition);
        } catch (error) {
            console.log(error);
        }
    }

    const getConditionFromStorage = async () => {
        try {
            const condition = await AsyncStorage.getItem('condition');

            if (condition !== null) {
                const { voltMin, voltMax, currentMax } = JSON.parse(condition);
                setVoltMin(voltMin);
                setVoltMax(voltMax);
                setCurrentMax(currentMax);
            } else {
                throw [208, 240, 40];
            }
        } catch (defaultValues) {
            setVoltMin(defaultValues[0]);
            setVoltMax(defaultValues[1]);
            setCurrentMax(defaultValues[2]);
        }
    }

    const store = {
        voltMin,
        voltMax,
        currentMax,
        actions: {
            setVoltMin,
            setVoltMax,
            setCurrentMax
        }
    };

    return (
        <ConditionContext.Provider value={store}>
            {children}
        </ConditionContext.Provider>
    );
}

export default ConditionProvider;