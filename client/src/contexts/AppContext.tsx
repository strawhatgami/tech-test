import React, { createContext, useContext, useReducer } from "react";
import {
  login as apiLogin,
  loadAllSessions,
  addNewSession,
  loadMyInfo,
  updateSessionById,
  removeSession
} from "../network/index";
import { ActionTypes } from "./actions";

type Actions<T> = {
  type: T;
  payload?: any;
  meta?: any;
};

export interface ISession {
  id: number;
  time: number;
  player: string;
  username: string;
}

interface IPlayerChoice {
  label: string;
  value: string;
}

export interface IAppState {
  token: string | null;
  sessions: Array<ISession>;
  username: string;
  players: Array<IPlayerChoice>
}

interface IAppContext {
  setToken: (token: string) => void;
  login: (username: string, password: string) => Promise<string>;
  addSession: (time: number, player: string) => Promise<void>;
  updateSession: (id: number, time: number, player: string) => Promise<void>;
  deleteSession: (id: number) => Promise<void>;
  loadInitialUserData: (token: string) => Promise<void>;
}

const initialState: IAppState = {
  token: null,
  sessions: [],
  username: "",
  players: [{
    label: 'Windows Media Player', value: 'windows-media-player',
  }, {
    label: 'VLC', value: 'vlc',
  }],
};

export const selectPlayerLabel = (state: IAppState, playerValue: string) => {
  const player = state.players.find(({value}) => value == playerValue);
  return player?.label || "";
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

        dispatch({ type: ActionTypes.SET_TOKEN, payload: token });

        return token;
      }),      
    addSession: async (time: number, player: string) =>
      handleError(dispatch, async () => {
        const {token} = state;

        const session = await addNewSession(token, time, player);

        dispatch({ type: ActionTypes.ADD_SESSION, payload: session });
      }),
    updateSession: async (id: number, time: number, player: string) =>
      handleError(dispatch, async () => {
        const {token} = state;

        await updateSessionById(token, id, time, player);
        const sessionChanges = {id, time, player};

        dispatch({ type: ActionTypes.UPDATE_SESSION, payload: sessionChanges });
      }),
      
    deleteSession: async (id: number) =>
      handleError(dispatch, async () => {
        const {token} = state;

        await removeSession(token, id);

        dispatch({ type: ActionTypes.REMOVE_SESSION, payload: id });
      }),
    // Since loadInitialUserData is called just after setToken - so before any state update,
    // the token is not yet set in store, so we must get it from the arguments.
    loadInitialUserData: async (token: string) =>
      handleError(dispatch, async () => {
        try {
          const me = await loadMyInfo(token);
          dispatch({ type: ActionTypes.SET_PERSONAL_INFO, payload: me });

          const sessions = await loadAllSessions(token);
          dispatch({ type: ActionTypes.SET_SESSIONS, payload: sessions });
        } catch (e) {
          if (e.status == 401) { // bad token
            dispatch({ type: ActionTypes.LOGOUT });
          }

          return false;
        }

        return true;
      }),
  }
};

const AppContext = createContext<IAppState & IAppContext>({
  ...initialState,
  ...actionsCreators(initialState, () => {}),
});

export const AppReducer = (state: IAppState, action: Actions<ActionTypes>) => {
  let {sessions} = state;

  switch (action?.type) {
    case ActionTypes.SET_TOKEN:
      return { ...state, token: action.payload };
    case ActionTypes.ADD_SESSION:
      sessions = state.sessions.slice();
      sessions.push(action.payload);
      return { ...state, sessions };
    case ActionTypes.UPDATE_SESSION:
      const index = state.sessions.findIndex(({id}) => id == action.payload.id);
      sessions = state.sessions.slice();
      sessions[index] = {...sessions[index], ...action.payload};
      return { ...state, sessions };
    case ActionTypes.REMOVE_SESSION:
      sessions = state.sessions.filter(({id}) => id != action.payload);
      return { ...state, sessions };
    case ActionTypes.SET_SESSIONS:
      return { ...state, sessions: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.SET_PERSONAL_INFO:
      const {username} = action.payload;
      return { ...state, username };
    case ActionTypes.LOGOUT:
      return { ...initialState, token: "" };
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
