import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  formData: { [key: string]: number | string | null };
  probability: string[];
  uplift: { [key: number]: string };
  startingDate: string;
  endingDate: string;
  loading: boolean;
  error: string | null;
  images: { [key: string]: string | null };
  daysDifference: null | number;
}

// Interfaces for action payloads
interface UpdateFieldPayload {
  field: string;
  value: number | string | string[];
}

interface UpdateProbabilityPayload {
  index: number;
  probability: number;
}

interface UpdateUpliftPayload {
  index: number;
  uplift: number;
}

interface UpdateImagePayload {
  key: string;
  image: string;
}

// Initial state using the interface
const initialState: FormState = {
  formData: {},
  probability: [],
  uplift: {},
  loading: false,
  error: null,
  images: {
    variantDesktop: null,
    variantMobile: null,
    originalDesktop: null,
    originalMobile: null,
  },
  daysDifference: null,
  startingDate: "",
  endingDate: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { field, value } = action.payload;
      state.formData[field] = Number(value);
    },
    updateText: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateProbability: (
      state,
      action: PayloadAction<UpdateProbabilityPayload>
    ) => {
      const { index, probability } = action.payload;
      state.probability[index] = (probability * 100).toFixed(2);
    },
    updateUplift: (state, action: PayloadAction<UpdateUpliftPayload>) => {
      const { index, uplift } = action.payload;
      state.uplift[index] = uplift.toFixed(2) + "%";
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateImage: (state, action: PayloadAction<UpdateImagePayload>) => {
      const { key, image } = action.payload;
      state.images[key] = image;
    },
    updateSelect: (state, action: PayloadAction<UpdateFieldPayload>) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    updateDateDifference: (state, action: PayloadAction<number | null>) => {
      state.daysDifference = action.payload;
    },
    updateStartingDate: (state, action: PayloadAction<string>) => {
      state.startingDate = action.payload;
    },
    updateEndingDate: (state, action: PayloadAction<string>) => {
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
