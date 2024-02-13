import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, DefaultFormData, Tovar, TovarFormData } from "./Tovar";
import asset1 from 'public/asset1.png'
import asset2 from 'public/asset2.jpeg'
import { deleteProduct, getProducts, uploadNewCategory, uploadProduct } from "entities/Establishment/api";
import { updateLoadingState } from "entities/reducerHandlers";
import { getEst } from "entities/Establishment/api";
interface CategorySliceState {
    categories: Category[];
    formData: TovarFormData;
    searchText: string;
    currentCategoryId: number | null;
    currentCategory: Category | null;
    isLoading: boolean,
    activeProduct: Tovar | null,
    products: Tovar[],
    productsAmount: number | 0,
    currentPage: number
}
const initialState: CategorySliceState = {
    categories: [],
    formData: DefaultFormData,
    searchText: '',
    currentCategoryId: null,
    isLoading: false,
    currentCategory: null,
    activeProduct: null,
    products: [],
    productsAmount: 0,
    currentPage: 1
}


const categorySlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
        setActiveProduct: (state, action) => {
            state.activeProduct = action.payload
        },
        setFormDataCategory: (state, action) => {
            state.formData.category = action.payload
            const temp = state.categories.find(item => item.id == action.payload)
            state.currentCategory = temp!
            state.currentCategoryId = temp!.id
        },
        setTovarFormData: (state, action) => {
            state.formData = action.payload;
        },
        setTovarSearchText: (state, action) => {
            state.searchText = action.payload
        },
        addCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },


        addCategories: (state, action) => {
            state.categories = action.payload
        },

        addTovar: (state, action) => {
            const payload = action.payload as TovarFormData
            const newTovar: Tovar = {
                name: payload.name,
                img: payload.img,
                description: payload.description,
                price: payload.price,
                discount: payload.discount,
                category: state.categories.find((item) => item.id == payload.category) || null
            }
            const targetIndex = state.categories.findIndex((item) => item.id == newTovar.category?.id)

            if (targetIndex !== -1) {
                // Предполагаем, что у каждой категории есть массив products для товаров
                if (!state.categories[targetIndex].products) {
                    state.categories[targetIndex].products = [];
                }
                state.categories[targetIndex].products.push(newTovar);
            }
            state.formData = DefaultFormData
        },
        deleteItem: (state, action) => {
            const id = action.payload.id
            const categoryIndex = state.categories.findIndex(category => category.id === state.currentCategoryId);

            if (categoryIndex !== -1) {
                if (state.categories[categoryIndex].products) {

                    state.categories[categoryIndex].products = state.categories[categoryIndex].products.filter(tovar => tovar.id !== id);
                }
            }
        },
        setCurrentCategory: (state, action) => {
            state.currentCategoryId = action.payload.id
        },
        setCurrentProducts: (state, action) => {

        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers(builder) {
        updateLoadingState(builder, uploadNewCategory);
        updateLoadingState(builder, getProducts);
        updateLoadingState(builder, uploadProduct);
        builder.addCase(uploadNewCategory.fulfilled, (state, action) => {
            addCategory(action.payload.category)
            state.currentCategoryId = action.payload.category.id
            state.isLoading = false
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false

            const list = action.payload.products
            const totalNumber = action.payload.total
            state.products = list
            state.productsAmount = totalNumber
            // let ind = action.payload.categories.length > 0 ? 0 : null
            // console.log(ind);

            // state.currentCategoryId = ind !== null ? action.payload.categories[ind].id : null

            // state.categories = action.payload.categories
        })
        builder.addCase(uploadProduct.fulfilled, (state, action) => {
            const toChangeIndex = state.products.findIndex((item) => item.id === action.payload.id)
            if (toChangeIndex !== -1) {
                state.products[toChangeIndex] = action.payload
                state.isLoading = false
            }else{
                state.products.push(action.payload)     
            }
            const targetIndex = state.categories.findIndex((item) => item.id == action.payload.category?.id)
            if (targetIndex !== -1) {
                if (!state.categories[targetIndex].products) {
                    state.categories[targetIndex].products = [];
                }
                state.categories[targetIndex].products.push(action.payload);
            }
            state.formData = DefaultFormData
            state.isLoading = false
        })
        builder.addCase(getEst.fulfilled, (state, action) => {

            state.isLoading = false
            state.currentCategoryId = action.payload.categories[0].id
            state.categories = action.payload.categories

        })
    },
})


export const { setCurrentPage, setActiveProduct, addCategory, setCurrentCategory, deleteItem, addTovar, addCategories, setTovarSearchText, setTovarFormData, setFormDataCategory } = categorySlice.actions

export default categorySlice.reducer