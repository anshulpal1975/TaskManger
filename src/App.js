import React from 'react';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import User from './components/User';
import Project from './components/Project';
import Task from './components/Task';

const MainApp = () => {
  const { state } = useTaskContext();

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <User />
      <Project />
      {state.projects.map(project => (
        <Task key={project.id} projectId={project.id} />
      ))}
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <MainApp />
  </TaskProvider>
);

export default App;
