import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./const/Routes";
import 'bootstrap/dist/css/bootstrap.css';
import {Toaster} from "react-hot-toast";

import './common/assets/common.scss';
import axios from 'axios';
import { serverLocation } from './const/Constants';

axios.defaults.baseURL = serverLocation;
axios.defaults.withCredentials = true;

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Toaster />
      <RouterProvider router={router}/>
  </React.StrictMode>
);