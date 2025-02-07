import React, { useEffect } from 'react'
import Navber from './components/Navber'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

import useAuthStore from './store/userAuthStore'


const App = () => {

    const { authUser, cheackAuth, isCheckingAuth } = useAuthStore()

    useEffect(() => {
        cheackAuth()
    }, [])
    console.log(authUser)


    if (isCheckingAuth && !authUser) return (
        <div className='flex items-center h-screen justify-center'>
            <Loader className='size-10 animate-spin' />
        </div>
    )


    return (
        <div>
            <Navber />

            <Routes>
                <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
                <Route path='/sign' element={!authUser ? <SignupPage /> : <Navigate to='/' />} />
                <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />

            </Routes>
            <Toaster />

        </div>
    )
}

export default App