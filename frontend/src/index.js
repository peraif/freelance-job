/* eslint-disable import/named */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const init = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const project = await App(socket);
  root.render(<React.StrictMode>{project}</React.StrictMode>);
};

init();
