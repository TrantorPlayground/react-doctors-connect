import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    chatWindow: {
      uid: null,
      receiver: null,
    },
  },
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
    onChatOpen: (state, action) => {
      state.chatWindow.uid = action.payload.uid;
      state.chatWindow.receiver = action.payload.receiver;
    },
  },
});
export const {
  onMessageTyping,
  onMessageTypingEnd,
  onMessageSend,
  onMessageReceive,
  onChatClose,
  onChatOpen,
} = messageSlice.actions;
export default messageSlice.reducer;
