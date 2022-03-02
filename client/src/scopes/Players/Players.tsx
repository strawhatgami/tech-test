import React, {useState} from "react";
import { useAppContext, ISession, selectPlayerLabel } from "../../contexts/AppContext";
import Stats from "./Stats";

import "./Players.css";

function CreateSessionForm() {
  const { addSession, players } = useAppContext();
  const [state, setState] = useState({
    time: 0,
    player: players[0].value,
  });

  const {time, player} = state;
  const set = (fieldName: string) => (e: { target: { value: string; }; }) => {
    setState({
      ...state,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!time || !player) return;

    await addSession(time, player);

    setState({
      time: 0,
      player: players[0].value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="time">
          Time
          <input
            id="time"
            type="number"
            value={time}
            onChange={set("time")} />
        </label>
        <label htmlFor="player">
          Player
          <select
            id="player"
            value={player}
            onChange={set("player")}>
            { players.map(({label, value}) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <button type="submit">Ajouter une session</button>
      </div>
    </form>
  );
}

function EditSessionRowDataFields({session, stopEditRow} : {session: ISession, stopEditRow: Function}) {
  const { updateSession, players } = useAppContext();
  const {id, username, player: initialPlayer, time: initialTime} = session;
  const [state, setState] = useState({
    time: initialTime,
    player: initialPlayer,
  });
  const {time, player} = state;
  const set = (fieldName: string) => (e: { target: { value: string; }; }) => {
    setState({
      ...state,
      [fieldName]: e.target.value,
    });
  };

  const askUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!time || time < 0 || !player) return;

    updateSession(id, time, player);
    stopEditRow();
  };

  return (
    <tr>
      <td>{username}</td>
      <td>
        <select
          value={player}
          onChange={set("player")}>
          { players.map(({label, value}) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          className="time-input"
          type="number"
          value={time}
          onChange={set("time")} />
      </td>
      <td>
        <div className="edit-buttons">
          <div onClick={askUpdate}>✔️</div>
          <div onClick={() => stopEditRow()}>❌</div>
        </div>
      </td>
      <td></td>
    </tr>
  )
}

function SimpleSessionRowDataFields({session, editRow} : {session: ISession, editRow: Function}) {
  const appState = useAppContext();
  const { username: me, deleteSession, players } = appState;
  const {username, player, time, id} = session;
  const playerLabel = selectPlayerLabel(appState, player) || player;

  return (
    <tr>
      <td>{username}</td>
      <td>{playerLabel}</td>
      <td>{time} min</td>
      {username == me && (
        <>
          <td onClick={() => editRow()}>✍️</td>
          <td onClick={() => deleteSession(id)}>🗑</td>
        </>
      ) || (
        <>
          <td></td>
          <td></td>
        </>
      )}
    </tr>
  )
}

function SessionRow({session} : {session: ISession}) {
  const [edit, setEdit] = useState(false);

  if (edit) return (
    <EditSessionRowDataFields session={session} stopEditRow={() => setEdit(false)} />
  );
  else return (
    <SimpleSessionRowDataFields session={session} editRow={() => setEdit(true)} />
  );
}

function SessionsTable() {
  const { sessions } = useAppContext();

  return (
    <div className="table">
      <CreateSessionForm />
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>player</th>
            <th>time</th>
            <th className="edit">✍️</th>
            <th>🗑</th>
          </tr>
        </thead>
        <tbody>
          { sessions.map((session) => (
            <SessionRow
              key={session.id}
              session={session} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Players() {
  return (
    <div className="Players">
      <SessionsTable />
      <Stats />
    </div>
  );
}
