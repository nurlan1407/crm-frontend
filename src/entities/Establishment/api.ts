import { createAsyncThunk } from '@reduxjs/toolkit'
import { EditEstablishmentForm, Establishment } from './Establishment'
import makeRequest from 'baseApi'
import { Category, Tovar, TovarFormData } from 'entities/Tovar/Tovar'


interface GetEstablishmentResponse extends Establishment{
    categories:Category[]
}
export const getEst = createAsyncThunk<GetEstablishmentResponse>(
    'est/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await makeRequest('GET', '/est/get ', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)


export const editProfile = createAsyncThunk<{}, EditEstablishmentForm>(
    'est/edit',
    async (params, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('title', params.title);
            formData.append('description', params.description);
            formData.append('address', params.address);
            formData.append('contacts', JSON.stringify(params.contacts));
            if (params.mainImg instanceof File) {

                formData.append('mainImg', params.mainImg);
            }
            const response = await makeRequest("PATCH", '/est/edit ', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.msg)
        }
    }
)
interface UploadPhotosForm {
    id: number;
    photos: File[];
}
export const uploadPhotos = createAsyncThunk<{}, UploadPhotosForm>(
    'photos/upload',
    async (params, { rejectWithValue }) => {
        try {
            const formData = new FormData();

            params.photos.forEach((photo, index) => {
                formData.append(`photos`, photo);
            });

            const response = await makeRequest("POST", `/est/addPhotos/${params.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

                }
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || e.message);
        }
    }
);


interface CreateCategoryParams {
    id: number | undefined;
    name: string
}
interface CreateCategoryResponse {
    category: Category
}
export const uploadNewCategory = createAsyncThunk<CreateCategoryResponse, CreateCategoryParams>(
    'category/upload',
    async (params, { rejectWithValue }) => {
        try {
            const response = await makeRequest("POST", `est/category/create/${params.id}`, params, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,

                }
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || e.message);
        }
    }
);

interface GetProductsResponse extends Establishment {
    products:Tovar[];
    total:number
}
export const getProducts = createAsyncThunk<GetProductsResponse, { id: number, page:number, limit:number }>(
    'products/get',
    async (params, { rejectWithValue }) => {
        try {
            const response = await makeRequest("GET", `est/product/get/${params.id}?page=${params.page}&limit=${params.limit}`, params, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || e.message);
        }
    }
);


export const uploadProduct = createAsyncThunk<Tovar, TovarFormData>(
    'products/upload',
    async (params, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if(params.id){
                formData.append('id', params.id.toString())
            }
            formData.append('name', params.name)
            formData.append('description', params.description)
            formData.append('price', params.price.toString())
            formData.append('discount', params.discount?.toString() || '')

            formData.append('img', params.img as File)
            const response = await makeRequest("POST", `est/product/create/${params.id}`, params, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || e.message);
        }
    }
);

export const deleteProduct = createAsyncThunk<{}, { productId: number}>(
    'products/delete',
    async (params, { rejectWithValue }) => {
        try {
            const response = await makeRequest("DELETE", `est/product/delete/${params.productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || e.message);
        }
    }
);