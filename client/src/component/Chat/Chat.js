import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {serverLocation} from '../../const/Constants';
import styles from './Chat.module.scss';

const socket = io(serverLocation, {
    withCredentials: true,
});

const Chat = ({ referenceId }) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [threadId, setThreadId] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {

        axios.get(`api/thread/${referenceId}/Event`).then(response => {
            setMessages(response.data.messages);
            setThreadId(response.data.threadId);
        }).catch(error=>console.log(error));

        socket.emit('joinThread', threadId);


        socket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [threadId]);

    const sendMessage = () => {
        socket.emit('newMessage', { threadId, userId, text: newMessage });
        setNewMessage('');
    };

    return (
        <div className='d-flex flex-column justify-content-end'>
            <div className="d-flex flex-column justify-content-end align-items-start" style={{height: "500px",overflow: "auto"}}>
                {messages.map((msg) => (
                    <div key={msg._id} className={`${styles.messageBox} ${msg.sender._id === userId ? styles.myMessage : styles.otherUserMessage}`}>
                        <strong>{msg.sender.name}</strong>: {msg.text}
                    </div>
                ))}
            </div>
            <div className='d-flex mt-4'>
                <input className="form-control" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" />
                <button className="btn btn-primary mx-2" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;