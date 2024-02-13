import React from 'react'
import cls from './styles.module.scss'
import Button from 'shared/ui/button'
import IconButton from 'shared/ui/iconButton'
import { IoIosArrowBack } from 'react-icons/io'
import { CiSearch } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";



const Inventory: React.FC = () => {
    return (
        <div className={cls.container}>
            {/* <div className={cls['header']}>
                <IconButton >
                    <IoIosArrowBack color='gray' size={'1.5rem'} />
                </IconButton>
                <h3>Editing Profile</h3>
            </div> */}
            <div className={cls.inventory}>
                <div className={cls.inventoryHeader}>
                    <h2 className={cls.heading}>Inventory</h2>
                    <button className={cls['create-button']}>
                        <span>СОЗДАТЬ</span>
                        <span className={cls['dropdown-arrow']}>&#x25BC;</span>
                    </button>
                    <div className={cls.inputContainer}>
                        <div className={cls.category}>
                            <span className={cls.categoryName}>Категория: Верхгий уроень</span>
                            <IconButton>
                                <RxCross1 color='white'></RxCross1>
                            </IconButton>
                        </div>
                        <input
                            type='text'
                            value={''}
                            className={cls.input}
                            style={{paddingLeft:120}}
                        />
                        <div className={cls.inputBtnContainer}>
                            <IconButton className={cls.inputBtn}>
                                <CiSearch></CiSearch>
                            </IconButton>
                            <IconButton>
                                <RxCross1 className={cls.inputBtn}></RxCross1>
                            </IconButton>
                        </div>

                    </div>
                </div>
            </div>
            <div className={cls.inventoryList}>

            </div>
        </div>
    )
}


export default Inventory