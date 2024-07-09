import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Task = ({ projectId }) => {
  const { state, dispatch } = useTaskContext();
  const [taskName, setTaskName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const addTask = () => {
    if (state.currentUser?.userType !== 'Manager') {
      alert('Only Managers can create tasks.');
      return;
    }
    const newTask = {
      id: Date.now(),
      task: taskName,
      assignedTo,
      status: 'Not Started',
    };
    dispatch({ type: 'ADD_TASK', payload: { projectId, task: newTask } });
    setTaskName('');
    setAssignedTo('');
  };

  const updateTaskStatus = (taskId, status) => {
    if (state.currentUser?.userType !== 'Developer') {
      alert('Only Developers can update tasks.');
      return;
    }
    dispatch({ type: 'UPDATE_TASK_STATUS', payload: { projectId, taskId, status } });
  };

  const project = state.projects.find(project => project.id === projectId);

  return (
    <div>
      <h3>Tasks for {project?.name}</h3>
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign To</option>
        {state.users.map(user => (
          <option key={user.id} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      <button onClick={addTask}>Add Task</button>

      <ul>
        {project?.tasks.map(task => (
          <li key={task.id}>
            {task.task} - {task.assignedTo} - {task.status}
            {state.currentUser?.userType === 'Developer' && (
              <>
                <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>Start</button>
                <button onClick={() => updateTaskStatus(task.id, 'Completed')}>Complete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
