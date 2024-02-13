import React from 'react'
import styles from './styles.module.scss'
import RippleContainer from 'shared/ui/rippleEffectContainer'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch } from 'hooks/reduxHooks'
import { deleteProduct } from 'entities/Establishment/api'
import { Tovar } from 'entities/Tovar/Tovar'
import { deleteItem } from 'entities/Tovar/categorySlice'


interface ContextMenuProps {
    product:Tovar;
    menuPosition: { x: number, y: number },
    closeMenu:()=>void
}
const ContextMenu: React.FC<ContextMenuProps> = ({ menuPosition,product,closeMenu }) => {
    const dispatch = useAppDispatch()
    const contextMenu = [{
        title: "Delete",
        icon: <MdDelete color='red'></MdDelete>,
        onClick: async () => {
            console.log('asdasdasd');
            
            const res = await dispatch(deleteProduct({productId:product.id||0}))
            console.log(res);
            
            dispatch(deleteItem(product))
            closeMenu()
        }
    }]

    return (
        <div
            id='context-menu'
            className={styles.contextMenu}
            style={{ position: 'absolute', top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
        >
            {contextMenu.map((option, index) => (
                <RippleContainer key={index} className={styles.contextMenuItem} onClick={option.onClick}>
                    <span className={styles.contextMenuText}>{option.title}</span>
                    {option.icon}
                </RippleContainer>
            ))}
        </div>
    )
}

export default ContextMenu