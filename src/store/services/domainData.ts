import { combineReducers, configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { projectApi } from "./project"
// Define the initial state for domain data
interface DomainDataState {
  data: any[]
}

const initialState: DomainDataState = {
  data: [],
}

// Create a slice for domain data
export const domainDataSlice = createSlice({
  name: "domainData",
  initialState,
  reducers: {
    setDomainData(state, action: PayloadAction<any[]>) {
      state.data = action.payload
    },
    clearDomainData(state) {
      state.data = []
    },
  },
})

// Export actions
export const { setDomainData, clearDomainData } = domainDataSlice.actions

const rootReducer = combineReducers({
  domainData: domainDataSlice.reducer,
  // other : otherReducer
  [projectApi.reducerPath]: projectApi.reducer,
})
// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectApi.middleware),
})

// Export the store
export default store

// Export RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
