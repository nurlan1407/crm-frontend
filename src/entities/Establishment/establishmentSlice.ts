import { createSlice } from "@reduxjs/toolkit";
import asset1 from 'public/asset1.png'
import asset2 from 'public/asset2.jpeg'
import { Establishment, defaultEstForm } from "./Establishment";
import { editProfile, getEst } from "./api";
import { PayloadAction } from "@reduxjs/toolkit";
import { ContactType } from "shared/consts/consts";
import { EstContact } from './Establishment'
import { EditEstablishmentForm } from "./Establishment";
interface EstablishmentState {
    establishment: Establishment | null;
    editEstForm: EditEstablishmentForm;
    isLoading: boolean;
    isEditing: boolean;
}
const initialState: EstablishmentState = {
    establishment: null,
    editEstForm: defaultEstForm,
    isLoading: false,
    isEditing: false
}


const establishmentSlice = createSlice({
    name: "establishment",
    initialState: initialState,
    reducers: {
        setEstFormData: (state, action) => {
            state.editEstForm = action.payload;
        },
        toggleSidebar: (state) => {
            state.isEditing = !state.isEditing
        },
        setImages: (state, action: PayloadAction<string[]>) => {
            if (state.establishment)
                state.establishment.imgs = action.payload
        },
        deleteImage:(state,action:PayloadAction<number>)=>{
            if(state.establishment){
                const newArray = [...state.establishment.imgs.slice(0, action.payload), ...state.establishment.imgs.slice(action.payload + 1)];
                state.establishment.imgs = newArray
            }
        },
        setContacts: (state, action: PayloadAction<EstContact[]>) => {
            if (state.establishment)
                state.editEstForm.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<ContactType>) => {
            if (state.establishment) {
                state.editEstForm.contacts.push({ type: action.payload, value: '' });
            }
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            if (state.establishment) {
                state.editEstForm.contacts.splice(action.payload, 1);
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getEst.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(getEst.fulfilled, (state, action) => {

            state.isLoading = false
            state.establishment = action.payload
            state.editEstForm = { ...state.establishment }
        })
        builder.addCase(getEst.pending, (state, action) => {
            state.isLoading = true
        })


        builder.addCase(editProfile.rejected, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(editProfile.pending, (state, action) => {
            state.isLoading = true
        })
    },
})


export const { setContacts, addContact, deleteContact, toggleSidebar, setEstFormData,setImages,deleteImage } = establishmentSlice.actions

export default establishmentSlice.reducer