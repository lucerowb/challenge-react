import { useState, useEffect } from "react";
import {
  fetchTokenByRefreshToken,
  fetchTokenByCode,
} from "../../services/discover";
import { REFRESH_TOKEN } from "../constant";

const useToken = (code) => {
  const LocalRefreshToken = JSON.parse(localStorage.getItem(REFRESH_TOKEN));
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState(LocalRefreshToken || "");
  const [tokenExpiration, setTokenExpiration] = useState(null);

  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      fetchTokenByRefreshToken(refreshToken).then((response) => {
        const { access_token, expires_in } = response.data;
        setAccessToken(access_token);
        setTokenExpiration(expires_in);
      });
    } else {
      if (!refreshToken) {
        fetchTokenByCode(code).then((response) => {
          const { access_token, refresh_token, expires_in } = response.data;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          setTokenExpiration(expires_in);
          localStorage.setItem(
            REFRESH_TOKEN,
            JSON.stringify(response.data.refresh_token)
          );
        });
      }
    }
  }, [code]);
  return { accessToken, refreshToken, tokenExpiration };
};

export default useToken;
