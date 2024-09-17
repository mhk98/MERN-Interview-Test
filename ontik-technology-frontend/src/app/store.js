// import cartSlice from "@/Redux-Thunk/reducers/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
import { drawingApi } from "../features/Drawing/Drawing";




const store = configureStore({
  reducer: {
    [drawingApi.reducerPath]: drawingApi.reducer,

  
  
   
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
        drawingApi.middleware
   
      
      
    ),
});

export default store;