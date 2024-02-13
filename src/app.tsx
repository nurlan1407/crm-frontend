import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from 'pages/Login'
import Dashboard from 'pages/Dashboard/ui/Dashboard'
import Inventory from 'pages/Inventory/ui'
import { Provider } from 'react-redux';
import { store } from 'store/store'
import { useAlert } from 'hooks/useAlert'
import { AlertProvider } from 'hooks/AlertProvider'

const App = () => {
    const { AlertComponent } = useAlert()

    return (
        <AlertProvider>
            <Routes>
                <Route path="login" element={<LoginPage />}></Route>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path='inventory' element={<Inventory />}></Route>
            </Routes>
        </AlertProvider>           
    )
}

export default App