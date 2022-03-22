import React from "react";
import { REFRESH_TOKEN } from "../../../common/constant";
import config from "../../../config";
import "../styles/_login.scss";
const { api, ui } = config;

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${api.clientId}&response_type=code&redirect_uri=${ui.baseUrl}`;
const Login = () => {
  localStorage.removeItem(REFRESH_TOKEN);
  return (
    <div className="container">
      <a className="login-btn" href={AUTH_URL}>
        CONTINUE WITH SPOTIFY
      </a>
    </div>
  );
};

export default Login;
