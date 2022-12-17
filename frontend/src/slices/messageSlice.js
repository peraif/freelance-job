import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { removeChannel, getData } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const removeChannelId = action.payload;
        const allEntities = Object.values(state.entities);
        const deleteMessageId = allEntities
          .filter((e) => e.channelId === removeChannelId.id)
          .map((e) => e.id);
        messagesAdapter.removeMany(state, deleteMessageId);
      })
      .addCase(getData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const getMessage = (state) => selectors.selectAll(state);

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
