import React, { createContext, useContext, useReducer } from "react";
import {login as apiLogin, loadAllSessions, addNewSession } from "../network/index";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

interface Session {
  id: number;
  time: number;
  player: string;
  username: string;
}

interface IAppState {
  token: string | null;
  sessions: Array<Session>;
}

interface IAppContext {
  setToken: (token: string) => void;
  login: (username: string, password: string) => Promise<{token: string}>;
  addSession: (time: number, player: string) => Promise<void>;
  loadInitialUserData: (token: string) => Promise<void>;
}

const initialState: IAppState = {
  token: null,
  sessions: [],
};

const handleError = async (dispatch: Function, crashable: () => any) => {
  try {
    const res = await crashable();
    return res;
  } catch (error) {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error })
    return null;
  }
};

const actionsCreators = (state: IAppState, dispatch: Function) =>  {
  return {
    setToken: (token: string) =>
      dispatch({ type: ActionTypes.SET_TOKEN, payload: token }),
    login: async (username: string, password: string) =>
      handleError(dispatch, async () => {
        const {token} = await apiLogin(username, password);

        dispatch({ type: ActionTypes.SET_TOKEN, payload: token })

        return token;
      }),      
    addSession: async (time: number, player: string) =>
      handleError(dispatch, async () => {
        const {token} = state;

        const session = await addNewSession(token, time, player);

        dispatch({ type: ActionTypes.ADD_SESSION, payload: session })
      }),
    // Since loadInitialUserData is called just after setToken - so before any state update,
    // the token is not yet set in store, so we must get it from the arguments.
    loadInitialUserData: async (token: string) =>
      handleError(dispatch, async () => {

        const sessions = await loadAllSessions(token);
        // TODO load user name from /user/me

        dispatch({ type: ActionTypes.SET_SESSIONS, payload: sessions })
      }),
  }
};

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  ...actionsCreators(initialState, () => {}),
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  switch (action?.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.ADD_SESSION:
      const sessions = state.sessions.slice();
      sessions.push(action.payload);
      return { ...state, sessions };
    case ActionTypes.SET_SESSIONS:
      return { ...state, sessions: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
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
