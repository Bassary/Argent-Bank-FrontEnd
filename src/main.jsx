
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './axiosConfig.js'

// REDUX
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/user.reducer.jsx'
// import rootReducer from "./reducers/index.jsx"

export const store =  configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true, 
  // changer en false une fois en production
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
)
