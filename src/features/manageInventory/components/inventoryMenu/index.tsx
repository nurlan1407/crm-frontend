import React, { ReactNode } from "react";
import Checkbox from "shared/ui/checkbox";
import RippleContainer from "shared/ui/rippleEffectContainer";
import styles from './styles.module.scss'
import { SettingMenuOption } from "features/manageInventory/utils/consts";
import { SettingsMenu } from "features/manageInventory/utils/consts";

interface MenuProps {
    x: number;
    y: number;
    data: SettingMenuOption[];
}

const InventoryItemMenu: React.FC<MenuProps> = (props) => {
    const { data, x, y } = props

    return (
        <div className={`${styles.contextMenu}`} style={{ position: 'absolute', top: y + 'px', left: x + 'px' }} >
            {SettingsMenu.map((item, index) => (
                <RippleContainer key={index}>
                    <div className={styles.contextMenuItem}>
                        <item.icon size={'1.5rem'} color="#959595"></item.icon>
                        <span>
                            {item.title}
                        </span>
                        {item.isCheckbox && <Checkbox
                            type="checkbox"
                            onChange={(e) => { }}
                            name="inventoryMenu"
                            checked={false}
                        />}
                    </div>
                </RippleContainer>
            ))}
        </div>
    )
}

export default InventoryItemMenu