import React from "react";

import "./Orders.css";

export default function Orders() {
  return (
    <div className="Orders">
      <div className="table">
        <div className="control">
          <label htmlFor="count">
            Nombre de pizza&nbsp;
            <input type="number" id="count"></input>
          </label>
          <button>{`Ajouter une commande`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>quantity</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example</td>
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
