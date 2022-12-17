import { React, createContext, useContext } from 'react';
import store from '../slices/store';
import { changeChannelID } from '../slices/channelsSlice';

export const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children, value }) => {
  const { socket } = value;

  const sendNewMessage = (message) => {
    socket.emit('newMessage', message);
  };

  const addNewChannel = (newChannel) => {
    socket.emit('newChannel', newChannel, (res) => {
      if (res.status === 'ok') {
        store.dispatch(changeChannelID((res.data.id)));
      }
    });
  };

  const deleteChannel = (currentChannel) => {
    socket.emit('removeChannel', currentChannel);
  };

  const fnRenameChannel = ({ id, name: renameChannel }) => {
    socket.emit('renameChannel', { id, name: renameChannel });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{
      sendNewMessage, addNewChannel, deleteChannel, fnRenameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};
