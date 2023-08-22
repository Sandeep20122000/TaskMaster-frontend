import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { TasksContextsProvider } from './context/taskContext';
import { UserContextProvider } from './context/userContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <UserContextProvider>
        <TasksContextsProvider>
          <App />
        </TasksContextsProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);


