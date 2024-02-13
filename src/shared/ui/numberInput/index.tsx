import React, { ChangeEvent, FC, HTMLAttributes, useState } from "react";
import cls from './styles.module.scss'
import { TextField } from "@mui/material";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
    value: string | number,
    name: string,
    placeholder: string,
    label?: string,
    className?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    horizontal?: boolean
    additional?: string
}


const NumberInput: FC<InputProps> = (props) => {
    const [isFocused, setIsFocused] = useState(false)
    const { name, placeholder, onChange, additional, value, label, horizontal } = props;

    return (
        <div className={`${cls.container} ${props.className} ${horizontal ? cls.flex : ''}`} {...props}>
            {label && <label htmlFor={name} className={`${cls.label} ${isFocused ? cls.labelActive : ''}`}>{label}</label>}
            <div style={{display:'flex'}}>
                <input
                    id={name}
                    name={name}
                    className={cls.input}
                    type={'number'}
                    min={0}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value }
                    onFocus={() => { setIsFocused(true) }}
                    onBlur={() => { setIsFocused(false) }}
                >
                </input>
                {additional && <div className={cls.additional}><span>{additional}</span></div>}
            </div>

        </div>




    )
}

export default NumberInput;