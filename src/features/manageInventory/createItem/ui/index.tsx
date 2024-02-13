import React, { useEffect, useRef, useState } from 'react';
import cls from './styles.module.scss'
import Input from 'shared/ui/input';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHooks';
import { RootState } from 'store/store';
// import { setTovarFormData, setFormDataCategory, addTovar } from 'entities/Tovar/tovarSlice';
import TextArea from 'shared/ui/textarea';
import IconButton from 'shared/ui/iconButton';
import { IoIosClose } from 'react-icons/io';
import noImg from 'public/no_image_available.jpg'
import Checkbox from 'shared/ui/checkbox';
import NumberInput from 'shared/ui/numberInput';
import { CiShoppingTag } from "react-icons/ci";
import SelectCategory from '../../components/SelectCategory';
import RadioButton from 'shared/ui/radiobutton';
import Button from 'shared/ui/button';
import { calculateDiscountedPrice, getImageUrl } from 'shared/lib/discountCalculator';

import { useAlertContext } from 'hooks/AlertProvider';
import { setTovarFormData, setFormDataCategory, addTovar } from 'entities/Tovar/categorySlice';
import { uploadProduct } from 'entities/Establishment/api';

interface CreateItemSidebarProps {
    isShown: boolean,
    onClose: () => void
}
const CreateItemSidebar: React.FC<CreateItemSidebarProps> = (props) => {
    const currentCategoryId = useAppSelector((state: RootState) => state.categories.currentCategoryId)
    const categoryList = useAppSelector((state: RootState) => state.categories.categories)
    const tovarFormData = useAppSelector((state: RootState) => state.categories.formData)


    const imageInputRef = useRef<HTMLInputElement>(null)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const { isShown } = props
    const dispatch = useAppDispatch()
    // const tovarFormData = useAppSelector((state: RootState) => state.inventory.formData)

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
        e.target.type === 'number' ? dispatch(setTovarFormData({ ...tovarFormData, [e.target.name]: (e.target.name == 'discount') ? Math.min(Math.max(Number(e.target.value), 0), 100) : e.target.value }))
            : dispatch(setTovarFormData({ ...tovarFormData, [e.target.name]: e.target.value }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            if (!tovarFormData.name || !tovarFormData.price) {
                showAlert('error', 'Please fill in neccessary fields: Name, Price')
                return
            }
            const result = await dispatch(uploadProduct(tovarFormData))
            console.log(result);
            
            // dispatch(addTovar(tovarFormData))
            props.onClose()
            showAlert('success', "Item creation is succesfull")

        }catch(e){
            showAlert('error', "Some error occured")

        }
   
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; // Get t  he selected files
        console.log(files);
        
        if (files) {
            dispatch(setTovarFormData({ ...tovarFormData, [e.target.name]: files[0] }))
        }
    }



    return (
        <div className={`${cls.sidebar} ${isShown ? cls.active : ''}`} ref={sidebarRef}>

            <div className={cls['sidebar__header']}>
                <h3 className={cls['sidebar__header-title']}>Adding inventory item</h3>
                <IconButton className={cls['sidebar__header-close-btn']} onClick={props.onClose}>
                    <IoIosClose size={'2rem'} color='red'></IoIosClose>
                </IconButton>
            </div>

            <form className={cls['sidebar__form']} onSubmit={handleSubmit}>
                <div className={cls['sidebar__form__photo']} onClick={() => { imageInputRef.current?.click() }}>
                    <img src={getImageUrl(tovarFormData.img)} className={cls['item__img']} />
                    <input
                        onChange={handleFileChange}
                        ref={imageInputRef}
                        name='img'
                        type="file"
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
                <Input
                    name='name'
                    value={tovarFormData.name}
                    type='text'
                    label='Name'
                    placeholder='Name'
                    onChange={handleChange}
                >
                </Input>

                <TextArea
                    value={tovarFormData.description}
                    name='description'
                    label='Description'
                    placeholder='Description'
                    onChange={handleChange}
                    rows={3}
                />
                <div className={cls['sidebar__form__price']}>
                    <NumberInput
                        name='price'
                        value={tovarFormData.price.toString()}
                        label='Price'
                        placeholder='price'
                        onChange={handleChange}
                        horizontal={true}
                        additional={isDiscount && tovarFormData.discount ? `${calculateDiscountedPrice(tovarFormData.price, tovarFormData.discount)}` : ''}
                    >
                    </NumberInput>
                    <span>KZT</span>
                </div>


                <SelectCategory
                    activeCategory={tovarFormData.category || categoryList.find((item) => item.id === currentCategoryId)?.id || null}
                    onSelect={(category) => { dispatch(setFormDataCategory(category.id)) }}
                    categoryList={categoryList}
                />
                <div className={cls['sidebar__form__discount-container']}>
                    <Checkbox
                        type='checkbox'
                        label="Discount"
                        checked={isDiscount}
                        onChange={toggleDiscount}
                        name="termsCheckbox"
                        value="accepted"
                    />
                    {isDiscount &&
                        <div className={cls['sidebar__form__discount-container-value']}>
                            <NumberInput name='discount' value={tovarFormData.discount || ''} onChange={handleChange} placeholder='%'></NumberInput>
                            <CiShoppingTag size={'2rem'}></CiShoppingTag>
                        </div>
                    }
                </div>
                <Checkbox
                    type='checkbox'
                    label="Options"
                    checked={isOptions}
                    onChange={toggleOptions}
                    name="termsCheckbox"
                    value="accepted"
                />
                <Button type='submit' onClick={() => {

                }} className={cls['sidebar__form-submit-btn']}>
                    Submit
                </Button>
                <RadioButton value='' checked onChange={(e) => { }} name='' label='Qasdasdadasd'></RadioButton>






            </form>
        </div>
    )
}

export default CreateItemSidebar