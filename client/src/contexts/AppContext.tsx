import React, { createContext, useContext, useReducer } from "react";
import {login as apiLogin } from "../network/index";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface IAppState {
  token: string | null;
}

interface IAppContext {
  setToken: (token: string) => void;
  login: (username: string, password: string) => Promise<any>;
}

const initialState: IAppState = {
  token: null,
};

const actionsCreators = (state: {}, dispatch: Function) =>  ({
  setToken: (token: string) =>
    dispatch({ type: ActionTypes.SET_TOKEN, payload: token }),
  login: async (username: string, password: string) => {
    const {token} = await apiLogin(username, password);

    dispatch({ type: ActionTypes.SET_TOKEN, payload: token })

    return token;
  },
});

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  ...actionsCreators(initialState, () => {}),
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  switch (action?.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        ...state,
        ...actionsCreators(state, dispatch),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
