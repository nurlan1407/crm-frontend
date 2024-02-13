import React, { FC, ButtonHTMLAttributes, useState, useRef } from 'react';
import styles from './IconButton.module.scss'; // Assuming you're using SCSS modules

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

const IconButton: FC<IconButtonProps> = ({ className, children, ...props }) => {
    const buttonClass = `${styles.iconButton} ${className}`;
    const [ripple, setRipple] = useState(false)
    const onMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const container = e.currentTarget

        const rippleElement = document.createElement('div');
        rippleElement.className = styles.ripple

        const size = Math.max(container.offsetWidth, container.offsetHeight);
        rippleElement.style.width = rippleElement.style.height = `${size}px`;

        container.appendChild(rippleElement)

        setTimeout(() => {
            container.removeChild(rippleElement)
        }, 300)
    }


    return (
        <button
            className={buttonClass}
            onMouseDown={onMouseDown}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;