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
    }


}))


export default useAuthStore;
