import React, { ReactNode,useEffect,useRef } from 'react';
import cls from './overlay.module.scss';

interface OutlineProps {
    onClose: () => void;
    children: ReactNode;
}

const Overlay: React.FC<OutlineProps> = (props) => {
    const { onClose, children } = props
    const overlayRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if ((e.target as HTMLElement) == overlayRef.current) {
                onClose();
            }
        };
        document.addEventListener('click', handleClickOutside)
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('click', handleClickOutside)
        }
    }, [onClose])
    return (
        <div className={cls.outline} ref={overlayRef}>
            {children}
        </div>
    )
}

export default Overlay