import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import list_dataReducer from "./list-data";

const store = configureStore({
  reducer: {
    auth: authReducer,
    list_data: list_dataReducer,
  },
});
export default store;
