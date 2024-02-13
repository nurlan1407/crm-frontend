import React, { useState, useEffect, useRef } from 'react'
import RippleContainer from 'shared/ui/rippleEffectContainer';
import styles from '../createItem/ui/styles.module.scss'

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import IconButton from 'shared/ui/iconButton';
import { Category } from 'entities/Tovar/Tovar';

interface SelectCategoryProps {
    onSelect: (category: Category) => void;
    activeCategory: number | null;
    categoryList: Category[];

}

const SelectCategory: React.FC<SelectCategoryProps> = (props) => {
    const { onSelect, categoryList, activeCategory } = props
    const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false)
    const ctxMenuRef = useRef<HTMLDivElement>(null);

    const toggleContextMenu = (event: any) => {
        event.preventDefault();
        setContextMenuVisible(!contextMenuVisible)
    };
    const onCategorySelected = (item: Category) => {
        onSelect(item)
        setContextMenuVisible(false)
    };
    useEffect(() => {
        const onOutsideClick = (event: MouseEvent) => {
            if (ctxMenuRef.current && !ctxMenuRef.current.contains(event.target as Node)) {
                setContextMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', onOutsideClick);

        return () => {
            document.removeEventListener('mousedown', onOutsideClick);
        };
    }, [])

    return (
        <div className={styles.categoryContainer}>
            <div className={styles.activeCategory}>
                <span> {categoryList.find(item => item.id === activeCategory)?.name || 'Not Selected'}</span>
                <IconButton className={styles.icon} onClick={toggleContextMenu}>
                    {contextMenuVisible ? <IoIosArrowUp color='#000' size={'1.5rem'}></IoIosArrowUp> : <IoIosArrowDown color='#000' size={'1.5rem'}></IoIosArrowDown>}
                </IconButton>
            </div>
            <div
                id='context-menu'
                ref={ctxMenuRef}
                className={`${styles.contextMenu} ${contextMenuVisible && styles.active}`}
            >
                {categoryList.map((option, index) => (
                    <RippleContainer key={index} className={styles.contextMenuItem} onClick={() => { onCategorySelected(option) }}>
                        <span className={styles.contextMenuText}>{option.name}</span>
                    </RippleContainer>
                ))}
            </div>
        </div>

    )
}

export default SelectCategory