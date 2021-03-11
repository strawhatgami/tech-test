import React from "react";

import "./Players.css";

export default function Players() {
  return (
    <div className="Players">
      <div className="table">
        <div className="control">
          <label htmlFor="time">
            Time
            <input type="number" id="time"></input>
          </label>
          <label htmlFor="player">
            Player
            <select id="player">
              <option value="windows-media-player">Windows Media Player</option>
              <option value="vlc">VLC</option>
            </select>
          </label>
          <button>{`Ajouter une session`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>player</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>VLC</td>
              <td>27min</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
