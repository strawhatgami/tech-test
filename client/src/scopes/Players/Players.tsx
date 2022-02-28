import React, {useState} from "react";
import { useAppContext } from "../../contexts/AppContext";

import "./Players.css";

function CreateSessionForm() {
  const players = [{
    label: 'Windows Media Player', value: 'windows-media-player',
  }, {
    label: 'VLC', value: 'vlc',
  }];

  const { addSession } = useAppContext();
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
          </tr>
        </thead>
        <tbody>
          { sessions.map(({id, username, player, time}) => (
            <tr key={id}>
              <td>{username}</td>
              <td>{player}</td>
              <td>{time} min</td>
            </tr>
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
      <div className="stats"></div>
    </div>
  );
}
