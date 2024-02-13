import React from 'react'
import cls from './styles.module.scss'

const RippleEffect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>{
    const rippleContainer = e.currentTarget
    
    const rippleElement = document.createElement('div');
    rippleElement.className = cls.ripple

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


export default RippleEffect