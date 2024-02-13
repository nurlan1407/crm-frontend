import React, { HTMLAttributes, MouseEventHandler, useRef, useState } from "react"
import styles from './styles.module.scss'


interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    classname?: string
}

const RippleContainer: React.FC<ContainerProps> = (props) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log(e.target);
        
        
        if (!containerRef.current) return;
        const rippleContainer = containerRef.current;


        const rippleElement = document.createElement('div');
        rippleElement.className = styles.ripple

        const size = Math.max(rippleContainer.offsetWidth, rippleContainer.offsetHeight);
        const rect = rippleContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - size
        const y = e.clientY - rect.top - size;
        rippleElement.style.width = rippleElement.style.height = `${size}px`;
        
        rippleElement.style.left = `${x}px`;
        rippleElement.style.top = `${y}px`;

        rippleContainer.appendChild(rippleElement);
   

        setTimeout(()=>{
            rippleContainer.removeChild(rippleElement)
        }, 600)
    }

    return (
        <div
            className={`${styles.container} ${props.className}`}
            ref={containerRef}
            onMouseDown={onMouseDown}
            {...props}
        >
            {props.children}
        </div>
    )
}

export default RippleContainer