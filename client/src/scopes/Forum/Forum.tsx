import React from "react";

import "./Forum.css";

export default function Forum() {
  return (
    <div className="Forum">
      <div className="table">
        <div className="control">
          <label htmlFor="price">
            Kill(s)
            <input type="number" id="price"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>kills</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>3</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
