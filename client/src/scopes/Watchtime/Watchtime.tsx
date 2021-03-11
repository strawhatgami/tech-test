import React from "react";

import "./Watchtime.css";

export default function Watchtime() {
  return (
    <div className="Watchtime">
      <div className="table">
        <div className="control">
          <label htmlFor="hours">
            hours:
            <input type="number" id="hours"></input>
          </label>
          <button>{`Ajouter un watchtime`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>hours</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Maud</td>
              <td>4</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
