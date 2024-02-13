import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import IconButton from 'shared/ui/iconButton'
import WorkSchedule from 'widgets/schedule'
import Input from 'shared/ui/input'
import cls from './editProfile.module.scss'


import noImgFound from 'public/no_image_available.jpg'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp, } from "react-icons/io";
import { IoMdMore } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

import TextArea from 'shared/ui/textarea'
import PhotosSlider from 'features/addEstPhotos/ui'
import Gallery from 'widgets/gallery'
import Button from 'shared/ui/button'
import Inventory from 'pages/Inventory/ui'
import Link from 'shared/ui/link'
import { MdOutlineStar } from "react-icons/md";
import { deleteImage, setImages, toggleSidebar } from 'entities/Establishment/establishmentSlice'

import folder1 from 'public/folder-1.png'
import folder2 from 'public/folder-2.png'
import folder3 from 'public/folder-3.png'
import whatsappicon from 'public/icon_whatsapp.png'
import instaicon from 'public/icon_instagram.png'
import defaultFolder from 'public/folder-4.png'
import ManageInventory from 'features/manageInventory/ui'
import AlertMsg from 'widgets/alertMsg'
import { Establishment } from 'entities/Establishment/Establishment'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import ContactTypeSelector from 'features/editProfile/ui/components/ContactTypeSelector'
import { contactTypes } from 'shared/consts/consts'
import { RootState } from 'store/store'
import { uploadPhotos } from 'entities/Establishment/api'

const businessSchedule = [
    { day: 'Monday', open: '08:00', close: '18:00' },
    { day: 'Tuesday', open: '08:00', close: '18:00' },
    { day: 'Wednesday', open: '08:00', close: '18:00' },
    { day: 'Thirthday', open: '08:00', close: '18:00' },
    { day: 'Friday', open: '08:00', close: '18:00' },
    { day: 'Saturday', open: '08:00', close: '18:00' },
    { day: 'Sunday', open: '08:00', close: '18:00' },
];

interface EditProfileProps {
    establishment: Establishment
}

const EditProfile: React.FC<EditProfileProps> = ({
    establishment
}) => {
    const dispatch = useAppDispatch()
    //this is some data
    const [isScheduleOpened, setIsScheduleOpened] = useState(true)

    //handle schedule
    const scheduleRef = useRef<HTMLDivElement>(null)
    const onScheduleOpen = () => {
        if (isScheduleOpened == true) {
            setIsScheduleOpened(false)
            // scheduleRef.current?.classList.remove(cls.active)
        } else {
            setIsScheduleOpened(true)
            // scheduleRef.current?.classList.add(cls.active)
        }
    }


    // Handle the photo slider
    const estPhotos = useAppSelector((state: RootState) => state.establishment.establishment?.imgs)
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // Store selected image files
    const onPhotosAdded = (fileList: string[]) => {
        dispatch(setImages(fileList))
    }
    const onPhotoDelete = (index: number) => {
        dispatch(deleteImage(index))
    }
    const sendPhotos = async(photos: File[]) => {
        await dispatch(uploadPhotos({ id: 1, photos: photos }))
    }


    //gallery
    const [galleryImgIndex, setGalleryImgIndex] = useState<number | null>(null)
    const onPhotoClick = (index: number) => { setGalleryImgIndex(index) }
    const onGalleryPaging = (index: number) => setGalleryImgIndex(index)

    useEffect(() => {
    }, [galleryImgIndex])

    const [isInventoryShown, setIsInventoryShown] = useState(false)

    return (
        <div className={cls['container']}>

            {isInventoryShown && <ManageInventory onClose={() => setIsInventoryShown(false)}></ManageInventory>}
            <div className={cls['header']}>
                <IconButton >
                    <IoIosArrowBack color='gray' size={'1.5rem'} />
                </IconButton>
                <h3>Est Profile</h3>
            </div>
            <div className={cls['form']}>
                <div className={cls['form-container']}>
                    <IconButton onClick={() => { dispatch(toggleSidebar()) }} className={cls['form-container__btn']}>
                        <CiEdit size={'1.5rem'} color='#959595'></CiEdit>
                    </IconButton>
                    <img src={establishment.mainImg || noImgFound} className={cls['form-photo']}></img>
                    <div className={cls['profile-data']}>
                        <h2 className={cls['data-header']}>{establishment.title}</h2>
                        <div className={cls['data-about-container']}>
                            <p className={cls['data-address']}> <strong>Address: &nbsp;</strong>{establishment.address} </p>
                            <p className={cls['data-description']}>{establishment.description}</p>
                        </div>

                        <div className={cls['data-contact-data']}>
                            {Object.values(establishment.contacts).map((item, index) =>
                                <div key={index} className={cls['data-contact-data-media-container']}>
                                    <img src={contactTypes[item.type].icon} width={24} height={24}></img>
                                    <p>{item.value}</p>
                                </div>
                            )}
                            <div className={cls['data-contact-data-media-container']}>
                                <img src={instaicon} width={24} height={24}></img>
                                <Link to='a' text={establishment.instagramLink} className=''></Link>
                            </div>
                            <Link to='a' text='https://website.com' className=''></Link>
                        </div>
                        <div className={cls['data-additional']}>
                            <div className={cls['additional-category']}>
                                Food Rest
                            </div>
                            <div className={cls['additional-rating']}>
                                <span>Rating: <strong>4.5</strong></span>
                                <MdOutlineStar color='yellow'></MdOutlineStar>
                            </div>
                        </div>
                    </div>
                </div>
                <PhotosSlider clasName={cls.photos} sendPhotos={sendPhotos} onPhotoClick={onPhotoClick} onPhotoDelete={onPhotoDelete} photos={estPhotos || []} onPhotosUpload={onPhotosAdded}></PhotosSlider>
                <div className={`${cls['form-schedule-container']} ${isScheduleOpened && cls.active}`} ref={scheduleRef}>
                    <div className={`${cls['form-schedule-container-header']}  ${isScheduleOpened && cls.active}`}>
                        <h4 className={cls['schedule-container-heading']}>Working Schedule</h4>
                        <IconButton type='button' onClick={onScheduleOpen}>
                            {isScheduleOpened
                                ?
                                <IoIosArrowUp color='gray' size={'1.5rem'}></IoIosArrowUp>
                                :
                                <IoIosArrowDown size={'1.5rem'} color='gray'></IoIosArrowDown>
                            }
                        </IconButton>
                    </div>
                    <WorkSchedule schedule={businessSchedule} />
                </div>

                <div className={cls.inventory}>
                    {/* <div className={cls['inventory__header']}>
                        <h3>Inventory</h3>
                    </div> */}
                    <div className={cls['inventory__content']}>
                        <div className={cls['content__item']} onClick={() => setIsInventoryShown(true)}>
                            <img src={folder1} ></img>
                            <p>Inventory</p>
                        </div>
                        <div className={cls['content__item']} onClick={() => setIsInventoryShown(true)}>
                            <img src={folder2} ></img>
                            <p>Bonuses (not yet implemented )</p>
                        </div>
                    </div>
                </div>
                {galleryImgIndex != null && <Gallery images={selectedImages} currentIndex={galleryImgIndex} onClose={() => { setGalleryImgIndex(null) }} page={onGalleryPaging} />}
            </div>
        </div>




    )
}

export default EditProfile