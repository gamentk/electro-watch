export const error = (voltageMode, currentMode, isCutout) => {
    if (isCutout) {
        return [
            {
                title: 'Alarm Error',
                value: 'Black Out',
                unit: null
            },
            {
                title: 'VT/CT Ratio',
                value: '0 V/0 A',
                unit: null
            },
            {
                title: 'วันที่แจ้งเตือน M/D/Y',
                value: '1/5/2022',
                unit: null
            },
            {
                title: 'เวลา',
                value: '08:34',
                unit: 'น.'
            }
        ];
    } else if (voltageMode === 2) {
        return [
            {
                title: 'Alarm Error',
                value: 'Voltage Drop',
                unit: null
            },
            {
                title: 'VT/CT Ratio',
                value: 207,
                unit: 'V'
            },
            {
                title: 'วันที่แจ้งเตือน M/D/Y',
                value: '1/5/2022',
                unit: null
            },
            {
                title: 'เวลา',
                value: '08:34',
                unit: 'น.'
            }
        ];
    } else if (voltageMode === 3) {
        return [
            {
                title: 'Alarm Error',
                value: 'Over Voltage',
                unit: null
            },
            {
                title: 'VT/CT Ratio',
                value: 250,
                unit: 'V'
            },
            {
                title: 'วันที่แจ้งเตือน M/D/Y',
                value: '1/5/2022',
                unit: null
            },
            {
                title: 'เวลา',
                value: '08:34',
                unit: 'น.'
            }
        ];
    } else if (currentMode === 2) {
        return [
            {
                title: 'Alarm Error',
                value: 'Over Current',
                unit: null
            },
            {
                title: 'VT/CT Ratio',
                value: 45,
                unit: 'A'
            },
            {
                title: 'วันที่แจ้งเตือน M/D/Y',
                value: '1/5/2022',
                unit: null
            },
            {
                title: 'เวลา',
                value: '08:34',
                unit: 'น.'
            }
        ];
    }
}