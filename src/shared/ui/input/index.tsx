import React, { ChangeEvent, FC, HTMLAttributes, useState } from "react";
import cls from './input.module.scss';
import { TextField } from "@mui/material";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  value: string,
  name: string,
  type: string,
  label?: string,
  className?:string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  horizontal?:boolean
  placeholder:string
}


const Input: FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const { name, type, onChange, value, label, horizontal,placeholder } = props;

  return (
    <div className={`${cls.container} ${props.className} ${horizontal?cls.flex:''}`} {...props}>
      {label && <label htmlFor={name} className={`${cls.label} ${isFocused ? cls.labelActive : ''}`}>{label}</label>}
      <input
        id={name}
        name={name}
        className={cls.input}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onFocus={() => { setIsFocused(true) }}
        onBlur={() => { setIsFocused(false) }}
      >
      </input>
    </div>




  )
}

export default Input;