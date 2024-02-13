import noImg from 'public/no_image_available.jpg'
export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
    const discountAmount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discountAmount;
    return Math.round(discountedPrice * 100) / 100;
}

export const getImageUrl = (file:File|string|null ) => {
    if (file instanceof File) {
        return URL.createObjectURL(file);
    }
    return file || noImg;
};