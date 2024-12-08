import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { uploadFile } from "../../../services/uploadService";

interface UploadState {
  uploading: boolean;
  success: boolean;
  error: string | null;
  uploadedUrl: string | null; // Untuk menyimpan URL file tunggal
  uploadedFiles: {
    id: string;
    url: string;
    name: string;
    size: number;
  }[];
}

const initialState: UploadState = {
  uploading: false,
  success: false,
  error: null,
  uploadedUrl: null,
  uploadedFiles: [],
};

// Async thunk untuk upload file
export const uploadFileThunk = createAsyncThunk(
  "upload/uploadFile",
  async (file: File, thunkAPI) => {
    try {
      const response = await uploadFile(file); // Memanggil service upload
      return response; // Mengembalikan seluruh respons
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Upload failed"
      );
    }
  }
);

// Slice untuk upload
const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetUploadState: (state) => {
      state.uploading = false;
      state.success = false;
      state.error = null;
      state.uploadedUrl = null; // Reset uploadedUrl
      state.uploadedFiles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.uploading = true;
        state.success = false;
        state.error = null;
        state.uploadedUrl = null;
      })
      .addCase(
        uploadFileThunk.fulfilled,
        (
          state,
          action: PayloadAction<
            { id: string; url: string; name: string; size: number }[]
          >
        ) => {
          state.uploading = false;
          state.success = true;
          state.uploadedFiles = action.payload;
          // Ambil URL file pertama jika ada, sebagai nilai untuk uploadedUrl
          state.uploadedUrl =
            action.payload.length > 0 ? action.payload[0].url : null;
        }
      )
      .addCase(
        uploadFileThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.uploading = false;
          state.success = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { resetUploadState } = uploadSlice.actions;
export const selectUpload = (state: any) => state.upload; // Selector untuk mengambil state upload
export default uploadSlice.reducer;
