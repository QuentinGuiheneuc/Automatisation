import { configureStore } from '@reduxjs/toolkit'
import auth from '../states/authSlice'
import object from '../states/objectSlice'
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'

const store =  configureStore({
    reducer: {
        auth: auth,
        object: object
    },
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store