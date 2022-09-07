import { useState, createContext, useEffect } from "react";
import React from 'react'
import storage from "../async storage/asyncStorge";


export const Context = createContext();

export const Provider = (props) => {


    const [user, setUser] = useState({
        username: '',
        picUri: '',
    })

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [token, setToken] = useState('')

    const getDataFromAsyncStorage = (key) => {
        storage.load({
            key: key,
        }).then(res => {
            setToken(res.token)
            console.log(res.token)
            setUser({
                username: res.username,
                user_id: res.user_id,
                is_patient: res.is_patient
            })
            setIsAuthenticated(true)
        })
        .catch((err) => console.log('err from context getdata', err))
    }

    useEffect(() => {
        getDataFromAsyncStorage('user');
    }, [])

    return (
        <Context.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            token,
            setToken,
        }}>
            {props.children}
        </Context.Provider>
    )
}