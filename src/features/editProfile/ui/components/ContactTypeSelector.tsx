import React from 'react';
import styles from './styles.module.scss'; // Предположим, что стили определены здесь
import { contactTypes, ContactType } from 'shared/consts/consts';

interface ContactTypeSelectorProps {

    onTypeSelected: (type: ContactType) => void;
}

const ContactTypeSelector: React.FC<ContactTypeSelectorProps> = ({ onTypeSelected }) => {
    return (
        <div className={`${styles.contactTypeSelector}`}>
            {Object.entries(contactTypes).map(([type, { icon }]) => (
                <div key={type} className={styles.contactTypeOption} onClick={() => onTypeSelected(type as ContactType)}>
                    <img src={icon} width={24} height={24} alt={type} />
                </div>
            ))}
        </div>
    );
};

export default ContactTypeSelector;
