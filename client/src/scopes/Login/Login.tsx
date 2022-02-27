import React, {useState} from "react";
import { useHistory } from "react-router";
import {login as apiLogin } from "../../network/index";
import { useAppContext } from "../../contexts/AppContext";

import "./Login.css";

export default function Login() {
  const { setToken } = useAppContext();
  const history = useHistory();
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const {login, password} = state;
  const set = (fieldName: string) => (e: { target: { value: string; }; }) => {
    setState({
      ...state,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!login || !password) return;

    let token = null;
    try {
      ({token} = await apiLogin(login, password));
    } catch (e) {
      if (e.status == 401) return;

      console.error("Login error");
      console.error(e);
    }
  
    if(!token) return;

    setState({
      login: "",
      password: "",
    });

    setToken(token);
    history.push("/players?token=" + token);
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={login}
          onChange={set("login")} />
        <label htmlFor="username">Password</label>
        <input
          id="password"
          type="text"
          value={password}
          onChange={set("password")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
