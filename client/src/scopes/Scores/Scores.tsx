import React from "react";

import "./Scores.css";

export default function Scores() {
  return (
    <div className="Scores">
      <div className="table">
        <div className="control">
          <label htmlFor="score">
            Score
            <input type="number" id="score"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>score</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Karim</td>
              <td>2</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
