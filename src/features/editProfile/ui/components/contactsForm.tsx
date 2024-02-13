import React, { useState } from 'react'
import styles from './styles.module.scss'
import { ContactType, contactTypes } from 'shared/consts/consts'
import IconButton from 'shared/ui/iconButton'
import { MdDelete } from 'react-icons/md'
import { IoIosAddCircle } from "react-icons/io";
import Input from 'shared/ui/input'
import ContactTypeSelector from './ContactTypeSelector'
import { useAppDispatch,useAppSelector } from 'hooks/reduxHooks'
import { RootState } from 'store/store'
import { addContact,deleteContact, setContacts } from 'entities/Establishment/establishmentSlice'
import { EstContact } from 'entities/Establishment/Establishment'
interface ContactsFormProps{
    readyContactList:EstContact[];
}
const ContactsForm: React.FC = ({}) => {
    const dispatch = useAppDispatch()
    const contacts = useAppSelector((state:RootState)=>state.establishment.editEstForm.contacts)
    const [showTypeSelector,setShowTypeSelector] = useState(false)
    // const [contacts, _] = useState<EstContact[]>(
    //     contactsRef!.concat([{type:ContactType.MAIL,value:''}])
    // )

    const onAddContactPress = () =>{
        setShowTypeSelector(true)
    }
    const handleAddContact = (type: ContactType) => {
        dispatch(addContact(type));
    };

    const handleDeleteContact = (index: number) => {
        dispatch(deleteContact(index));
    };

    
    return (
        <>
            <h5 className={styles.header}>Укажите контактные данные</h5>
            <div className={styles.contacts}>
                {
                    contacts && 
                    contacts.map((item, index) =>
                    
                        <div key={index} className={styles.contacts__item}>
                            <img src={contactTypes[item.type].icon} width={24} height={24}></img>
                            <Input
                                className={styles['contacts__item-input']}
                                type='text' name='' value={item.value} placeholder={contactTypes[item.type].placeHolder} onChange={(e) => {
                                    const updatedContacts = contacts.map((contact, contactIndex) =>
                                        index === contactIndex ? { ...contact, value: e.target.value } : contact
                                    );
                                    dispatch(setContacts(updatedContacts));
                                }}></Input>
                            <IconButton type='button' className={styles.deleteBtn} onClick={() => {
                                handleDeleteContact(index)
                            }}>
                                <MdDelete size={24} color='red'></MdDelete>
                            </IconButton>
                        </div>
                    )
                }

                <div className={styles.contacts__footer}>
                    <IconButton type='button' className={styles.contacts__add} onClick={onAddContactPress}>
                        <IoIosAddCircle size={24}></IoIosAddCircle>
                    </IconButton>
                   {showTypeSelector && <ContactTypeSelector  onTypeSelected={handleAddContact} />} 

                </div>

            </div>
        </>

    )
}

export default ContactsForm