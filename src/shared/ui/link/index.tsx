import React from "react"
import cls from './link.module.scss'

interface LinkProps {
    to: string,
    className: string,
    text: string
}
const Link: React.FC<LinkProps> = ({ to, className, text }) => {
    return (
        <a className={`${cls.link} ${className}`} href={to}>{text}</a>
    )
}

export default Link