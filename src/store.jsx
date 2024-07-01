import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/form/formSlicer";

export const store = configureStore({
  reducer: { form: formReducer },
});

// Note: Removing TypeScript-specific types

export default store;
