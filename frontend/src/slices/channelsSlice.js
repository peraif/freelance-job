/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const getData = createAsyncThunk('channels/getData', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.get(routes.usersPath(), { headers: payload });
    return res.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return rejectWithValue(error.response.data);
  }
});

const channelsAdapter = createEntityAdapter();
const initialState = {
  ...channelsAdapter.getInitialState(),
  id: 1,
  loading: false,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannelID: (state, { payload }) => ({ ...state, id: payload }),
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    renameChannel: (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id,
      changes: { name: payload.name },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.fulfilled, (state, { payload }) => {
        const { channels } = payload;
        console.log(getData);
        channelsAdapter.setAll(state, channels);
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const getChannels = (state) => selectors.selectAll(state);
export const namesChannelsSelector = (state) => selectors.selectAll(state).map((it) => it.name);
export const getActiveChannel = (state) => state.channels.id;
export const currentChatSelector = (state) => selectors.selectAll(state)
  .filter((channel) => channel.id === state.channels.id);

export const {
  addChannel, removeChannel, renameChannel, changeChannelID,
} = channelsSlice.actions;
export default channelsSlice.reducer;
