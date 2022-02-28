import React, { useEffect } from "react";
import { useLocation } from "react-router";

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { token, setToken, loadInitialUserData } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      return null;
    }

    const query = new URLSearchParams(location.search);
    const urlToken = query.get("token");
    if (urlToken) {
      setToken(urlToken);

      loadInitialUserData(urlToken);
    }
  }, [location, token]);

  return null;
}
