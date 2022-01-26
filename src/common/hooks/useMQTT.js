import { useState, useEffect } from 'react';
import MQTT from 'sp-react-native-mqtt';
import uuid from 'react-native-uuid';

import { electrics } from '../mocks';

const MQTT_SERVER = 'broker.emqx.io';
const MQTT_PORT = 1883;
const MQTT_CLIENT_ID = uuid.v4();
const MQTT_TOPIC = '/ElectroWatch';

const useMQTT = () => {
    const [client, setClient] = useState(null);
    const [message, setMessage] = useState(electrics());

    useEffect(() => {
        if (client)
            return;

        initialMQTT();

        return () => {
            if (!client)
                return;

            client.disconnect();
            setClient(null);
        }
    }, []);

    const initialMQTT = async () => {
        try {
            const client = await MQTT.createClient({
                uri: `mqtt://${MQTT_SERVER}:${MQTT_PORT}`,
                MQTT_CLIENT_ID
            });

            client.on('closed', () => console.log('MQTT Closed'));
            client.on('error', (message) => console.log('MQTT Error', message));
            client.on('message', (message) => {
                setMessage(JSON.parse(message.data));
            });
            client.on('connect', () => {
                console.log('MQTT Connected');
                client.subscribe(MQTT_TOPIC, 0);
            });

            const clientHelpers = {
                subscribe: (topic) => { client.subscribe(topic, 0); },
                publish: (payload) => { client.publish(MQTT_TOPIC, payload, 0, false); }
            }

            setClient(clientHelpers);
            client.connect();
        } catch (error) {
            console.log(error);
        }
    }

    return [client, message];
}

export default useMQTT;