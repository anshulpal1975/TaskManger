import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Project = () => {
  const { state, dispatch } = useTaskContext();
  const [projectName, setProjectName] = useState('');

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: projectName,
      tasks: [],
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
    setProjectName('');
  };

  return (
    <div>
      <h3>Add Project</h3>
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={addProject}>Add Project</button>
    </div>
  );
};

export default Project;
