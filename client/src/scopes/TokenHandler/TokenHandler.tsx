import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { token, setToken, loadInitialUserData } = useAppContext();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      return null;
    }

    if (token === "" && !["/login", "/"].includes(location.pathname)) {
      history.push("/");
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
