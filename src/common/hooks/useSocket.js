import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = ({ enabled }) => {
    const ref = useRef();
    const [message, setMessage] = useState({});

    useEffect(() => {
        if (!enabled) return;

        const socket = io('https://electrowatch-server.herokuapp.com/');

        socket.on('connect', () => console.log('socket connected'));
        socket.on('monitoring', message => setMessage(message));
        socket.on('disconnect', () => console.log('socket disconnected'));

        ref.current = socket;

        return () => socket.disconnect();
    }, [enabled]);

    return message;
}

export default useWebSocket;