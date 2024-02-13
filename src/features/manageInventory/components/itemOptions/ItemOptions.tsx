import React from 'react'
import styles from './styles.module.scss'
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks'
import { Option } from 'entities/Tovar/Tovar'
import Checkbox from 'shared/ui/checkbox'


interface OptionProps {
    option: Option;
}

const Option: React.FC<OptionProps> = ({ option }) => {
    return (
        <div>
            <Checkbox type='radio' value='' checked onChange={(e) => { }} name='' label='Qasdasdadasd' />
        </div>
    )
}


const ItemOptions = () => {

    return (
        <div className={styles['container']}>


            <button>+</button>
        </div>
    )
}