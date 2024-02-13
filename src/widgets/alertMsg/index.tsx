import React from 'react'
import cls from './styles.module.scss'
import IconButton from 'shared/ui/iconButton'
import { IoIosClose } from "react-icons/io";
import { AlertType } from 'hooks/useAlert';
import { useAlertContext } from 'hooks/AlertProvider';

interface AlertProps {
    type: AlertType,
    message: string
}

const AlertMsg: React.FC<AlertProps> = ({ type, message }) => {
    const {closeAlert} = useAlertContext()
    return (
        <div className={`${cls.container} ${type=='success'?cls.success:''}`}>
            <div className={`${cls.container__header} ${type=='success'?cls.success:''}`}>
                <h2>{type==='error' ? 'An error occured' :'Success'}</h2>
                <IconButton onClick={closeAlert}>
                    <IoIosClose color='#fff' size={'2rem'}></IoIosClose>
                </IconButton>
            </div>
            <div className={cls.container__message}>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default AlertMsg