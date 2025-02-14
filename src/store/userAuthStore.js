import { create } from "zustand"
import api from "../lib/axios"
import toast from "react-hot-toast";

const useAuthStore = create((set) => ({
    authUser: null,
    isSingningup: false,
    islogin: false,
    isupdateProfile: false,

    isCheckingAuth: true,


    cheackAuth: async () => {
        try {
            const res = await api.get('/auth/profile');
            console.log(res.data)
            set({ authUser: res.data })
        }
        catch (err) {
            console.log("Erro in CheacjAuth: ", err)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },
    login: async (data) => {
        try {
            const res = await api.post('/auth/login', data);
            set({ authUser: res.data })
            toast.success("Account Login successfully");
            localStorage.setItem('token', response.data.token);

        }
        catch (err) {

            toast.error(err.response.data.message)
        }
        finally {
            set({ isSingningup: false })
        }
    },

    signup: async (data) => {
        try {
            const res = await api.post("/auth/register", data)
            set({ authUser: res.data })
            toast.success("Account create successfully");
        }
        catch (err) {
            console.log()
            toast.error(err.response.data.message)
        }
        finally {
            set({ isSingningup: false })
        }
    },

    logout: async () => {
        try {
            set({ authUser: null });
            toast.success("Logged out successfully")
        }
        catch (err) {
            console.log(err);
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            },
        });
        socket.connect();

        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect();
    },
}))


export default useAuthStore;
