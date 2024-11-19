import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import './App.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'
import Router from './app/routes/router.tsx'
import "./scss/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App/> */}
      <Router />
    </Provider>
  </StrictMode>
)
