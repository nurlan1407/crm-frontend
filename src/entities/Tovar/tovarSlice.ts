import { createSlice } from "@reduxjs/toolkit";
import { DefaultFormData, Tovar, TovarFormData } from "./Tovar";
import asset1 from 'public/asset1.png'
import asset2 from 'public/asset2.jpeg'


interface TovarSliceState {

    tovarList: Tovar[];
    formData: TovarFormData;
    searchText: string;
    activeCategory: string;
    categoryList: string[];
    currentCategory:string|null;

}
const initialState: TovarSliceState = {
    tovarList: [
        {
            name: "Дабл шефбургер",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores architecto illo ut. Similique veritatis reprehenderit enim ipsam, sunt eius. Rem quaerat quia eveniet distinctio',
            img: asset1,
            price: 300,
            category: null,
            discount:null
        },
        {
            name: "Бургер",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est maiores architecto illo ut. Similique veritatis reprehenderit enim ipsam, sunt eius. Rem quaerat quia eveniet distinctio',
            img: asset2,
            price: 30,
            category: null,
            discount:null
        }
    ],
    formData: DefaultFormData,
    searchText: '',
    activeCategory: '',
    categoryList: [],
    currentCategory:null
}


const tovarSlice = createSlice({
    name: "tovars",
    initialState: initialState,
    reducers: {
        addTovars: (state, action) => {
            state.tovarList = action.payload
        },
        setFormDataCategory: (state, action) => {
            state.formData.category = action.payload
        },
        setTovarFormData: (state, action) => {
            state.formData = action.payload;
        },
        setTovarSearchText:(state,action)=>{
            state.searchText = action.payload
        },
        addCategory:(state,action)=>{
          state.categoryList.push(action.payload)  
        },
        addTovar:(state,action)=>{
            const payload = action.payload as TovarFormData
            const newTovar:Tovar = {
                name:payload.name,
                img:payload.img,
                description:payload.description,
                price:payload.price,
                discount:payload.discount,
                category: null
            }
            const newList = state.tovarList
            newList.push(newTovar)
            state.tovarList = newList
            
            state.formData = DefaultFormData
        },
        deleteItem:(state,action)=>{
            const id = action.payload 
            const newList = state.tovarList.filter(item => item.id !== id)
            state.tovarList = newList   
        },
        setCurrentCategory:(state,action)=>{
            state.currentCategory = action.payload
            
        }
    }
})


export const { addTovars, addTovar,addCategory, setTovarFormData, setFormDataCategory ,setTovarSearchText,setCurrentCategory} = tovarSlice.actions

export default tovarSlice.reducer