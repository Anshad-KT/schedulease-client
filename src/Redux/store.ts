import {configureStore} from '@reduxjs/toolkit'

import adminReducer from './user/userSlice'
import selectedVideoReducer from './video/selectedVideoSlice'
import { persistReducer,persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'root',
    storage
}

const persistUserReducer= persistReducer(persistConfig,adminReducer)

export const Store = configureStore({ 
    reducer:{
        user:persistUserReducer,
        selectedVideo:selectedVideoReducer
    }
})
export const persistor = persistStore(Store)