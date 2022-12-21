/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './components/Channels';
import Messages from './components/Messages';
import {
  getData,
  getChannels,
  getActiveChannel,
  currentChatSelector,
  currentMessagesSelector,
  channelsErrorSelector,
} from '../../../slices/channelsSlice';
import { useAuth } from '../../../contexts/AuthContext';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthToken, logOut } = useAuth();
  const dataChannels = useSelector(getChannels);
  const currentChannelID = useSelector(getActiveChannel);
  const currentChat = useSelector(currentChatSelector);
  const currentMessages = useSelector(currentMessagesSelector);
  const channelsError = useSelector(channelsErrorSelector);

  useEffect(() => {
    dispatch(getData(getAuthToken()));
  }, [dispatch, getAuthToken]);

  useEffect(() => {
    if (channelsError && channelsError === 401) {
      logOut();
    }
  }, [channelsError]);
  // debugger;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={dataChannels} currectChannelID={currentChannelID} />
        <Messages messages={currentMessages} currentChannelID={currentChannelID} currentChatName={currentChat[0]?.name} />
      </div>
    </div>
  );
};
export default HomePage;
