import React from 'react'
import styles from './styles.module.scss'
import { Category } from 'entities/Tovar/Tovar';

interface TabProps {
    tab: Category;
    onClick: () => void;
    selectedTab: number | null
}

const Tab: React.FC<TabProps> = ({ tab, selectedTab, onClick }) => {
    
    return (
        <div onClick={onClick} className={`${styles.tab} ${tab.id === selectedTab ? styles.active : ''}`}>
            <span>{tab.name}</span>
        </div>
    )
}

export default Tab