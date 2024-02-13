import React, { ChangeEvent, useRef } from 'react'
import cls from './styles.module.scss'
import noImgFound from 'public/no_image_available.jpg'
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import IconButton from 'shared/ui/iconButton';


interface PhotosSliderProps {
    clasName:string,
    photos: string[],
    sendPhotos:(photos:File[])=>void,
    onPhotoClick: (index:number) => void,
    onPhotosUpload: (fileList: string[]) => void,
    onPhotoDelete: (index: number) => void
}


const PhotosSlider: React.FC<PhotosSliderProps> = (
    { photos, onPhotosUpload, onPhotoDelete, onPhotoClick,sendPhotos,clasName }
) => {

    const imageInputRef = useRef<HTMLInputElement>(null)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; // Get t  he selected files
        if (files) {
            const fileList = Array.from(files);
            const urlList = fileList.map((file) => URL.createObjectURL(file));
            onPhotosUpload(photos.concat(urlList))
            sendPhotos(fileList)
        }
    }
    return (
        <>
            <input
                ref={imageInputRef}
                type="file"
                multiple
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
                
            />
            <div className={`${cls['photos']} ${clasName} `}>
                {photos.map((img, index) => (
                    <div className={cls['photos__item']} onClick={()=>{onPhotoClick(index)}}>
                        <div className={cls['item__action']}>
                            <IconButton onClick={(e) => {e.stopPropagation(); onPhotoDelete(index) }}>
                                <MdDelete size={'1.5rem'} color='red'></MdDelete>
                            </IconButton>
                            {/* <IconButton style={{background:'var(--primary-color)'}}>
                                    <IoIosAdd size={'1.5rem'} color='white'></IoIosAdd>
                                </IconButton> */}
                        </div>
                        <img src={img} className={cls['item__img']} />
                    </div>
                ))
                }
                <div className={cls['photos__item']} onClick={() => { imageInputRef.current?.click() }}>
                    <img src={noImgFound} className={cls['item__img']} />
                    <span >Click to add</span>
                </div>
            </div>
        </>

    )
}


export default PhotosSlider