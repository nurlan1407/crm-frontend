import React, { ChangeEvent, FC } from "react";
import cls from './button.module.scss';
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick: () => void;
    loading?: boolean;
    className: string;
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button {...props} className={`${cls.btn} ${props.className}`} onClick={props.onClick} >
            {props.children}
        </button>
    )
}

export default Button