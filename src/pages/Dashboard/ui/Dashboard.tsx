import React, { useState, useEffect } from 'react'
import IconButton from 'shared/ui/iconButton';
import cls from './dashboard.module.scss';
import RippleContainer from 'shared/ui/rippleEffectContainer';
import RippleEffect from 'shared/lib/rippleEffect';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosNotifications } from "react-icons/io";
import { MdDashboard, MdInventory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRegFaceGrinStars } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import EditProfile from 'pages/EditProfile/ui';
import Inventory from 'pages/Inventory/ui';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { RootState } from 'store/store';
import { ThunkAction, unwrapResult } from '@reduxjs/toolkit';
import { getEst } from 'entities/Establishment/api';
import EditProfileSidebar from 'features/editProfile/ui/sidebar';
import { toggleSidebar } from 'entities/Establishment/establishmentSlice';

const Dashboard = () => {
    const establishment = useAppSelector((state: RootState) => state.establishment.establishment)
    const isEditing = useAppSelector((state:RootState)=>state.establishment.isEditing)
    const dispatch = useAppDispatch()
    const toggleSidebarShow = () =>{
        dispatch(toggleSidebar())
    }
    const [isSidebarOpened, setIsSidebarOpened] = useState(false)
    const onBurgerClick = () => {
        const navigation = document.getElementById('sidebar')
        navigation?.classList.add(cls.active)
        navigation!.style.zIndex = '3'
        setIsSidebarOpened(true)
    }
    const onSidebarClose = () => {
        const navigation = document.getElementById('sidebar')
        navigation?.classList.remove(cls.active)
        setTimeout(() => {
            navigation!.style.zIndex = '1'
        }, 170)
        setIsSidebarOpened(false)
    }
    useEffect(() => {
        try {
            const result =  dispatch(getEst())
        } catch (e) {
        }
    }, [])
    useEffect(()=>{
        isEditing ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset" 
    },[isEditing])
    
    return (
        <div className={cls.page}>
            <header className={cls.nav}>
                <IconButton onClick={onBurgerClick}>
                    <GiHamburgerMenu size={'2rem'} color='white' />
                </IconButton>
                <h1 className={`${cls['nav-header']} ${isSidebarOpened && cls.active}`}>Dashboard</h1>
                <IconButton className={cls['notification-btn']}>
                    <IoIosNotifications size={'2rem'} color='white' />
                </IconButton>
            </header>
            <aside id='sidebar' className={cls['sidebar-container']}>
                <div className={cls['sidebar-header']} >
                    <IconButton className={cls['header-back']} onClick={onSidebarClose}>
                        <IoIosArrowBack color='white' size={'1.5rem'} />
                    </IconButton>
                </div>
                <ul className={cls['sidebar-list']}>
                    <div className={cls['sidebar-list-item']} onMouseDown={RippleEffect}>
                        <MdDashboard size='2rem'></MdDashboard>
                        <span>Dashboard</span>
                    </div>
                    <div className={cls['sidebar-list-item']} onMouseDown={RippleEffect}>
                        <FaUsers size='2rem'></FaUsers>
                        <span>Customers</span>
                    </div>
                    <div className={cls['sidebar-list-item']} onMouseDown={RippleEffect}>
                        <FaCartShopping size='2rem'></FaCartShopping>
                        <span>Orders</span>
                    </div>
                    <div className={cls['sidebar-list-item']} onMouseDown={RippleEffect}>
                        <MdInventory size='2rem'></MdInventory>
                        <span>Inventory</span>
                    </div>
                    <div className={cls['sidebar-list-item']} onMouseDown={RippleEffect}>
                        <FaRegFaceGrinStars size='2rem'   ></FaRegFaceGrinStars>
                        <span>bonuses</span>
                    </div>
                </ul>

            </aside>
            <EditProfileSidebar isShown={isEditing} onClose={toggleSidebarShow}></EditProfileSidebar>

            <div className='wrapper'>
                <main className={`${cls.main} ${isSidebarOpened && cls.active}`}>
                    {establishment && <EditProfile establishment={establishment}></EditProfile> }
                    {/* <Inventory></Inventory> */}
                </main>
            </div>
        </div>
    )
}

export default Dashboard