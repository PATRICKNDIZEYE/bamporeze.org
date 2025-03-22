'use client'

import { useRouter } from "next/navigation"
import React, { FC, createContext, useEffect, useState } from "react"
import { axios } from "../utils/axios.config"

export interface IUser {
    id: string,
    email: string,
    name: string
    profile_picture: string
}

export interface IAuth {
    user: IUser | null,
    setUser: (user: IUser | null) => void,
    token: string | null,
    setToken: (token: string) => void,
    isLoggedIn: boolean,
    setIsLoggedIn: (vaue: boolean) => void,
    login: (email: string, password: string) => Promise<void>,
    logout: () => void
}



export const AuthContext = createContext<IAuth>({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    login: async () => { },
    logout: () => { },
})


export const AuthCtxProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter()

    const [token, setToken] = useState<string | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)

    const login = async (email: string, password: string) => {
        try {
            const res = await axios.post('/auth/login', { email, password })
            if (res.status == 200) {
                const { admin, token } = res.data
                setUser(admin)
                localStorage.setItem('admin', JSON.stringify(admin))
                setToken(token)
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                setIsLoggedIn(true)
                router.push('/p/analytics')
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        setIsLoggedIn(false)
        setUser(null)
        setToken(null)
        router.push('/')
    }


    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         const token = localStorage.getItem('token')
    //         const admin = localStorage.getItem('admin')
    //         if (token && admin) {
    //             setUser(JSON.parse(admin))
    //             setToken(token)
    //             setIsLoggedIn(true)
    //         } else {
    //             router.push('/')
    //         }
    //     }
    // }, [isLoggedIn])



    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() { return React.useContext(AuthContext) } 