/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './components/Channels';
import Message from './components/Messages';
import { getMessage } from '../../../slices/messageSlice';
import {
  getData, getChannels, getActiveChannel, currentChatSelector,
} from '../../../slices/channelsSlice';
import { useAuth } from '../../../contexts/AuthContext';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthToken } = useAuth();
  const dataChannels = useSelector(getChannels);
  const dataMessages = useSelector(getMessage);
  const dataCurrentID = useSelector(getActiveChannel);
  const currentChat = useSelector(currentChatSelector);
  const currentMessage = dataMessages.filter((item) => item.channelId === dataCurrentID);

  useEffect(() => {
    dispatch(getData(getAuthToken()));
  }, [dispatch, getAuthToken]);

  // eslint-disable-next-line no-debugger
  // debugger;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {dataChannels.loading ? <div>Loading...</div> : <Channels channels={dataChannels} currectChannelID={dataCurrentID} />}
        <Message message={currentMessage} currectChannelID={dataCurrentID} correctChatName={currentChat[0]?.name} />
      </div>
    </div>
  );
};
export default HomePage;
