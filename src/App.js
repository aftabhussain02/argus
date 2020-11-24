import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { TOKEN } from "constant/variables";
import Axios from "axios";
import { base_url } from "constant";
const App = () => {
  const [loading, setLoading] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  useLayoutEffect(() => {
    axiosSetter();
  }, []);

  // function to set axios interceptors
  const axiosSetter = async () => {
    Axios.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem(TOKEN);

        config.baseURL = base_url;
        if (config?.disableLoading) {
          delete config.disableLoading;
        } else {
          setLoading(true);
        }
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    Axios.interceptors.response.use(
      async (response) => {
        // spinning hide
        setLoading(false);

        return response;
      },
      async (error) => {
        setLoading(false);
        // sign out user on 401 error
        // if (error?.response?.status === 401) {
        //   signOut();
        // } else if (error?.config?.showErrorMessage) {
        //   setErrorMessage(errorMessageExtractor(error));
        // }
        console.log(error);

        return Promise.reject(error);
      }
    );
    setAppLoading(false);
  };

  return appLoading ? null : (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Redirect from="/" to="/admin/index" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
