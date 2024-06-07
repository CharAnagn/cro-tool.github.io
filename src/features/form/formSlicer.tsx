import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  formData: { [key: string]: number | string };
  probability: string[];
  uplift: { [key: number]: string };
  loading: boolean;
  error: string | null;
}

// Interfaces for action payloads
interface UpdateFieldPayload {
  field: string;
  value: number | string;
}

interface UpdateProbabilityPayload {
  index: number;
  probability: number;
}

interface UpdateUpliftPayload {
  index: number;
  uplift: number;
}

// Initial state using the interface
const initialState: FormState = {
  formData: {},
  probability: [],
  uplift: {},
  loading: false,
  error: null,
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
  },
});

export const {
  updateField,
  updateProbability,
  updateUplift,
  updateLoading,
  updateText,
} = formSlice.actions;

export default formSlice.reducer;
