import React, { createContext, useContext, useMemo } from 'react';
import store from '../slices/store';
import { changeCurrentChannelID } from '../slices/channelsSlice';

export const ApiContext = createContext({});

export const useApi = () => useContext(ApiContext);
export const ApiProvider = ({ children, value }) => {
  const { socket } = value;

  const socketEmit = useMemo(() => ({
    sendNewMessage: (message) => socket.emit('newMessage', message),
    addNewChannel: (newChannel) => socket.emit('newChannel', newChannel, (res) => {
      if (res.status === 'ok') {
        store.dispatch(changeCurrentChannelID((res.data.id)));
      }
    }),
    deleteChannel: (currentChannel) => socket.emit('removeChannel', currentChannel),
    fnRenameChannel: ({ id, name: renameChannel }) => socket.emit('renameChannel', { id, name: renameChannel }),
  }), [socket]);

  return (
    <ApiContext.Provider value={socketEmit}>
      {children}
    </ApiContext.Provider>
  );
};
