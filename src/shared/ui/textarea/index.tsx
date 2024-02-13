import React, { ChangeEvent, FC, HTMLAttributes, useState } from "react";
import cls from './styles.module.scss';

interface TextAreaProps{
  value: string,
  name: string,
  placeholder: string,
  label: string,
  className?:string,
  rows?: number,
  cols?: number,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  style?:React.CSSProperties
}

const TextArea: FC<TextAreaProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false)
  const { name, placeholder, onChange, value, label, rows, cols, style } = props;

  return (
    <div className={`${cls.container} ${props.className}`} style={style}>
      {label && <label htmlFor={name} className={`${cls.label} ${isFocused ? cls.labelActive : ''}`}>{label}</label>}
      <textarea
        id={name}
        name={name}
        className={cls.textarea}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows || 4}
        cols={cols || 50}
      />
    </div>
  )
}

export default TextArea;
