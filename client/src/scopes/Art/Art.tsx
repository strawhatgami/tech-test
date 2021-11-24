import React from "react";

import "./Art.css";

export default function Art() {
  return (
    <div className="Art">
      <div className="table">
        <div className="control">
          <label htmlFor="drawings">
            Drawings
            <input type="number" id="drawings"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>drawings</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Robin</td>
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
