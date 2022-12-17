/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default-member */
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './Channels';
import Message from './Messages';
import { getMessage } from '../../slices/messageSlice';
import {
  getData, getChannels, getActiveChannel,
} from '../../slices/channelsSlice';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const dispatch = useDispatch();
  const { getAuthToken } = useAuth();

  useEffect(() => {
    dispatch(getData(getAuthToken()));
  }, [dispatch, getAuthToken]);

  const dataChannels = useSelector(getChannels);
  const dataMessages = useSelector(getMessage);
  const dataСurrentID = useSelector(getActiveChannel);

  const forrectMessage = dataMessages.filter((item) => item.channelId === dataСurrentID);
  const correctChat = dataChannels.filter((item) => item.id === dataСurrentID);
  const correctChatName = correctChat[0]?.name;
  // eslint-disable-next-line no-debugger
  // debugger;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={dataChannels} currectChannelID={dataСurrentID} />
        <Message message={forrectMessage} currectChannelID={dataСurrentID} correctChatName={correctChatName} />
      </div>
    </div>
  );
};
export default HomePage;
