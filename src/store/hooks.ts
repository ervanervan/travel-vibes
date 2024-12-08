import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Hook untuk dispatch dengan tipe yang sudah disesuaikan
export const useAppDispatch: () => AppDispatch = useDispatch;

// Hook untuk selector dengan tipe state yang sudah disesuaikan
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
