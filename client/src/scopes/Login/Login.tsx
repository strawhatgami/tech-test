import React, {useState} from "react";
import { useHistory } from "react-router";
import { useAppContext } from "../../contexts/AppContext";

import "./Login.css";

export default function Login() {
  const { login } = useAppContext();
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const {username, password} = state;
  const set = (fieldName: string) => (e: { target: { value: string; }; }) => {
    setState({
      ...state,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!username || !password) return;

    let token = null;
    try {
      ({token} = await login(username, password));
    } catch (e) {
      if (e.status == 401) return;

      console.error("Login error");
      console.error(e);
    }
  
    if(!token) return;

    setState({
      username: "",
      password: "",
    });

    history.push("/players?token=" + token);
  };

  return (
    <div className="Login">
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={set("username")} />
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
