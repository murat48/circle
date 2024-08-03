// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response.data.users);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const addUser = () => {
        axios.post('http://localhost:3001/api/users', { name, email })
            .then(response => {
                setUsers([...users, { id: response.data.id, name, email }]);
                setName('');
                setEmail('');
            })
            .catch(error => {
                console.error('Error adding user:', error);
            });
    };

    return (
        <div className="App">
            <h1>Kullanıcı Listesi</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} ({user.email})</li>
                ))}
            </ul>
            <h2>Kullanıcı Ekle</h2>
            <input
                type="text"
                placeholder="Ad"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={addUser}>Ekle</button>
        </div>
    );
}

export default App;
