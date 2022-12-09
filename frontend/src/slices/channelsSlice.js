/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes/routes';

export const getData = createAsyncThunk('channels/getData', async (payload) => {
  const res = await axios.get(routes.usersPath(), { headers: payload });
  return res.data;
});

const channelsAdapter = createEntityAdapter();
const initialState = {
  ...channelsAdapter.getInitialState(),
  id: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannelID: (state, { payload }) => ({ ...state, id: payload }),
    AddChannel: channelsAdapter.addOne,
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
export const getActiveChannel = (state) => state.channels.id;

export const {
  AddChannel, removeChannel, renameChannel, changeChannelID,
} = channelsSlice.actions;
export default channelsSlice.reducer;
