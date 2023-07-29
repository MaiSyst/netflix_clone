import React from 'react'
import ReactDOM from 'react-dom/client'
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from 'react-router-dom';
import { NavigateGraph } from './utils/NavigateGraph.tsx';
import {injectGlobal} from '@emotion/css'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
injectGlobal`
body{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto;
    background-color: #000000;
    scroll-behavior: smooth;
}
`;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={NavigateGraph} />
    </LocalizationProvider>
  </React.StrictMode>
);
