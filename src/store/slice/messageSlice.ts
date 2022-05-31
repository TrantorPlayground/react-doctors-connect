import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    onMessageTyping: (state, action) => {
      // TODO
    },
    onMessageTypingEnd: (state, action) => {
      // TODO
    },
    onMessageSend: (state, action) => {
      // TODO
    },
    onMessageReceive: (state, action) => {
      // TODO
    },
    onChatClose: (state, action) => {
      // TODO
    },
  },
});
export const {
  onMessageTyping,
  onMessageTypingEnd,
  onMessageSend,
  onMessageReceive,
  onChatClose,
} = messageSlice.actions;
export default messageSlice.reducer;
