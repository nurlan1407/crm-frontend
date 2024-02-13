import React from 'react';
import cls from '../checkbox/styles.module.scss'; // Assuming your styles will be in RadioButton.scss


interface RadioButtonProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    value: string;
    className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, checked, onChange, name, value, className }) => {
    return (
        <div className={cls.container}>
            <input
                id={`id${name}`}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={cls['checkbox-input']}
            />
            <label htmlFor={`id${name}`}>{label}</label>
        </div>
    );
};

export default RadioButton;
