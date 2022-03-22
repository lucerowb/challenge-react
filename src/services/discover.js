import axios from "axios";
import config from "../config";
const {
  api: { baseUrl, authUrl, clientId, clientSecret },
  ui: { baseUrl: uiBaseUrl },
} = config;

export const fetchTokenByCode = async (code) => {
  const formData = {
    grant_type: "authorization_code",
    code,
    redirect_uri: `${uiBaseUrl}`,
  };
  try {
    const response = await axios.post(
      `${authUrl}`,
      new URLSearchParams(formData), // convert object to url encoded form
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchTokenByRefreshToken = async (refresh_token) => {
  const formData = {
    grant_type: "refresh_token",
    refresh_token,
  };
  try {
    const response = await axios.post(
      `${authUrl}`,
      new URLSearchParams(formData), // convert object to url encoded form
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchBlocks = async (accessToken, type) => {
  try {
    let response = await axios.get(`${baseUrl}/browse/${type}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
