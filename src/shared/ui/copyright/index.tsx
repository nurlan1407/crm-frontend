import { Typography, Link } from "@mui/material";
import React from 'react'
import styles from './copyright.module.scss'

interface CopyrightProps {
    className: string
}
const Copyright: React.FC<CopyrightProps> = (props) => {
    return (
        <div className={`${styles.typography} ${props.className}`}>
            Copyright <a href='' className={styles.link}>©Loyalbro</a>  {new Date().getFullYear()}.
        </div>
    );
}

export default Copyright