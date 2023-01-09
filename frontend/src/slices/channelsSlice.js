/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';
import config from '../components/common/Config';

export const getData = createAsyncThunk(
  'channels/getData',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(routes.usersPath(), { headers: payload });
      return res.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = {
  ...channelsAdapter.getInitialState({
    status: 'idle',
    messages: [],
    error: null,
  }),
  activeChannelID: config.INITIAL_CHANNEL_ID,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeCurrentChannelID: (state, { payload }) => ({
      ...state,
      activeChannelID: payload,
    }),
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      if (payload.id === state.activeChannelID) {
        state.activeChannelID = config.INITIAL_CHANNEL_ID;
      }
      return channelsAdapter.removeOne(state, payload.id);
    },
    renameChannel: (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id,
      changes: { name: payload.name },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { channels, messages } = payload;
        channelsAdapter.setAll(state, channels);
        state.status = 'idle';
        state.messages = messages;
      })
      .addCase(getData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getData.rejected, (state, { payload }) => {
        const { statusCode } = payload;
        state.error = statusCode;
      });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);

export const getChannels = (state) => selectors.selectAll(state);
export const namesChannelsSelector = (state) => selectors.selectAll(state).map((it) => it.name);
export const getActiveChannel = (state) => state.channels.activeChannelID;
export const currentChatSelector = (state) => selectors
  .selectAll(state)
  .filter((channel) => channel.id === state.channels.activeChannelID);
export const channelsErrorSelector = (state) => state.channels.error;
export const currentChannelsSelector = (state, item) => selectors.selectAll(state)
  .find((it) => it.id === item);

export const {
  addChannel,
  removeChannel,
  renameChannel,
  changeCurrentChannelID,
} = channelsSlice.actions;
export default channelsSlice.reducer;
