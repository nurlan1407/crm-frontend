import React from "react";
import Input from "shared/ui/input";
import IconButton from "shared/ui/iconButton";
import { CiSearch } from "react-icons/ci";
import styles from './styles.module.scss';
interface InventorySearchProps {
    value: string;
    onTextType: (value: string) => void;

}



const InventorySearch: React.FC<InventorySearchProps> = ({
    value, onTextType
}) => {
    return (
        <form action="" className={styles.container}>
            <Input
                type="text"
                name="inventorySearch"
                placeholder="Search"
                value={value}
                onChange={(e) => {
                    onTextType(e.target.value)
                }}
            >
            </Input>
            <IconButton type="submit" onClick={(e)=>{e.preventDefault()}}>
                <CiSearch size={'1.5rem'}></CiSearch>
            </IconButton>
        </form>
    )

}


export default InventorySearch