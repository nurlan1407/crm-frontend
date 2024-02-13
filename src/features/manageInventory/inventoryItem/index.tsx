import React, { useState, useRef } from 'react'
import styles from './styles.module.scss'
import IconButton from 'shared/ui/iconButton'
import { IoMdMore } from "react-icons/io";
import { Tovar } from 'entities/Tovar/Tovar';
import { getImageUrl } from 'shared/lib/discountCalculator';



interface InventoryItemProps {
    item:Tovar
    onActionBtnClick: (e: any, item:Tovar) => void,
    onClick:(item:Tovar)=>void
}



const InventoryItem: React.FC<InventoryItemProps> = ({
     onActionBtnClick, item,onClick
}) => {


    return (
        <div className={styles.inventoryItem} onClick={()=>onClick(item)}>
            <IconButton className={styles.btn} onClick={e => onActionBtnClick(e,item)}>
                <IoMdMore size={'30px'}></IoMdMore>
            </IconButton>
            <img src={getImageUrl(item.img)} width={'100%'} height={170}></img>
            <h5>{item.name}</h5>
            <p className={styles.description}>{item.description}</p>
            <div className={styles.additional}>
                <p>{item.category?.name}</p>
                <p>{item.price}</p>
            </div>

        </div>
    )
}

export default InventoryItem