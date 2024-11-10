import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {serverLocation} from '../../const/Constants';

const socket = io(serverLocation, {
    withCredentials: true,
});

const Chat = ({ referenceId }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [threadId, setThreadId] = useState(0);

    useEffect(() => {
        socket.emit('joinThread', referenceId);

        axios.get(`/thread/${referenceId}`).then(response => {
            setMessages(response.data.messages);
            setThreadId(response.data.threadId)
        });

        socket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [threadId]);

    const sendMessage = () => {
        socket.emit('newMessage', { threadId, text: newMessage });
        setNewMessage('');
    };

    return (
        <div>
            <div className="message-list">
                {messages.map((msg) => (
                    <div key={msg._id} className="message">
                        <strong>{msg.sender.name}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;