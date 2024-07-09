import React, { createContext, useReducer, useContext, useEffect } from 'react';

const TaskContext = createContext();

const initialState = {
  users: [],
  projects: [],
  currentUser: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'ADD_TASK':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, tasks: [...project.tasks, action.payload.task] }
            : project
        ),
      };
    case 'UPDATE_TASK_STATUS':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? {
                ...project,
                tasks: project.tasks.map(task =>
                  task.id === action.payload.taskId
                    ? { ...task, status: action.payload.status }
                    : task
                ),
              }
            : project
        ),
      };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Set a current user for demonstration purposes
    const demoUser = {
      id: 1,
      name: 'John Doe',
      userType: 'Manager', // Ensure this user is a Manager for testing purposes
    };
    dispatch({ type: 'SET_CURRENT_USER', payload: demoUser });
  }, [dispatch]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
