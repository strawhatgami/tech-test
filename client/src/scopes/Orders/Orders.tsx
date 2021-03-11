import React from "react";

import "./Orders.css";

export default function Orders() {
  return (
    <div className="Orders">
      <div className="table">
        <div className="control">
          <label htmlFor="count">
            Nombre de vinyle&nbsp;  
            <input type="number" id="count"></input>
          </label>
          <button>{`Ajouter un ordre de pressage`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>number</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
              <td>100</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="stats"></div>
    </div>
  );
}
