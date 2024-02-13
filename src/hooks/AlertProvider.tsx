import React, { ReactNode, createContext, useContext } from 'react'
import { useAlert } from './useAlert';
import { AlertType } from './useAlert';

interface AlertProviderProps {
    children: ReactNode
}
interface AlertContextType {
    showAlert: (type: AlertType, message: string) => void;
    closeAlert: () => void;
}

//default
const AlertContext = createContext<AlertContextType>({ showAlert: (type, message) => { }, closeAlert: () => { } });

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const { showAlert, AlertComponent,closeAlert } = useAlert()
    const ctxValue = { showAlert }
    //{} чтобы можно было так обращаться context.showAlert(тыры пыры) также тип ссотетсует интефейсу выше AlertContextType
    return (
    
        <AlertContext.Provider value={{showAlert,closeAlert}} >
            {children}
            {AlertComponent}
        </AlertContext.Provider>
    )
}

export const useAlertContext = () => useContext(AlertContext)


