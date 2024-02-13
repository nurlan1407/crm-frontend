import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { AsyncThunk } from "@reduxjs/toolkit";

interface LoadingState {
    isLoading: boolean;
}

// Функция для обновления состояния загрузки
export const updateLoadingState = <Returned, ThunkArg>(
    builder: ActionReducerMapBuilder<LoadingState>,
    asyncThunk: AsyncThunk<Returned, ThunkArg, {}>
) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(asyncThunk.rejected, (state) => {
            state.isLoading = false;
        });
};


