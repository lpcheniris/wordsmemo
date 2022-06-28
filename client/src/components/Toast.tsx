import React, { useState } from 'react'
import styles from './Toast.module.css'
interface ToastInterface {
    type: string,
    text: string,
    display: boolean
}
const initToast:ToastInterface = {
    type: 'error',
    text: 'this is error',
    display: false
}
const ToastContext = React.createContext({
    toast: initToast,
    updateToast: function(data:any):void{}
});

export  function ToastProvider({children}:any) {
    const [toastData, setToastData ] = useState(initToast)
    const updateToast = (data:ToastInterface) => {
        setToastData(data)
        setTimeout(() => {
            setToastData(Object.assign(toastData, {display: false}))
        }, 1000)
    }
    console.log(toastData)
    return <ToastContext.Provider value={{toast:toastData, updateToast}}>
        {children}
        {<div className={[styles.toast, toastData.display ? styles.toastAppear : styles.toastDisappear].join(" ")}>{toastData.text}</div>}
    </ToastContext.Provider>
    
}

export const useToast = () => React.useContext(ToastContext)

