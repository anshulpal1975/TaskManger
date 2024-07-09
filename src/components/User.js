import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const User = () => {
  const { dispatch } = useTaskContext();
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('Developer');

  const addUser = () => {
    const newUser = {
      id: Date.now(),
      name,
      userType,
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    setName('');
  };

  return (
    <div>
      <h3>Add User</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
        <option value="Developer">Developer</option>
      </select>
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default User;
