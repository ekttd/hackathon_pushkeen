// src/SomeComponent.js
import React, { useEffect } from 'react';
import { useUser } from './UserContext';
import axios from 'axios';

const SomeComponent = () => {
    const { setUser } = useUser();

    useEffect(() => {
        axios.get('http://localhost:5000/get_user_code')
            .then(response => {
                setUser({ code: response.data.code });
            })
            .catch(error => console.error('Error fetching user code:', error));
    }, [setUser]);

    return <div>Some Content</div>;
};

export default SomeComponent;
