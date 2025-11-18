import { createSlice } from "@reduxjs/toolkit";

interface Props {
  conversations: Array<ArtisanMessagesProps>;
}

const initialState: Props = {
  conversations: [],
};

const artisanMsgSlice = createSlice({
  name: "artisanMsgSlice",
  initialState: initialState,
  reducers: {
    addConversation: (state, action) => {
      const convoExists = state.conversations.find(
        (obj) => obj.id == action.payload.id
      );
      if (!convoExists) {
        state.conversations = [action.payload, ...state.conversations];
      }
      state.conversations = state.conversations.sort(
        (a, b) =>
          b.messages[b.messages.length - 1].time -
          a.messages[a.messages.length - 1].time
      );
    },
    sendNewMessage: (state, action) => {
      state.conversations = state.conversations.map((item) => {
        if (item.id == action.payload.parentId) {
          return { ...item, messages: [...item.messages, action.payload] };
        }
        return item;
      });
      state.conversations = state.conversations.sort(
        (a, b) =>
          b.messages[b.messages.length - 1].time -
          a.messages[a.messages.length - 1].time
      );
    },
    delArtisanConversation: (state) => {
      state.conversations = [];
    },
  },
});

export const { addConversation, sendNewMessage, delArtisanConversation } =
  artisanMsgSlice.actions;
export default artisanMsgSlice.reducer;
export const selectArtisanConvos = (state: any) =>
  state.ArtisanConvos.conversations;
