import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messageSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
