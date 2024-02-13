import React, { useEffect, useRef, useState } from 'react';
import cls from './styles.module.scss'
import Input from 'shared/ui/input';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { RootState } from 'store/store';
import { setTovarFormData, setFormDataCategory, addTovar } from 'entities/Tovar/tovarSlice';
import TextArea from 'shared/ui/textarea';
import IconButton from 'shared/ui/iconButton';
import { IoIosClose } from 'react-icons/io';
import noImg from 'public/no_image_available.jpg'
import Button from 'shared/ui/button';
import { useAlertContext } from 'hooks/AlertProvider';
import ContactsForm from './components/contactsForm';
import { setEstFormData } from 'entities/Establishment/establishmentSlice';
import { editProfile } from 'entities/Establishment/api';


interface CreateItemSidebarProps {
    isShown: boolean,
    onClose: () => void
}
const EditProfileSidebar: React.FC<CreateItemSidebarProps> = (props) => {
    const currentCategory = useAppSelector((state: RootState) => state.inventory.currentCategory)
    const categoryList = useAppSelector((state: RootState) => state.inventory.categoryList)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const { isShown } = props
    const dispatch = useAppDispatch()
    const editEstForm = useAppSelector((state: RootState) => state.establishment.editEstForm)

    const [isDiscount, setIsDiscount] = useState<boolean>(false)
    const toggleDiscount = () => {
        isDiscount ? setIsDiscount(false) : setIsDiscount(true)
    }
    const [isOptions, setIsOptions] = useState<boolean>(false)
    const toggleOptions = () => {
        isOptions ? setIsOptions(false) : setIsOptions(true)
    }

    //alert for error messaging
    const { showAlert } = useAlertContext()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setEstFormData({ ...editEstForm, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        //@ts-ignore
        // console.log(editEstForm);   
        await dispatch(editProfile(editEstForm))
        // showAlert('success', "Item creation is succesfull")
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; // Get t  he selected files
        if (files) {
            const fileList = Array.from(files);
            dispatch(setEstFormData({ ...editEstForm, [e.target.name]: fileList[0] }))
        }
    }
    const getImageUrl = () => {
        if (editEstForm.mainImg instanceof File) {
            // Создаем URL из объекта File
            return URL.createObjectURL(editEstForm.mainImg);
        }
        // Возвращаем изображение по умолчанию, если mainImg не является объектом File
        return editEstForm.mainImg || noImg;
    };
    return (
        <div className={`${cls.sidebar} ${isShown ? cls.active : ''}`} ref={sidebarRef}>

            <div className={cls['sidebar__header']}>
                <h3 className={cls['sidebar__header-title']}>Editing Profile</h3>
                <IconButton className={cls['sidebar__header-close-btn']} onClick={props.onClose}>
                    <IoIosClose size={'2rem'} color='red'></IoIosClose>
                </IconButton>
            </div>

            <form className={cls['sidebar__form']} onSubmit={handleSubmit}>
                <div className={cls['sidebar__form__photo']} onClick={() => { imageInputRef.current?.click() }}>
                    <img src={getImageUrl()} className={cls['item__img']} />
                    <input
                        name='mainImg'
                        onChange={handleFileChange}
                        ref={imageInputRef}
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
                <div className={cls['sidebar__form__input-container']}>
                    <Input
                        name='title'
                        value={editEstForm.title}
                        type='text'
                        label='Name'
                        placeholder='Name'
                        onChange={handleChange}
                    >
                    </Input>
                    <Input
                        name='address'
                        value={editEstForm.address}
                        type='text'
                        label='address'
                        placeholder='Adress'
                        onChange={handleChange}
                    >
                    </Input>
                </div>
                <TextArea
                    value={editEstForm.description}
                    name='description'
                    label='Description'
                    placeholder='Description'
                    onChange={handleChange}
                    rows={3}
                />
                <div className={cls['sidebar__form__contact']}>
                    <ContactsForm ></ContactsForm>
                </div>

                <Button type='submit' onClick={() => {
                }} className={cls['sidebar__form-submit-btn']}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default EditProfileSidebar