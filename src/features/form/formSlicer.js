import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    "report-targeting": [],
    "report-location": [],
  },
  probability: [],
  uplift: [],
  loading: false,
  images: {},
  daysDifference: 0,
  startingDate: null,
  endingDate: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = Number(value);
    },
    updateText: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateProbability: (state, action) => {
      const { index, probability } = action.payload;
      state.probability[index] = (probability * 100).toFixed(2);
    },
    updateUplift: (state, action) => {
      const { index, uplift } = action.payload;
      state.uplift[index] = uplift.toFixed(2) + "%";
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateImage: (state, action) => {
      const { key, image } = action.payload;
      state.images[key] = image;
    },
    updateSelect: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateDateDifference: (state, action) => {
      state.daysDifference = action.payload;
    },
    updateStartingDate: (state, action) => {
      state.startingDate = action.payload;
    },
    updateEndingDate: (state, action) => {
      state.endingDate = action.payload;
    },
  },
});

export const {
  updateField,
  updateProbability,
  updateUplift,
  updateLoading,
  updateText,
  updateImage,
  updateSelect,
  updateDateDifference,
  updateStartingDate,
  updateEndingDate,
} = formSlice.actions;

export default formSlice.reducer;
