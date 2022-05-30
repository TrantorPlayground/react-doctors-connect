import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    onMessageTyping: (state, action) => {

    },
    onMessageTypingEnd: (state, action) => {},
    onMessageSend: (state, action) => {},
    onMessageReceive: (state, action) => {},
    onChatClose: (state, action) => {},
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
