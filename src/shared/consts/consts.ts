import whatsappicon from 'public/icon_whatsapp.png'
import instaicon from 'public/icon_instagram.png'
import mail from 'public/icon_main.png'

export const ManageInventoryMenuOptions = [
    
]


export enum ContactType{
    MAIL='mail',WHATSAPP='whatsapp',INSTAGRAM='insta'
}

export const contactTypes = {
    [ContactType.MAIL]:{
        icon:mail,
        placeHolder:"example@mail.com"
    },
    [ContactType.WHATSAPP]:{
        icon:whatsappicon,
        placeHolder:"+7-xxx-xx-xxx-xx"
    },
    [ContactType.INSTAGRAM]:{
        icon:instaicon,
        placeHolder:"@accountTag"
    },
}

