import React, { useEffect } from "react";
import { useLocation } from "react-router";

import { useAppContext } from "../../contexts/AppContext";

export default function TokenHandler() {
  const { token, setToken } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      return null;
    }

    const matchedToken = /(?:\?|&)token=([^=&]*)(?:&?)/gi.exec(location.search);

    const urlToken = matchedToken?.[1];
    if (urlToken) setToken(urlToken);
  }, [location, token]);

  return null;
}
