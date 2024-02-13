import React from 'react';
import cls from './styles.module.scss'

interface CheckboxProps {
    label?: string;
    checked: boolean;
    type: 'checkbox' | 'radio'
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    value?: string;
    className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, name, value, className, type }) => {
    return (
        <div className={cls.container}>
            <input
                id={`id${name}`}
                type={type}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={cls['checkbox-input']}
            />
            {label && <label htmlFor={`id${name}`}>{label}</label>}
        </div>
    );
};

export default Checkbox;