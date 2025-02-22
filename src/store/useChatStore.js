import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import socket from "../socket"; // ✅ Import WebSocket instance

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      // ✅ Subscribe to WebSocket messages when user is selected
      socket.emit("joinRoom", userId);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

      set({ messages: [...messages, res.data] });

      // ✅ Emit message to WebSocket server (Real-time Update)
      socket.emit("sendMessage", res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  subscribeToMessages: () => {
    console.log("📡 Listening for new messages...");
    socket.on("newMessage", (newMessage) => {
      console.log("📩 New Message Received: ", newMessage);

      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  unsubscribeFromMessages: () => {
    console.log("❌ Unsubscribing from WebSocket messages...");
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] });

    // ✅ Join WebSocket Room when user is selected
    if (selectedUser) {
      socket.emit("joinRoom", selectedUser._id);
    }
  },
}));
