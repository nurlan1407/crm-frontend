import React, { useState, useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import IconButton from 'shared/ui/iconButton'
import AlertMsg from 'widgets/alertMsg'

export type AlertType = 'error' | 'success' | ''

export const useAlert = () => {
    const [alert, setAlert] = useState<{ show: boolean, type: AlertType, message: string }>({ show: false, type: 'error', message: '' });
    useEffect(() => {                
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert])

    const showAlert = (type: AlertType, message: string) => {
        setAlert({ show: true, type: type, message: message })
    }
    const closeAlert = () =>{
        setAlert({show:false, type:'', message:''})
    }
    const AlertComponent = alert.show ? (
        createPortal(<AlertMsg type={alert.type} message={alert.message}></AlertMsg>, document.getElementById('root')!)
    ) : null

    return { showAlert, AlertComponent,closeAlert }
}

