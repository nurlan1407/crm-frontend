import React from 'react'
import ReactDom from 'react-dom'
import './index.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LoginPage } from 'pages/Login'
import Dashboard from 'pages/Dashboard/ui/Dashboard'
import Inventory from 'pages/Inventory/ui'
import { Provider } from 'react-redux';
import { store } from 'store/store'
import { useAlert } from 'hooks/useAlert'
import App from 'app'

const root = document.getElementById('root')
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App></App>
        </BrowserRouter>
    </Provider>
    ,
    root
)
