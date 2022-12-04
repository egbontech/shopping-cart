import '../styles/globals.css';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { productsApi } from './../features/productApi';
import cartReducer, { getTotal } from '../features/cartSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"




const persistConfig = {
  key: "cart",
  version:1,
  storage
};

const reducer = combineReducers({
  cart:cartReducer,
});

const persistedReducer = persistReducer(persistConfig,reducer);



const store = configureStore({
  reducer:{   
    cart:persistedReducer,
    [productsApi.reducerPath] : productsApi.reducer,   
  },
  middleware: (getDefaultMiddleware) =>{
    return getDefaultMiddleware({serializableCheck: false}).concat(productsApi.middleware);
  }
})

store.dispatch(getTotal())

let persistor = persistStore(store)

function MyApp({ Component, pageProps }) {
  return (
    <div>
    <ToastContainer  />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Component {...pageProps} />
      </PersistGate>  
   </Provider>
    </div>
   
  )
  

}


export default MyApp
