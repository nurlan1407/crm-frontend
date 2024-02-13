import React, { useEffect } from "react"
import IconButton from "shared/ui/iconButton"
import cls from './styles.module.scss'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface GalleryProps {
    images: string[]
    currentIndex: number
    page: (index: number) => void
    onClose: () => void
}


const Gallery: React.FC<GalleryProps> = ({
    images, currentIndex, page, onClose
}) => {


    const onPage = () => {

    }
    const pageBackwards = () => {
        if (currentIndex <= 0) {
            //it is first image
            return
        } else {
            page(currentIndex - 1)
        }
    }
    const pageForward = () => {
        if (currentIndex +1 >= images.length) {
            //it is last image
            return
        } else {
            page(currentIndex + 1)
        }
    }
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if ((e.target as HTMLElement).id === 'overlay') {
                console.log('ЭТО ОВЕРЛЕЙ');
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
        <div id='overlay' className={cls.overlay}>
            <IconButton className={cls.btn} onClick={pageBackwards} >
                <IoIosArrowBack size={'2rem'} color="#757575"></IoIosArrowBack>
            </IconButton>
            <div className={cls.modal}>
                <img className={cls.currentImage} src={images[currentIndex]}></img>
            </div>
            <IconButton className={cls.btn} onClick={pageForward}>
                <IoIosArrowForward size={'2rem'} color="#757575"></IoIosArrowForward>
            </IconButton>
        </div>
    )
}

export default Gallery